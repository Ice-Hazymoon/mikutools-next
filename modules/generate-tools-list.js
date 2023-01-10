import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import _tools from '../mikutools/external_tools.json';

const platforms = {
    web: ['web-pc', 'web-mobile'],
    android: ['app-android'],
    ios: ['app-ios']
};

function deleteFile(file) {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    } else {
        console.warn('File not found: ' + file);
    }
}

function doReadDir(dir, tools, excludeTools) {
    const excludeSet = new Set(excludeTools);
    const platformSet = new Set(platforms[process.env.PLATFORM]);
    const regex = /\.vue$/i;

    const files = fs.readdirSync(dir);

    for (const file of files.reverse()) {
        const modulePath = path.join(dir, file);
        const stat = fs.lstatSync(modulePath);
        if (stat.isDirectory()) {
            doReadDir(modulePath, tools, excludeTools);
        } else if (regex.test(file)) {
            const content = fs.readFileSync(modulePath, 'utf-8');
            const $ = cheerio.load(content);
            if (!$('tools-meta').html()) continue;

            let toolsMeta;
            try {
                toolsMeta = JSON.parse($('tools-meta').html());
            } catch (error) {
                continue;
            }
            if (!toolsMeta) continue;

            if (!toolsMeta.platforms.some(e => platformSet.has(e))) {
                if (!excludeSet.has(toolsMeta)) {
                    excludeTools.push(toolsMeta);
                    excludeSet.add(toolsMeta);
                }
                continue;
            }

            delete toolsMeta.head;
            toolsMeta.pinyin = {};
            tools.push(toolsMeta);
        }
    }
}

export default (inlineOptions, nuxt) => {
    nuxt.hook('pages:extend', pages => {
        if (fs.existsSync('./exclude_tools.json')) {
            const excludeToolsJson = JSON.parse(
                fs.readFileSync('./exclude_tools.json')
            );
            console.log(`已排除 ${excludeToolsJson.length} 个工具打包`);
            const excludePaths = excludeToolsJson.map(e => e.path);
            pages = pages.filter(route => !excludePaths.includes(route.path));
        }
    })

    nuxt.hook('build:before', nuxt => {
        console.log('build:before')
        deleteFile(path.resolve(__dirname, '../tools.json'));
        deleteFile(path.resolve(__dirname, '../exclude_tools.json'));

        const toolCategory = JSON.parse(fs.readFileSync('./mikutools/tool_category.json'));
        const tools = [];
        const excludeTools = [];
        doReadDir(path.join(__dirname, '../pages'), tools, excludeTools);
        for (const toolsMeta of tools) {
            let category;
            const keys = toolsMeta.key;
            if (Array.isArray(keys)) {
                for (let ii = 0; ii < keys.length; ii++) {
                    const key = keys[ii];
                    category = toolCategory.find(item => item.key === key);
                    if (category) {
                        if (!category.list) category.list = [];
                        category.list.push(toolsMeta);
                    }
                }
            } else {
                category = toolCategory.find(item => item.key === key);
                if (category) {
                    if (!category.list) category.list = [];
                    category.list.push(toolsMeta);
                }
            }
        }

        _tools.forEach(tool => {
            let category;
            if (Array.isArray(tool.key)) {
                if (tool.key.includes(category.key)) {
                    tool.pinyin = {};
                    category.list.unshift(tool);
                }
            } else {
                category = toolCategory.find(item => item.key === tool.key);
                if (category) {
                    tool.pinyin = {};
                    if (!category.list) category.list = [];
                    category.list.unshift(tool);
                }
            }
        });
        fs.writeFileSync('./tools.json', JSON.stringify(toolCategory));
        fs.writeFileSync('./exclude_tools.json', JSON.stringify(excludeTools));
        console.log('已生成 tools.json 和 exclude_tools.json');
    })
}
import fs from 'fs';
const defaultTxt = `User-agent: *
Disallow:
Sitemap: https://tools.miku.ac/sitemap.xml`;

const ban_search_engine_list = [
    'Sosospider',
    'Baiduspider',
    'sogou spider',
    'YodaoBot'
];

export default (inlineOptions, nuxt) => {
    nuxt.hook('build:before', pages => {
        console.log('开始生成 robot.txt');
        const toolsJson = JSON.parse(fs.readFileSync('./tools.json'));
        const exclude = toolsJson.map(item => item.list).flat()
            .filter(item => item && item.vip)
            .map(item => `Disallow: ${item.path}`)
            .join('\n');
        fs.writeFileSync(
            './public/robots.txt',
            `${defaultTxt}\n${ban_search_engine_list
                .map(s => `User-agent: ${s}\n${exclude}`)
                .join('\n')}`
        );
    })
}
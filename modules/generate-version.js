import fs from 'fs';

export default (inlineOptions, nuxt) => {
    nuxt.hook('build:before', pages => {
        console.log('开始生成 version.json');
        fs.writeFileSync(
            './public/version.json',
            JSON.stringify({
                _v: +new Date()
            })
        );
    })
}
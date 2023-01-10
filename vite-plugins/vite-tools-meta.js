import env from '../env';

export default {
    name: 'vue-tools-meta',
    transform(code, id) {
        if (!/vue&type=tools-meta/.test(id)) {
            return
        }
        if (/\.tools-meta$/.test(id)) {
            code = code.trim()
        }
        const toolsMeta = JSON.parse(code);

        toolsMeta.head = Object.assign({
            meta: [],
            keywords: [],
            description: '',
        }, toolsMeta.head);

        toolsMeta.head.title = `${
            toolsMeta.head.title || toolsMeta.name
        } - ${env.title}`;
        
        toolsMeta.head.meta.push({
            hid: 'keywords',
            keywords: toolsMeta.head.keywords.concat(env.keywords).join(',')
        });
        toolsMeta.head.meta.push({
            hid: 'description',
            description: toolsMeta.head.description || env.description
        });
        return `export default Comp => {
            Comp.toolsMeta = ${code}
            Comp.head = ${JSON.stringify(toolsMeta.head)}
        }`
    },
}
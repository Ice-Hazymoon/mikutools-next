<tools-meta>
{
    "name": "工具名称",
    "path": "/testtools",
    "head": {
        "keywords": [
            "关键词1",
            "关键词2"
        ],
        "description": "工具介绍"
    },
    "hot": "hot",
    "vip": false,
    "platforms": ["app-android", "web-pc", "web-mobile"],
    "key": ["other", "hot"]
}
</tools-meta>

<template>
    <div class=" bg-slate-200">
        {{ store.dark }}
        <nuxt-link to="/">home</nuxt-link>
    </div>
</template>

<script>
export default {
    name: "testpage",
    data() {
        return {
            test: "test"
        }
    },
    setup() {
        useHead(getCurrentInstance().type.head);
        return {
            store: useGlobalStore()
        }
    },
    mounted() {
        // console.log(useGlobalStore)
        // console.log(this.store.dark)
        // console.log('meta', this.$options)
        this.store.dark = true
    },
}
</script>
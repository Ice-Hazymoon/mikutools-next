<tools-meta>
    {
        "name": "工具名称",
        "path": "/path",
        "head": {
            "keywords": [
                "keyword"
            ],
            "description": "description"
        },
        "vip": false,
        "key": "key"
    }
</tools-meta>

<template>
    <div class="template">
        <nya-container main title="工具名称" />

        <nya-container v-if="results" title="获取成功" />
    </div>
</template>

<script>
export default {
    name: 'Template',
    data() {
        return {
            url: '',
            results: '',
            loading: false
        };
    },
    methods: {
        getVideo() {
            if (this.loading) return false;
        }
    }
};
</script>

<style lang="scss">
.template {
}
</style>

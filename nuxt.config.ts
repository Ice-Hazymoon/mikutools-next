// https://nuxt.com/docs/api/configuration/nuxt-config
import viteTooleMeta from './vite-plugins/vite-tools-meta';
import generateToolsList from './modules/generate-tools-list.js';
import generateVersion from './modules/generate-version';
import generateRobots from './modules/generate-robots';

export default defineNuxtConfig({
    vite: {
        plugins: [
            viteTooleMeta
        ]
    },
    hooks: {
        // 
    },
    imports: {
        // Auto-import pinia stores defined in `~/stores`
        dirs: ['stores']
    },
    plugins: [
        // Auto-import plugins defined in `~/plugins`
    ],
    modules: [
        generateToolsList,
        generateVersion,
        generateRobots,
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        '@pinia-plugin-persistedstate/nuxt',
        '@vueuse/nuxt',
        [
            '@nuxtjs/tailwindcss',
            {
                cssPath: '~/assets/css/tailwind.css',
                configPath: './tailwind.config.js'
            }
        ]
    ]
})

import {
    defineStore
} from 'pinia';


export const useGlobalStore = defineStore('globalState', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            dark: false,
            current_tools: null
        }
    },
    persist: {
        paths: ['dark'],
        storage: persistedState.localStorage,
    },
})
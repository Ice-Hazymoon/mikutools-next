export default defineNuxtRouteMiddleware(to => {
    const { $config, $pinia } = useNuxtApp();
    // setTimeout(() => {
    //     const state = store.state;
    //     const currentTool = state.currentTool;
    //     // 检测工具是否失效
    //     if (currentTool && currentTool.hot === 'error') {
    //         Notification.warning({
    //             title: `【${currentTool.name}】已失效`,
    //             message: `当前工具已失效或处于维护状态`
    //         });
    //     }
    // }, 0);
    const store = useGlobalStore()
    console.log(store.dark)
    console.log(
        'Heading to',
        to.path,
    );
    // return '/secret';
});

import createPersistedState from 'vuex-persistedstate'

// 在所有的插件里面
// 如果用 export default 导出一个默认函数的话
// 这个函数会自动获得一个 nuxt 实例的传参
// export default (nuxt) => {
//     nuxt.$axios
//     nuxt.store
//     如果只需要其中某些属性, 可以用结构的方式实现
// }

export default ({ store }) => {
    // 类似window.onload
    // window.onNuxtReady 是页面上 nuxt 准备完毕的一个回调事件
    window.onNuxtReady(() => {
        // 引入了插件的第三方包, 调用它实现数据持久化即可
        // 这个插件的用法是作者规定的
        createPersistedState({
            // 这个插件的目标是将 vuex 存放到本地储存
            // localStorage.setItem(key, this.$store)
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}

// 所有原来 写在 main.js new Vue() 之前的逻辑
// 在 nuxt 当中都可以利用插件机制实现
// 所有配置过的插件会自动在 实例创建前执行
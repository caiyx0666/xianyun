export const state = () => ({
    userInfo: {}
})

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
}

export const actions = {
    login(store, data) {
        // actions 里面可以封装异步函数
        // 搞定请求以后直接可以在这里调用 mutations 改数据
        // 可以接受两个参数，第一个是当前的 store 仓库实例，第二个是调用时的传入的数据
        return this.$axios({
            method: 'post',
            url: '/accounts/login',
            data
        }).then(res => {
            console.log(res.data);
            // 在这里不用传数据出去，可以直接调用当前的 store.commit 触发mutations 就可以了
            store.commit('setUserInfo', res.data)
            return res
        })
    }
}
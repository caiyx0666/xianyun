export const state = () => ({
    userInfo: {},
    reply: {
        content: '',
        pics: [],
        post: '',
        follow: '',
        replyName: ''
    },
    focus: false
})

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
        // mutations 不能执行异步函数
        // this.$axios( {
        //     method: 'post',
        //     url: '/accounts/login',
        //     data
        // } ).then( res => {
        //     console.log( res.data );
        //     this.$message.success( '登录成功' )
        //     // 将获取的数据存放到 vuex 当中
        //     // 利用 commit 调用 mutation
        //     state.userInfo = res.data
        //     // this.$store.commit( 'user/setUserInfo', res.data )
        // } )

    },
    setReplyName(state, data) {
        state.reply.replyName = data;
        state.focus = !state.focus;
    },
    setFollow(state, data) {
        state.reply.follow = data
    },
    clearReply(state) {
        state.reply.follow = ''
        state.reply.replyName = ''

    }


}

export const actions = {
    login(store, data) {
        // actions 里面可以封装异步函数
        // 搞定请求以后直接可以在这里调用 mutations 改数据
        // 可以接受两个参数, 第一个是当前的 store 仓库实例, 第二个是调用时的传入数据数据
        return this.$axios({
            method: 'post',
            url: '/accounts/login',
            data
        }).then(res => {
            console.log(res.data);
            // this.$message.success( '登录成功' )
            // 在这里不用传数据出去可以直接调用当前的 store.commit 触发mutations 就可以了
            store.commit('setUserInfo', res.data)

            return res
        })
        // 外面的.then如果希望获取数据
        // 在这个 .then 里面return数据
    }
}

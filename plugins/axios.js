import { Message } from 'element-ui'
// 官网中单独引入的说明

// 这里是插件系统使用的代码
// 可以 export defaults 的方式暴露一个函数

export default function({ $axios }) {
    // 从整个 nuxt 实例中解构 $axios
    $axios.onError(err => {
        // 利用 nuxt 专属 axios 提供的拦截器辅助函数处理错误
        console.log(err.response.data);
        const { statusCode, message } = err.response.data

        // 弹窗 这里并非组件内部，无法使用 this 需要单独引入 Message 弹窗组件
        const regexp = /^4\d\d/
        if (regexp.test(statusCode)) {
            Message.error(message)
        }
    })
}
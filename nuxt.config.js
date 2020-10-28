import pkg from './package'

export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: "闲云旅游网", // 修改title
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css' }, // 新增全局字体样式
            { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_2159499_711d8l311d2.css' },
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'assets/main.css' // 新增自定义的页面过渡样式（文件来自3.4.1）
    ],

    /*
     ** Plugins to load before mounting the App
     */
    //  所有在 plugins 这里引入的文件
    //  都会想之前的 main.js 代码一样
    //  在创建 根实例之前执行
    plugins: [
        '@/plugins/element-ui',
        // '@/plugins/localstorage'
        // 引入插件的时候, 默认是字符串
        // 如果需要额外的配置, 就变成对象
        {
            src: '@/plugins/localstorage',
            // 指定这个插件不可以在服务端执行(只能等到浏览器当中再执行)
            ssr: false
        },
        '@/plugins/axios',
        {
            src: '@/plugins/editor',
            ssr: false
        }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // https://axios.nuxtjs.org/setup
        '@nuxtjs/axios'
    ],
    components: true,

    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: "http://157.122.54.189:9095" // 新增备用地址
            // baseURL: "http://127.0.0.1:1337" // 新增axios默认请求路径 		  
    },

    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],

        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
}
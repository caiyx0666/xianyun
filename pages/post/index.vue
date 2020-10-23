<template>
    <div>
        <!-- 如果直接写, 那么在服务端不认识, 浏览器才认识
        所以会造成前后渲染内容不一致, 报错 -->
        <!-- 这里可以单独指定这一个标签要在客户端再渲染 -->
        <client-only>
            <VueEditor/>
        </client-only>
    </div>
</template>

<script>
    // import {VueEditor} from 'vue2-editor'
    export default {
        // components: {
        //     VueEditor
        // }
    };
</script>

<style>
</style>
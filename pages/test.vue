<template>
    <div>
        <CommentMain
            v-for="(comment, index) in commentList"
            :key="index"
            :commentData="comment"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                commentList: [
                    {
                        content: "挽尊",
                    },
                    {
                        content: "我觉得这个文章挺有道理",
                    },
                    {
                        content: "从前有座山",
                    },
                    {
                        content: "山上有座庙",
                        parent: {
                            content: "从前有座山",
                        },
                    },
                    {
                        content: "庙里有个和尚在讲故事",
                        parent: {
                            content: "山上有座庙",
                            parent: {
                                content: "从前有座山",
                            },
                        },
                    },
                ],
            };
        },
    };
</script>

<style>
</style>
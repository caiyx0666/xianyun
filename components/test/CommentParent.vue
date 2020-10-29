<template>
    <div class="parentWrapper">
        <parent 
            v-if="parentData.parent"
            :parentData="parentData.parent" 
        />
        {{ parentData.content }}
    </div>
</template>

<script>
    export default {
        name: "parent",
        props: ["parentData"],
    };
</script>

<style>
    .parentWrapper {
        padding: 10px;
        margin: 10px;
        background-color: #f0f0f0;
        font-size: 12px;
        color: #888;
    }
</style>
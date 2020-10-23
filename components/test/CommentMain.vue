<template>
  <div class="mainWrapper">
      <CommentParent
        v-if="commentData.parent"
        :parentData="commentData.parent"
      />
      {{commentData.content}}
  </div>
</template>

<script>
export default {
    props: ['commentData']
}
</script>

<style>
.mainWrapper {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
</style>
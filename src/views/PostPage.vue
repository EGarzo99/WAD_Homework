<template>
  <div v-if="post">
    <h1>{{ post.username }}</h1>
    <p>{{ post.text }}</p>
    <img v-if="post.photo" :src="post.photo" width="300">

  </div>

  <h1 v-else>Post not found</h1>
</template>

<script>
export default {
  computed: {
    post() {
      const id = this.$route.params.id;
      return this.$store.getters.allPosts.find(p => p.id == id);
    }
  }
};
</script>

<style scoped> 

</style>
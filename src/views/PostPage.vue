<template>
  <div v-if="post">
    <h1> A post:</h1>
    <h3> {{ post.email }}</h3>
    <p>{{ post.text }}</p>
    <img v-if="post.photo" :src="post.photo" width="300">

  </div>

  <h1 v-else>Post not found</h1>
</template>

<script>
export default {
  name: 'PostPage',
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const res = await fetch(`http://localhost:3000/api/posts/${id}`);
    this.post = await res.json();
  }
}
</script>
<style scoped> 

</style>
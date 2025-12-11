<template>
  <div class="layout">
    <aside class="margin"></aside>

    <div class="content">
      <div v-if="post" class="post-container">
        <h1>Post</h1>
        <h3>{{ post.email }}</h3>
        <p>{{ post.body }}</p>
        <img v-if="post.photo" :src="post.photo" width="300">
      </div>
      <h1 v-else>Post not found</h1>
    </div>

    <aside class="margin"></aside>
  </div>
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
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`);
      if (res.ok) {
        this.post = await res.json();
      } else {
        this.post = null;
      }
    } catch (err) {
      console.error(err);
      this.post = null;
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.content {
  flex: 2;
  padding: 40px;
  margin: 20px 0;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0,0,0,0.08);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.layout {
  display: flex;
  gap: 20px;
  width: 100%;
}
.margin {
  flex: 1;
  background: rgb(200, 200, 200);
  border-radius: 15px;
  margin: 20px auto;
  max-width: 300px;
}
.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-container img {
  margin-top: 20px;
  max-width: 100%;
  border-radius: 10px;
}
p {
  max-width: 800px;
  text-align: center;
  line-height: 1.5;
}
</style>

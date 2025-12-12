<template>
  <div class="layout">
    <aside class="margin"></aside>

    <div class="content">
      <div v-if="post" class="post-container">
        <span class="email-tag"> {{ post.email }} </span>
        <h1>Post</h1>
        <textarea v-model="post.body" :readonly="!isOwner"></textarea>
        <img v-if="post.photo" :src="post.photo" width="300">
      </div>
      <h1 v-else>Post not found</h1>
      <div class="actions">
        <button @click="updatePost" :disabled="!isOwner">Update Post </button>
        <button @click="deletePost" :disabled="!isOwner">Delete</button>
      </div>
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
      const data = await res.json();
      console.log(data);
      this.post = Array.isArray(data) ? data[0] : data;
    } else {
      this.post = null;
    }
  } catch (err) {
    console.error(err);
    this.post = null;
  }
},
computed: {
  isOwner() {
    return this.post && this.$store.state.user
      ? this.$store.state.user.user_id === this.post.user_id
      : false;
  }
},
methods: {
  async updatePost() {
    if (!this.post) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${this.post.post_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: this.post.body, date: new Date() })
      });
      alert('Post updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating post');
    }
  },
  async deletePost() {
    if (!this.post) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${this.post.post_id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Post deleted successfully');
        this.$router.push('/');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting post');
    }
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.email-tag {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 0.9rem;
  color: #666;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 8px;
}

textarea {
    width: 100%;
    max-width: 1400px;
}

button {
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: rgb(200, 200, 200);
  border: 1px solid black;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  margin: 20px;
  font-size: 20px;
}
button:disabled {
  background-color: rgb(180, 180, 180);
  color: rgb(120, 120, 120);
  cursor: not-allowed;
  border: 1px solid rgb(150, 150, 150);
}
button:hover:enabled {
  background-color: #369870;
}



</style>

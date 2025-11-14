<template>
  <div>
    <article v-for="post in posts" :key="post.date" class="post">
      <!-- Post Header -->
      <div class="post-header">
        <img src="../images/user.png" alt="Profile" width="40">
        <span class="username">{{ post.username }}</span>
        <span class="date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Post Body -->
      <div class="post-body">
        <img v-if="post.photo" :src="post.photo" alt="Post image" width="300">
        <p>{{ post.text }}</p>
      </div>

      <!-- Post Footer -->
      <div class="post-footer">
        <button @click="likePost(post)">👍 Like</button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Post',
  computed: {
    posts() {
      return this.$store.getters.allPosts
    }
  },
  mounted() {
    if (!this.$store.state.posts.length) {
      this.$store.dispatch('loadPosts')
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    likePost(post) {
      alert(`Liked post by ${post.username}!`)
      // Aquí podrías actualizar un estado de likes si quieres
    }
  }
}
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  max-width: 400px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-weight: bold;
}

.date {
  margin-left: auto;
  font-size: 0.85em;
  color: gray;
}

.post-body {
  margin-top: 10px;
}

.post-body img {
  display: block;
  margin-bottom: 5px;
  border-radius: 5px;
}

.post-footer {
  margin-top: 10px;
}

button {
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #369870;
}
</style>
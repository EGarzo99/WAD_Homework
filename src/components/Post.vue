<template>
  <div>
    <article v-for="post in posts" :key="post.date" class="post">
      <!-- Post Header -->
      <div class="post-header">
        <img src="../assets/user.png" alt="Profile" width="40">
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
        <span>{{ post.likes }} likes  </span>
        <button @click="likePost(post)">👍</button>
      </div>
    </article>
    <div class="reset-likes">
      <button @click="resetLikes()"> Reset Likes </button>
    </div>
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
      this.$store.dispatch('fetchPosts')
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    likePost(post) {
      post.likes += 1
    },
    resetLikes() {
      this.$store.state.posts.forEach(post => {
        post.likes = 0
      })
    }
  }
}
</script>

<style scoped>

.post {
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  background: white;
  width: auto;
  background-color: rgb(240, 240, 240);
  line-height: 2;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-color: rgb(200, 200, 200);
  border: 1px solid black;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #369870;
}
.reset-likes {
  text-align: center;
  margin: 20px;
}
</style>
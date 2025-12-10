<template>
  <div>
    <article v-for="post in posts" :key="post.post_id" class="post">
      <!-- Post Header -->
      <div class="post-header">
        <img src="../assets/user.png" alt="Profile" width="40">
        <span class="email">{{ post.email }}</span>
        <span class="date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Post Body -->
      <div class="post-body" @click="openPost(post.id) "style="cursor: pointer;">
        <img v-if="post.photo" :src="post.photo" alt="Post image" width="300">
        <p>{{ post.body }}</p>
      </div>

      <!-- Post Footer -->
      <div class="post-footer">
        <span>{{ post.likes }} likes  </span>
        <button @click="likePost(post)">👍</button>
      </div>
    </article>
    <div class="reset-likes">
      <button @click="resetLikes()" style="font-size: 20px;"> Reset Likes </button>
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
        this.$store.commit('update_Likes', { id: post.id, likes: post.likes + 1 });
        this.$store.dispatch('likePost', post.id);
    },
    resetLikes() {
        this.$store.state.posts.forEach(post => {
        this.$store.commit('update_Likes', { id: post.id, likes: 0 });
      });
    },
    openPost(id) {
      this.$emit('postClicked', id)
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
  color: rgb(0, 0, 0);
  border-radius: 5px;
}

button:hover {
  background-color: #369870;
}
.post-footer {
  font-size: 0.85rem;
  display: flex;
  justify-content: right;
  gap: 0.5rem;
}
.reset-likes {
  text-align: center;
  margin: 30px;
}
</style>
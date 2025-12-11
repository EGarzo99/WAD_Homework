
<template>
    <div class="layout">
        <aside class='margin'></aside>
        <main id="posts">
            <div v-if="currentUser" class="logout-container">
                <p>Welcome, <strong>{{ currentUser.email }}</strong>!</p>
                <button @click="logout" class="logout-btn">Logout</button>
            </div>
            <Post @postClicked="goToPost"></Post>
            
        </main>
        <aside class='margin'></aside>
    </div>
</template>

<script>

import Post from '../components/Post.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    Post
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapMutations(['set_User']),
    goToPost(id) {
      this.$router.push(`/post/${id}`)
    },
    logout() {
      this.set_User(null)
    }
  }
}
</script>

<style>     
    .layout {
        display: flex;       /* activa el modo fila */
        gap: 20px;          /* espacio entre los elementos flexibles */
    }

    .margin {
        flex: 1;             /* ocupa espacio flexible */
        background: rgb(200, 200, 200);
        border-radius: 15px;
        margin: 20px auto;
        max-width: 300px;    /* ancho máximo para que no desaparezca */
    }
    main {
      flex: 3; /* o un número mayor que 1, para darle más espacio que los margenes */
      background: white;
    }

    .logout-container {
      background: #a5e7fc92;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border: 1px solid #aaa;
      border-radius: 10px;
      padding: 20px;
      margin: 20px auto;
      width: auto;
      line-height: 2;
    }

    .logout-container p {
      margin: 0;
    }

    .logout-btn {
      padding: 8px 16px;
      background: #ff5e00;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }

    .logout-btn:hover {
      background: #ff7722;
    }

</style>
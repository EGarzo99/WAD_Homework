<template>
    <div class="layout">
        <aside class='margin'></aside>
        <main id="posts">
            <Post></Post>
        </main>
        <aside class='margin'></aside>
    </div>
</template>

<script>

import Post from '../components/Post.vue'

export default {
  name: 'MainPage',
  components: {
    Post
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

</style>
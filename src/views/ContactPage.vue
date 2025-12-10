<template>
<div class="layout">
  <aside class="margin"></aside>
  <div class="content">
    <h3 class="footer-subtitle">Contact</h3>
    <ul class="contact-list">
        <li><span>📍</span> Delta Centre, Narva mnt 18, 51009 Tartu, Estonia</li>
        <li><span>📧</span> <a href="mailto:blog@webappdev.com">blog@webappdev.com</a></li>
    </ul>
  </div>
  <aside class="margin"></aside>
</div>
</template>

<script>

export default {
  name: 'MainPage',
  components: {
  }
}

</script>

<style scoped>
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
</style>
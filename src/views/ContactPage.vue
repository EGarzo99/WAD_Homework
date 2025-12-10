<template>
<div class="layout">
  <aside class="margin"></aside>

  <div class="content">
    <h3 class="footer-subtitle">Contact Us</h3>

    <ul class="contact-list">
        <li><span class="icon">📍</span> Delta Centre, Narva mnt 18, 51009 Tartu, Estonia</li>
        <li><span class="icon">📧</span> <a href="mailto:carras@ermua.eus">carras@ermua.eus</a></li>
        <li><span class="icon">📞</span> +372 555 9909</li>
        <li><span class="icon">🕒</span> Monday–Friday: 10:00–12:00</li>
    </ul>
  </div>

  <aside class="margin"></aside>
</div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
/* Layout general */
.layout {
    display: flex;
    gap: 20px;
    width: 100%;
}

/* Columnas laterales grises (tal como te gusta) */
.margin {
    flex: 1;
    background: rgb(200, 200, 200);
    border-radius: 15px;
    margin: 20px auto;
    max-width: 300px;
}

/* Contenido central más grande y más bonito */
.content {
    flex: 2;
    padding: 40px;
    margin: 20px 0;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0,0,0,0.08);
}

/* Título grande y bonito */
.footer-subtitle {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 25px;
    color: #333;
}

/* Lista de datos */
.contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.contact-list li {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
}

.contact-list li:last-child {
    border-bottom: none;
}

/* Iconos más grandes y separados */
.icon {
    font-size: 1.6rem;
    margin-right: 12px;
}

/* Enlaces un poco más bonitos */
a {
    text-decoration: none;
    color: #0077cc;
    font-weight: 600;
}

a:hover {
    text-decoration: underline;
}
</style>

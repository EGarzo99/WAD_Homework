<template>
  <Header> </Header>
  <router-view/>
  <Footer></Footer>
</template>

<script>  
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: left;
    color: #103f00;
  }
</style>

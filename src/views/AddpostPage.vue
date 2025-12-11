<template>
<div class="layout">
  <aside class="margin"></aside>

  <div class="content">
        <h1>Add a New Post</h1>
        <form @submit.prevent="addPost">
            <div>
                <label for="body">Body</label>
                <textarea id="body" name="body" v-model="body" required></textarea>
            </div>
            <div>
                <button type="submit" id="submit">Submit Post</button>
            </div>
        </form>
  </div>

  <aside class="margin"></aside>
</div>
</template>

<script>
export default {
	name: 'AddpostPage',
	data() {
		return {
			body: '',
            user: ''
		};
	},
	methods: {
		async addPost() {

			await this.$store.dispatch('addPost', { user: '', body: this.body });
			alert('Post added successfully');
			return true;
		}	
	}
}
	
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
form {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: auto;
    align-items: center;
}
form div {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}
textarea {
    width: 100%;
    max-width: 1400px;
}
button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
}

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
</style>
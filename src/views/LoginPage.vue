
<template>
	<div class="standard-form">
		<h2>Create an account</h2>
		<p>Please fill the form to sign up </p>

		<form id="loginForm" @submit.prevent="signup" action="#" method="post">
			<div>
			<input type="email" id="email" name="email" v-model="email" placeholder="Email">
			</div>
			<br>
			<div>
			<input type="password" id="password" name="password" v-model="password" placeholder="Password">
			</div>
			<br>
			<button type="submit" id="loginBtn">Login</button>
            <span> or </span>
			<button type="button" id="singupBtn" @click="singup">Sign Up</button>
		</form>
    </div>
</template>

<script>

export default {
	name: 'LoginPage',
	data() {
		return {
			email: '',
			password: ''
		};
	},
    methods: {
        login() {
            this.$router.push('/login');
        },
        singup() {
            window.location.href = "index.html";
        }
    }
}
</script>

<style scoped>
.standard-form {
  border: 1px solid #aaa;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  background: white;
  width: auto;
  background-color: rgb(240, 240, 240);
  line-height: 1;
  text-align: center;
  max-width: 500px;
}
.standard-form button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #0c53a0;
  color: white;
  cursor: pointer;
}

.standard-form input[type="file"] {
  display: none;
}

.standard-form .custom-label {
  display: inline-block;
  background-color: #52575c;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>



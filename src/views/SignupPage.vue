
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
			<button type="submit" id="signupBtn">Signup</button>
		</form>
    </div>
</template>

<script>
export default {
	name: 'SignupPage',
	data() {
		return {
			email: '',
			password: ''
		};
	},
	methods: {
		async signup() {
			const password = this.password;
			const email = this.email;
			const errors = [];

			if (!this.email) {
				errors.push('Email is required.');
			}
			if (!password) {
				errors.push('Password is required.');
			} else {
				if (password.length < 8 || password.length > 15) {
					errors.push('Password must be 8 to 14 characters long.');
				}
				if (!/^[A-Z]/.test(password)) {
					errors.push('Password must start with an uppercase letter.');
				}
				if (!/_/.test(password)) {
					errors.push('Password must include the "_" character.');
				}
				if (!/[A-Z]/.test(password)) {
					errors.push('Password must include at least one uppercase letter.');
				}
				const lowerMatches = password.match(/[a-z]/g) || [];
				if (lowerMatches.length < 2) {
					errors.push('Password must include at least two lowercase letters.');
				}
				if (!/\d/.test(password)) {
					errors.push('Password must include at least one numeric digit.');
				}
			}

			const res = await fetch(`http://localhost:3000/api/users/check/${encodeURIComponent(email)}`);
    		const data = await res.json();
    		if (data.exists) {
     			alert('Email is already registered.');
    		return false;
    		}

			if (errors.length) {
				// Show all validation errors
				alert(errors.join('\n'));
				return false;
			}

			// Password ok — continue with signup (placeholder)
			this.$store.dispatch('signupUser', { email, password });
			alert('Signup successful');
			return true;
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

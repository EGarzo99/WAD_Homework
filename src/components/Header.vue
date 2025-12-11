<template>
    <header>
        <nav>
        <nav>
        <router-link to="/">Home</router-link><span style="margin: 0 8px;">|</span>
        <router-link to="/signup">Signup</router-link><span style="margin: 0 8px;">|</span>
        <router-link to="/login">Login</router-link><span style="margin: 0 8px;">|</span>
        <router-link to="/contactus">Contact Us</router-link><span style="margin: 0 8px;">|</span>
        <router-link to="/addpost">Add Post</router-link>
        </nav>
        <div class="user-menu" style="position: relative; display: inline-block;">
            <img src="../assets/user.png" id="userPhoto" alt="Profile" width="60">
            <div id="dropdown" class="dropdown-content">
                <a id="username"></a>
                <a id="usermail"></a>
                <a href="login.html" id="login">Logout</a>
            </div>
        </div>
        </nav>
    </header>
</template>

<style>
header nav {
    display: flex;               /* activa flexbox */
    justify-content: space-between; /* separa enlaces a la izquierda y foto a la derecha */
    align-items: center;         /* centra verticalmente */
    padding: 20px;
    background-color: rgb(200, 200, 200);
    border-radius: 15px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f0f0f0;
}

nav {
padding: 30px;
}

nav a {
font-weight: bold;
color: #001011;
}

nav a.router-link-exact-active {
color: #ff5e00;
}
</style>


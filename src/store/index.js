import { createStore } from 'vuex'

export default createStore({    
    state: {
        posts: [], // here posts will be stored
        user: null // here actual user info will be stored
    },
    getters: {
        allPosts: (state) => state.posts, // returns all posts from state
        currentUser: (state) => state.user // returns current user info from state
    },
    mutations: {
        set_Posts(state, posts) {
            state.posts = posts;
        },
        update_Likes(state, { id, likes }) {
            const post = state.posts.find(p => p.id === id);
            if (post) post.likes = likes;
        },
        set_User(state, user) {
            console.log("Setting user in state:", user);
            state.user = user;
            console.log("Current user in state:", state.user);
        }
    },
    actions: {
        async fetchPosts({ commit }) {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        const data = await res.json();
        commit("set_Posts", data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    },

    async addPost({ commit, state }, postData) {
      try {
        if (!state.user) {
          console.error("No user logged in!");
          return;
        }

        postData.user = state.user.user_id; 
        console.log("Adding post with data:", postData);
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData)
        });
        const newPost = await res.json();
        commit("add_Post", newPost.rows ? newPost.rows[0] : newPost);
      } catch (err) {
        console.error("Error adding post:", err);
      }
    },
    
    async signupUser({ commit }, userData) {
        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });
            const newUser = await res.json();
            commit("set_User", newUser);
        } catch (err) {
            console.error("Error signing up user:", err);
        }
    },

    async login({ commit }, userData) {
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        });

        if (!res.ok) {
          return false;
        }

        const user = await res.json();
        console.log("Logged in user data:", user);
        commit("set_User", user);

        return true;

      } catch (err) {
        console.error("Error logging in:", err);
      }
    },

    async deleteAllPosts({ commit }) {
      try {
        await fetch("http://localhost:3000/api/posts", {
          method: "DELETE"
        });
        commit("set_Posts", []);
      } catch (err) {
        console.error("Error deleting all posts:", err);
      }
    }
  }
})
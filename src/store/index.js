import { createStore } from 'vuex'

export default createStore({    
    state: {
        posts: [] // here posts will be stored
    },
    getters: {
        allPosts: (state) => state.posts // returns all posts from state
    },
    mutations: {
        set_Posts(state, posts) {
            state.posts = posts;
        },
        update_Likes(state, { id, likes }) {
            const post = state.posts.find(p => p.id === id);
            if (post) post.likes = likes;
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

    async addPost({ commit }, postData) {
      try {
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
    }   
  }
})
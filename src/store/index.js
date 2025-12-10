import { createStore } from 'vuex'
import axios from "axios"

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
        
  }
})
import { createStore } from 'vuex'

export default createStore({    
    state: {
        posts: [] // here posts will be stored
        
    },
    getters: {
        allPosts: (state) => state.posts // returns all posts from state
    },
    mutations: {
        setPosts(state, posts) {
        state.posts = posts.map(p => {
            return {
                ...p,
                likes: 0
            }
        })
        }  

    },
    actions: { 
        async fetchPosts({ commit }) {
            try {
                const response = await fetch('/json/posts.json')
                const data = await response.json()
                commit('setPosts', data) // calls mutation to update state
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }
    }
})
import { createStore } from 'vuex'

export default createStore({    
    state: {
        posts: [], // here posts will be stored
        users: [] // here users will be stored
    },
    getters: {
        allPosts: (state) => state.posts, // returns all posts from state
        allUsers: (state) => state.users // returns all users from state
    },
    mutations: {
        set_Posts(state, posts) {
            state.posts = posts;
        },
        set_Users(state, users) {
            state.users = users;
        },
        update_Likes(state, { id, likes }) {
            const post = state.posts.find(p => p.id === id);
            if (post) post.likes = likes;
        }
    },
    actions: {
        async fetchPosts({ commit }) {
            const res = await axios.get("/api/posts");
            commit("SET_POSTS", res.data);
        },

        async fetchUsers({ commit }) {
            const res = await axios.get("/api/users");
            commit("SET_USERS", res.data);
        },

        async likePost({ commit }, id) {
            const res = await axios.post(`/api/posts/${id}/like`);
            commit("UPDATE_LIKES", { id, likes: res.data.likes });
        }
  }
})
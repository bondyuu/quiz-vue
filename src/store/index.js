import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

// state, getters, mutations, actions, modules
export default createStore({
    plugins: [
        createPersistedState()
    ],
    state : {
        counter : 2,
    },
    getters : {
        getTwoPowerCounter(state){
            return state.counter ** 2;
        },
    },
    mutations : {
        setCounter(state, value){
            state.counter = value;
        },
    },
    actions: {
        setAccessToken: ({commit}, token) => {
            commit('setAccessToken', token);
        },
    }
});
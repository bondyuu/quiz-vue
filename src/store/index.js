import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

// state, getters, mutations, actions, modules
export default createStore({
    plugins: [
        createPersistedState()
    ],
    state : {
        id : 0,
        numbers:[
            'home', 'first', 'second'
        ],
        questions: {
            home: {
                question: "What's your name?",
                answer: '신하현'
            },
            first: {
                question: "How old are you?",
                answer: 32
            },
            second: {
                questions: "a?",
                answer: 'a'
            }
        }
    },
    getters : {
        getTwoPowerCounter(state){
            return state.counter ** 2;
        },
    },
    mutations : {
        setId(state, value){
            state.id = value;
        },
    },
    actions: {
        setId: ({commit}, value) => {
            commit('setId', value);
        },
    }
});
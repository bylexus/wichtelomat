import Vue from 'vue';
import Vuex from 'vuex';
import { apiCall } from '@/lib';

Vue.use(Vuex);

let store = null;

export const storeFactory = (initialState = {}) => {
    store = new Vuex.Store({
        state: {
            user: null,
            anlaesse: [],
            ...initialState,
        },
        mutations: {
            setUser(state, user) {
                state.user = user;
            },
            addAnlass(state, anlass) {
                state.anlaesse = [...state.anlaesse, anlass];
            },
            setAnlaesse(state, anlaesse) {
                state.anlaesse = [...anlaesse];
            },
        },
        actions: {
            async loadAnlaesse({ commit }) {
                let res = await apiCall.get('/anlass');
                if (res.anlaesse) {
                    commit('setAnlaesse', res.anlaesse);
                }
                return res.anlaesse;
            },
            async newAnlass({ commit }) {
                let res = await apiCall.post('/anlass', {});
                if (res.anlass) {
                    commit('addAnlass', res.anlass);
                }
                return res.anlass;
            },
            async deleteAnlass({ commit, state }, anlassId) {
                commit(
                    'setAnlaesse',
                    state.anlaesse.filter((anlass) => anlass.id !== anlassId)
                );
            },
        },
    });
    return store;
};

export function getStore() {
    return store;
}

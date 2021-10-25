import {FETCH_USERS, FETCH_USER, FETCH_USER_REPO} from '@/actionTypes';
import {SET_USERS, SET_USER, SET_USER_REPO} from '@/mutationTypes';

export default {
  [FETCH_USERS]({commit}, payload) {
    const param = payload && payload.params.length ? '?' + payload.params : '';
    return new Promise((resolve, reject) => {
        this.$axios
          .get(`https://api.github.com/users${param}`)
          .then((response) => {
            resolve(response);
          });
      });
  },
  [FETCH_USER]({commit}, payload) {
    const param = payload && payload.length ? '/' + payload : '';
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`https://api.github.com/users${param}`)
        .then((response) => {
          resolve(response);
        });
    });
  },
  [FETCH_USER_REPO]({commit}, payload){
    const id = payload && payload.id ? `/${payload.id}` : '';
    const params = payload && payload.params ? `?${payload.params}` : '';
    return new Promise((resolve) => {
      this.$axios
        .get(`https://api.github.com/users${id}/repos${params}`)
        .then((response) => {
          resolve(response);
        });
    });
  }

};

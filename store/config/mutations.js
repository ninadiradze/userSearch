import {SET_USERS, SET_USER, SET_USER_REPO} from '@/mutationTypes';

export default {
  [SET_USERS](state, { payload }){
    state.users = payload;
  },
  [SET_USER](state, { payload }){
    state.user = payload;
  },
  [SET_USER_REPO](state, { payload }){
    state.userRepo = payload;
  }
};

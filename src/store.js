/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';
// import giiker from 'giiker';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    giiker: null,
    connected: false,
    last: null,
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
  },
  getters: {
    giiker: state => state.giiker,
    giikerConnected: state => state.connected,
    giikerLast: state => state.last,
    logged: state => state.accessToken !== null,
    token: state => state.accessToken,
    refreshToken: state => state.refreshToken,
    isTokenValid: state => (timestamp) => {
      if (state.accessToken) {
        return timestamp / 1000 < jwt.decode(state.accessToken).exp;
      }
      return false;
    },
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('access_token', accessToken);
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refresh_token', refreshToken);
    },
    REMOVE_ACCESS_TOKEN(state) {
      state.accessToken = null;
      localStorage.removeItem('access_token');
    },
    REMOVE_REFRESH_TOKEN(state) {
      state.refreshToken = null;
      localStorage.removeItem('refresh_token');
    },
    SET_GIIKER(state, giikerCube) {
      state.connected = true;
      state.giiker = giikerCube;
    },
    DISCONNECTED(state) {
      state.connected = false;
    },
    SET_LAST(state, movement) {
      state.last = movement;
    },
  },
  actions: {
    fetchJWT({ commit }, { email, password, times }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          baseURL: 'http://127.0.0.1:5000',
          method: 'post',
          withCredentials: true,
          data: {
            email,
            password,
            test: JSON.stringify(times),
          },
        }).then((res) => {
          commit('SET_ACCESS_TOKEN', res.data.access_token);
          commit('SET_REFRESH_TOKEN', res.data.refresh_token);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    refreshAccessToken({ commit, getters }) {
      return new Promise((resolve, reject) => {
        console.log(getters.isTokenValid(Date.now()));
        if (getters.isTokenValid(Date.now())) resolve();
        else {
          axios({
            url: '/token/refresh',
            baseURL: 'http://127.0.0.1:5000',
            method: 'post',
            withCredentials: true,
            headers: { Authorization: `Bearer ${getters.refreshToken}` },
          }).then((res) => {
            commit('SET_ACCESS_TOKEN', res.data.access_token);
            resolve();
          }).catch((error) => {
            reject(error);
          });
        }
      });
    },
    logOut({ commit, getters }) {
      axios({
        url: '/logout/access',
        baseURL: 'http://127.0.0.1:5000',
        method: 'post',
        withCredentials: true,
        headers: { Authorization: `Bearer ${getters.token}` },
      });
      commit('REMOVE_ACCESS_TOKEN');
      axios({
        url: '/logout/refresh',
        baseURL: 'http://127.0.0.1:5000',
        method: 'post',
        withCredentials: true,
        headers: { Authorization: `Bearer ${getters.refreshToken}` },
      });
      commit('REMOVE_REFRESH_TOKEN');
    },
  },
});

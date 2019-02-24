import axios from '@/http/axios';
import * as types from '../mutation-types';
const initalState = {
  books: [],
  currentBook: {
    title: '',
    genre: '',
    author: '',
    read: false
  }
}
const state = {
  ...initalState
}

const mutations = {
  [types.RECEIVE_BOOKS](state, books) {
    state.books = books;
  },
  [types.RECEIVE_BOOK](state, book) {
    state.currentBook = book;
  },
  [types.CLEAR_BOOK](state) {
    state.currentBook = initalState;
  },
}

const actions = {
  getBooks({ commit }) {
    axios.get('api/books').then((res) => {
      commit(types.RECEIVE_BOOKS, res.data);
    });
  },
  getBookById({ commit }, id) {
    axios.get('api/books/' + id).then((res) => {
      commit(types.RECEIVE_BOOK, res.data);
    })
  },
  update(context, payload) {
    const { title, author, genre, read } = payload;
    axios.put('api/books/' + payload._id, { title, author, genre, read }).then(() => {
      context.dispatch('getBooks');
      context.commit(types.CLEAR_BOOK);
    });
  },
  save(context, payload) {
    const { title, author, genre, read } = payload;
    axios.post('api/books', { title, author, genre, read }).then(() => {
      context.dispatch('getBooks');
      context.commit(types.CLEAR_BOOK);
    });
  },
  delete(context, id) {
    axios.delete('api/books/' + id).then(() => {
      context.dispatch('getBooks');
      context.commit(types.CLEAR_BOOK);
    })
  },
  clearBook({ commit }) {
    commit(types.CLEAR_BOOK);
  }
}

const getters = {
  books: state => state.books,
  currentBook: state => state.currentBook
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

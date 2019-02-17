import axios from 'axios';
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
    console.log('state.books', state.books)
  },
  [types.RECEIVE_BOOK](state, book) {
    state.currentBook = book;
    console.log('state.books', state.book)
  },
  [types.CLEAR_BOOK](state) {
    state.currentBook = initalState;
    console.log('CLEAR_BOOK', state.currentBook)
  },
}

const actions = {
  getBooks({ commit }) {
    axios.get('api/books').then((res) => {
      console.log(res);
      commit(types.RECEIVE_BOOKS, res.data);
    }).catch(err => console.log(err));
  },
  getBookById({ commit }, id) {
    axios.get('api/books/' + id).then((res) => {
      console.log("byid", res);
      commit(types.RECEIVE_BOOK, res.data);
    })
  },
  update(context, payload) {
    console.log("payload", payload);
    const { title, author, genre, read } = payload;
    axios.put('api/books/' + payload._id, { title, author, genre, read }).then(res => {
      console.log("updated", res);
      context.dispatch('getBooks');
      context.commit(types.CLEAR_BOOK);
    });
  },
  save(context, payload) {
    console.log("payload", payload);
    const { title, author, genre, read } = payload;
    axios.post('api/books', { title, author, genre, read }).then(res => {
      console.log("created", res);
      context.dispatch('getBooks');
      context.commit(types.CLEAR_BOOK);
    });
  },
  delete(context, id) {
    axios.delete('api/books/' + id).then((res) => {
      console.log('deleted book', res);
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

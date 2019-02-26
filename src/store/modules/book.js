import axios from '@/http/axios';
import * as mutationTypes from '../mutation-types';

const state = {
  books: []
}

const mutations = {
  [mutationTypes.SET_BOOKS](state, books) {
    state.books = books;
  },
  [mutationTypes.ADD_BOOK](state, book) {
    state.books.unshift(book)
  },
  [mutationTypes.UPDATE_BOOK](state, book) {
    let index = state.books.findIndex(item => item._id == book._id);
    if (index != -1) {
      state.books.splice(index, 1, book)
    }
  },
  [mutationTypes.DELETE_BOOK](state, id) {
    let index = state.books.findIndex(item => item._id == id);
    if (index != -1) {
      state.books.splice(index, 1)
    }
  }
}

const actions = {
  async getBooks({ commit }) {
    return await axios.get('api/books').then((res) => {
      commit(mutationTypes.SET_BOOKS, res.data);
    });
  },
  // eslint-disable-next-line no-empty-pattern
  async getById({ }, id) {
    return await axios.get('api/books/' + id).then((res) => {
      return res.data;
    })
  },
  async  update({ commit }, payload) {
    const { title, author, genre, read } = payload;
    return await axios.put('api/books/' + payload._id, { title, author, genre, read }).then(() => {
      commit(mutationTypes.UPDATE_BOOK, payload)
    });
  },
  async create({ commit }, payload) {
    const { title, author, genre, read } = payload;
    return await axios.post('api/books', { title, author, genre, read }).then((res) => {
      commit(mutationTypes.ADD_BOOK, res.data)
    });
  },
  async delete({ commit }, id) {
    return await axios.delete('api/books/' + id).then(() => {
      commit(mutationTypes.DELETE_BOOK, id)
    })
  }
}

const getters = {
  books: state => state.books,
  selectedBook: state => state.selectedBook
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

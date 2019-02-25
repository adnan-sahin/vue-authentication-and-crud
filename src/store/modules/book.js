import axios from '@/http/axios';
import * as mutationTypes from '../mutation-types';
const initalState = () => {
  return {
    _id: '',
    title: '',
    genre: '',
    author: '',
    read: false

  }
}
const state = {
  books: [],
  selectedBook: initalState()
}

const mutations = {
  [mutationTypes.SET_BOOKS](state, books) {
    state.books = books;
  },
  [mutationTypes.SET_BOOK](state, book) {
    state.selectedBook = book;
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
  },
  [mutationTypes.RESET_BOOK](state) {
    state.selectedBook = initalState();
  },
}

const actions = {
  async getBooks({ commit }) {
    return await axios.get('api/books').then((res) => {
      commit(mutationTypes.SET_BOOKS, res.data);
    });
  },
  async getById({ commit }, id) {
    return await axios.get('api/books/' + id).then((res) => {
      commit(mutationTypes.SET_BOOK, res.data);
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
    return await axios.post('api/books', { title, author, genre, read }).then(() => {
      commit(mutationTypes.ADD_BOOK, payload)
    });
  },
  async delete({ commit }, id) {
    return await axios.delete('api/books/' + id).then(() => {
      commit(mutationTypes.DELETE_BOOK, id)
    })
  },
  async reset({ commit }) {
    return await commit(mutationTypes.RESET_BOOK);
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

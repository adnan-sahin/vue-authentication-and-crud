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
    let index = state.books.findIndex(item => item.id == book.id);
    if (index != -1) {
      state.books.splice(index, 1, book)
    }
  },
  [mutationTypes.DELETE_BOOK](state, id) {
    let index = state.books.findIndex(item => item.id == id);
    if (index != -1) {
      state.books.splice(index, 1)
    }
  },
}

const actions = {
  async  getBooks(context, pagination) {
    const { sortBy, descending, page, rowsPerPage } = pagination;
    console.log('page', page);
    console.log('pagination', pagination);

    return await axios.get('/books?_start=' + (page - 1) * rowsPerPage + "&_limit=" + rowsPerPage).then(res => {
      console.log('ress', res);
      let items = res.data;
      const totalItems = Number(res.headers['x-total-count']);

      if (sortBy) {
        items = items.sort((a, b) => {
          const sortA = a[sortBy]
          const sortB = b[sortBy]

          if (descending) {
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
      context.commit(mutationTypes.SET_BOOKS, items)
      return { items, totalItems };
    })



  },

  // async getBooks({ commit }) {
  //   return await axios.get('/books').then((res) => {
  //     commit(mutationTypes.SET_BOOKS, res.data);
  //     commit('setItems', res.data);
  //   });
  // },
  // eslint-disable-next-line no-empty-pattern
  async getById({ }, id) {
    return await axios.get('/books/' + id).then((res) => {
      return res.data;
    })
  },
  async  update({ commit }, payload) {
    const { title, author, genre, read } = payload;
    return await axios.put('/books/' + payload.id, { title, author, genre, read }).then(() => {
      commit(mutationTypes.UPDATE_BOOK, payload)
    });
  },
  async create({ commit }, payload) {
    const { title, author, genre, read } = payload;
    return await axios.post('/books', { title, author, genre, read }).then((res) => {
      commit(mutationTypes.ADD_BOOK, res.data)
    });
  },
  async delete({ commit }, id) {
    return await axios.delete('/books/' + id).then(() => {
      commit(mutationTypes.DELETE_BOOK, id)
    })
  }
}

const getters = {
  books: state => state.books,
  selectedBook: state => state.selectedBook,
  loading(state) {
    return state.loading
  },
  pagination(state) {
    return state.pagination
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

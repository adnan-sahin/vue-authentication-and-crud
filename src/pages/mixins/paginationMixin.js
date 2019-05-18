export default {
  data() {
    return {
      loading: true,
      items: [],
      totalItems: 0,
      pagination: {},
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        this.getItems(this.pagination).then(result => {
          this.items = result.items;
          this.totalItems = result.totalItems;
          this.loading = false;
        });
      },
      deep: true
    }
  }
}
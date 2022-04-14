class SearchView {
  #parentelement = document.querySelector('.search');
  getQuery() {
    const val = document.querySelector('.search__field').value;
    return val;
  }
  addHandlerEvent(handle) {
    this.#parentelement.addEventListener('submit', function (e) {
      e.preventDefault();
      handle();
      document.querySelector('.search__field').value = '';
    });
  }
}
export default new SearchView();

import icons from '../../img/icons.svg';
class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;
  render(data) {
    this.#data = data;
    this.#generateHTML();
  }
  addHundlerEvent(handle) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn--inline')) {
        handle();
      }
    });
  }
  #generateHTML() {
    const CurrentPAGE = this.#data.page;
    const endPAGE = Math.ceil(this.#data.results.length / this.#data.perPage);
    const prevBtn = `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${CurrentPAGE - 1}</span>
  </button>`;
    const nextBtn = `
    <button class="btn--inline pagination__btn--next">
            <span>Page ${CurrentPAGE + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

    if (CurrentPAGE > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', prevBtn);
    }
    if (endPAGE > CurrentPAGE) {
      this.#parentElement.insertAdjacentHTML('afterbegin', nextBtn);
    }
    console.log('ccc');
  }
}
export default new PaginationView();

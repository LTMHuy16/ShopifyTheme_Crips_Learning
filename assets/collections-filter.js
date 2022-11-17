class CollectionsFilter {
    constructor() {
        this.filter = document.querySelector(".js-filters");
        this.openFilter = document.querySelector(".js-open-filter");
        this.closeFilter = document.querySelector(".js-close-filter");
        this.sortBy = document.querySelectorAll(".js-collection-select");
        this.toggleHeadings = document.querySelectorAll(".js-filter-heading");
        this.filterInputs = document.querySelectorAll(".js-filter-input");
        this.filterLabels = document.querySelectorAll(".js-filter-label");
        this.filterForm = document.querySelector(".js-filter-form");
        this.collection = document.querySelector(".js-collection");
        this.gridBtns = this.collection.querySelectorAll(".js-collecton-grid-btn");
        this.collectionGrid = this.collection.querySelector(".js-collection-grid");

        this.bindEvents();
    }

    bindEvents() {
        this.showFilter();
        this.hideFilter();
        this.toggleFilters();
        this.submitFilterForm();
        this.sortByChange();
        this.autoSelectSortValue();
        this.changeCollectionLayout();
    }

    submitFilterForm() {
        if (window.innerWidth >= 960) {
            this.filterInputs.forEach((el) => {
                el.addEventListener("change", () => {
                    this.filterForm.submit();
                });
            });
        }
    }

    sortByChange() {
        this.sortBy.forEach((sortSelect) => {
            sortSelect.addEventListener("change", (e) => {
                document.location.href = `?sort_by=${e.target.value}`;
            });
        });
    }

    autoSelectSortValue() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const sortParams = urlSearchParams.get("sort_by");

        if (sortParams !== null) {
            this.sortBy.forEach((sortSelect) => {
                const optionList = sortSelect.options;

                for (var i = 0; i < optionList.length; i++) {
                    if (sortParams == optionList[i].value) {
                        sortSelect.value = optionList[i].value;
                        break;
                    }
                }
            });
        }
    }

    toggleFilters() {
        this.toggleHeadings.forEach((el) => {
            el.addEventListener("click", (event) => {
                event.preventDefault();

                this.toggleHeadings.forEach((ele) => {
                    if (ele != el) {
                        ele.classList.remove("is-active");
                        ele.nextElementSibling.classList.remove("is-open");
                    }
                });

                if (el.classList.contains("is-active")) {
                    el.classList.remove("is-active");
                    el.nextElementSibling.classList.remove("is-open");
                } else {
                    el.classList.add("is-active");
                    el.nextElementSibling.classList.add("is-open");
                }
            });
        });
    }

    showFilter() {
        this.openFilter.addEventListener("click", (event) => {
            event.preventDefault();

            if (!this.filter.classList.contains("is-open")) {
                this.filter.classList.add("is-open");
            }
        });
    }

    hideFilter() {
        this.closeFilter.addEventListener("click", (event) => {
            event.preventDefault();

            if (this.filter.classList.contains("is-open")) {
                this.filter.classList.remove("is-open");
            }
        });
    }

    changeCollectionLayout() {
        this.gridBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const dataGrid = btn.dataset.grid;

                this.gridBtns.forEach((_btn) => {
                    _btn.classList.remove("is-active");
                });

                btn.classList.add("is-active");

                this.collectionGrid.classList.remove("collection__grid--3");
                this.collectionGrid.classList.remove("collection__grid--4");
                this.collectionGrid.classList.add(`collection__grid--${dataGrid}`);
            });
        });
    }
}

new CollectionsFilter();

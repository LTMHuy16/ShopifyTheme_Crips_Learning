class Search {
    constructor() {
        this.searchTrigger = document.querySelector(".js-search-trigger");
        this.searchInner = document.querySelector(".js-search-inner");
        this.searchClose = document.querySelectorAll(".js-search-close");

        this.bindEvents();
    }

    bindEvents() {
        this.showSearch();
        this.closeSearch();
    }

    showSearch() {
        this.searchTrigger.addEventListener("click", () => {
            this.searchInner.classList.add("is-open")
        })
    }

    closeSearch() {
        this.searchClose.forEach((element) => {
            element.addEventListener("click", () => {
                this.searchInner.classList.remove("is-open")
            })
        });
    }
}

new Search();

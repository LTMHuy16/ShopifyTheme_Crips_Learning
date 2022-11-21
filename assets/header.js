class Header {
    constructor() {
        this.header         = document.querySelector(".js-site-header");
        this.toggleMenuBtn  = this.header.querySelector(".js-toggle-menu");
        this.searchIconBtn  = this.header.querySelector(".js-search-icon-btn");
        this.headerNavbar   = this.header.querySelector(".js-header-navbar");
        this.menuLinkLv1    = this.header.querySelectorAll(".js-menu-link");
        this.menuBack       = this.header.querySelectorAll(".js-menu-back");

        this.bindEvents();
    }

    bindEvents() {
        this.toggleMenu();
        this.toggleSubMenu();
        this.backParentMenu();
        this.toggleMenuLv2();
    }

    toggleMenu() {
        this.toggleMenuBtn.addEventListener("click", () => {
            this.toggleMenuBtn.classList.toggle("is-open");
            this.headerNavbar.classList.toggle("is-open");
        });

        this.searchIconBtn.addEventListener("click", () => {});
    }

    toggleSubMenu() {
        this.menuLinkLv1.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const submenu = link.nextElementSibling;
                submenu.classList.add("is-open");
            });
        });
    }

    backParentMenu() {
        this.menuBack.forEach((btn) => {
            btn.addEventListener("click", () => {
                const parentNavMenu =
                    btn.parentElement.parentElement.parentElement;
                parentNavMenu.classList.remove("is-open");
            });
        });
    }
}

window.addEventListener("load", () => {
    new Header();
});

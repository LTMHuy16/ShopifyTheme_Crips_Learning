import { ProductOptions } from "./product-options-new.js";

class Product {
    constructor() {
        this.element = document.querySelector(".js-product-form");
        this.optionsToggle = this.element.querySelectorAll(".js-select-toggle");
        this.sizeguideTrigger = this.element.querySelectorAll(".js-sizeguide-trigger");
        this.sizeguideOverlay = this.element.querySelector(".js-sizeguide-overlay");
        this.sizeguideModal = this.element.querySelector(".js-sizeguide-modal");
        this.sizeguideClose = this.element.querySelector(".js-sizeguide-close");
        this.main = document.querySelector(".main");

        this.bindEvents();
    }

    bindEvents() {
        new ProductOptions(this.element);

        this.optionSlideToggle();
        this.triggerListener();
        this.productPhotos();
    }

    triggerListener() {
        this.sizeguideTrigger.forEach((e) => {
            e.addEventListener("click", () => {
                this.sizeguideModal.classList.add("is-open");
                this.main.classList.add("is-open");
            });
        });

        this.sizeguideClose.addEventListener("click", () => {
            this.sizeguideModal.classList.remove("is-open");
            this.main.classList.remove("is-open");
        });

        this.sizeguideOverlay.addEventListener("click", () => {
            this.sizeguideModal.classList.remove("is-open");
            this.main.classList.remove("is-open");
        });
    }

    optionSlideToggle() {
        this.optionsToggle.forEach((el) => {
            el.addEventListener("click", () => {
                const thisOption = el.closest(".js-variant-row");
                if (thisOption.classList.contains("is-open")) {
                    thisOption.classList.remove("is-open");
                } else {
                    thisOption.classList.add("is-open");
                }
            });
        });
    }
}

new Product();

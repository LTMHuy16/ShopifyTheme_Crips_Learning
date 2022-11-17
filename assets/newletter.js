class Newletter {
    constructor() {
        this.newletterForm = document.querySelector(".js-newletter-form");
        this.closeIcon = this.newletterForm.querySelector(".js-newletter-close");
        this.formInner = this.newletterForm.querySelector(".js-newletter-form-inner");

        this.bindEvents();
    }

    bindEvents() {
        this.closeFormModal();
        this._autoOpen();
        this._closedOneDay();
    }

    closeFormModal() {
        this.closeIcon.addEventListener("click", () => {
            this.newletterForm.classList.toggle("is-open");
            this._closedOneDay();
        });

        this.newletterForm.addEventListener("click", (event) => {
            if (!this.formInner.contains(event.target)) {
                this.newletterForm.classList.remove("is-open");
                this._closedOneDay();
            }
        });
    }

    _autoOpen() {
        const newsletterSuccess = this.readCookie("NewsletterModal");

        if (Shopify.designMode) {
            this.newletterForm.classList.add("is-open");
        }

        if (!this.isOpen()) {
            setTimeout(() => {
                const successNote = this.newletterForm.querySelector(".js-newletter-success");

                if (successNote) {
                    this.newletterForm.classList.add("is-open");
                    this.createCookie("NewsletterModal", true, 31);
                } else {
                    if (!newsletterSuccess) {
                        setTimeout(() => {
                            this.newletterForm.classList.add("is-open");
                        }, 8000);
                    }
                }
            }, 1200);
        }
    }

    _closedOneDay() {
        const newsletterClosed = this.readCookie("NewsletterModal");
        
        if (!newsletterClosed) {
            console.log(newsletterClosed);
            this.createCookie("NewsletterModal", true, 1);
        }
    }

    createCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    readCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    }

    isOpen() {
        return this.newletterForm.classList.contains("is-open");
    }
}

new Newletter();

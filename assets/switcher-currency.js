class switcherCurrency {
    constructor () {
        this.element = document.querySelector(".js-currency");
        this.openModal = document.querySelectorAll(".js-open-currency");
        this.closeModal = document.querySelectorAll(".js-close-currency");
        this.modal = document.querySelector(".js-currency-modal");
        this.toggleCurrencyList = document.querySelector(".js-currency-list");
        this.selectorCurrency = document.querySelectorAll(".js-currency-selector");
        this.currentCurrency = document.querySelectorAll(".js-current-currency");
        this.money = document.querySelectorAll(".money");

        this.data = {
            currency: window.currency.shop,
            default: window.currency.default,
            format: window.currency.format,
            moneyFormat: window.currency.moneyFormat,
            moneyCurrencyFormat: window.currency.moneyCurrencyFormat
        };
    }

    bindEvents () {
        this.default();
        this.showModal();
        this.hideModal();
        this.toggleList();
        this.select();
    }

    select() {
        this.selectorCurrency.forEach((el) => {
            el.addEventListener('click', (event) => {
                event.preventDefault();

                this.updateCurrency(el.dataset.currency);
            });
        }); 
    }
    
    default() {
        this.money.forEach((money) => {
            const currencyCode = this.data.currency[0].toUpperCase() + this.data.currency.substring(1).toLowerCase(),
                  dataCurrencyCode = "currency" + currencyCode;
            
            money.dataset[dataCurrencyCode] = money.innerHTML;
        }); 

        Currency.format = this.data.format;
        Currency.money_format[this.data.currency] = this.data.moneyFormat;
        Currency.money_with_currency_format[this.data.currency] = this.data.moneyCurrencyFormat;
       
        this.cookieCurrency();
    }

    cookieCurrency() {
        const cookieCurrency = Currency.cookie.read();

        let selectedCurrency = this.data.currency;

        if (cookieCurrency !== "undefined") {    
            selectedCurrency = cookieCurrency;
        }

        this.updateCurrency(selectedCurrency);    
    }

    updateCurrency(currency) {

        this.selectorCurrency.forEach((select) => {
            if(select.dataset.currency === currency){
                this.currentCurrency.forEach((current) => {
                    current.innerHTML = select.innerHTML
                })
            }
        }); 

        Currency.cookie.write(currency);
        Currency.convertAll(this.data.currency, currency);

        window.currency.default = currency;
    }

    showModal () {
        this.openModal.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.modal.classList.add('is-open')
            });
        });
    }

    hideModal () {
        this.closeModal.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.modal.classList.remove('is-open')
            });
        });
    }

    toggleList () {
        this.toggleCurrencyList.addEventListener('click', (event) => {
            event.preventDefault();

            this.toggleCurrencyList.classList.toggle("is-open");
        });
    }
}

new switcherCurrency().bindEvents();
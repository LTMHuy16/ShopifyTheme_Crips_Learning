export class ProductOptions {
    constructor(element) {
        this.element = element;
        this.productSelect    =  this.element.querySelector(".js-product-select");
        this.variantOptions   =  this.element.querySelectorAll(".js-product-variant");
        this.variantColor     =  this.element.querySelector(".js-variant-row--color");
        this.submit           =  this.element.querySelector(".js-product-form-submit");
        this.prices           =  this.element.querySelector(".js-product-price");
        
        this.variantData = window.product.variants;
        this.selectedValues = window.product.selectedValues;

        this.bindEvents();
        this.defaultColor();
        this.defaultVariant();
    }

    bindEvents() {
        this.variantOptions.forEach(select => {
            select.addEventListener('change', () => {
                 const optionIndex = select.dataset.option,
                      selectedValue = select.value.replaceAll('*', '"');
                      
                this.updateSelected(selectedValue, optionIndex);
                this.updateVariantLabel(select.value, optionIndex);
                this.updatePhotosByColor(selectedValue);     
            });
        });
    }

    defaultColor() {
        let color = '';

        if(this.variantColor !== undefined && this.variantColor !== null){
            const index = this.variantColor.dataset.index;
         
            const optionColors = this.element.querySelectorAll(`.js-product-variant[data-option="${index}"]`);

            optionColors.forEach(optionColor => {
                if(optionColor.checked === true){
                    color = optionColor.value;
                }
            });

            if (location.search.length && location.search.split('?colour=').length > 1) {
                color = decodeURI(location.search.split('?colour=')[1]);
            }

            if(color !== ''){
                const optionColor = this.element.querySelector(`.js-product-variant[value="${color.replaceAll('"', '*')}"]`);

                if(optionColor !== undefined && optionColor !== null){
                    optionColor.checked = true;
                    this.updateSelected(color, index);
                    this.updateVariantLabel(color, index);
                }
            }
        }
    }

    defaultVariant() {
        if (location.search.length && location.search.split('?variant=').length > 1) {
            const _id = Number(decodeURI(location.search.split('?variant=')[1])),
                  variant = this.variantData.filter((variant) => variant.id === _id)[0];
       
            if(variant !== undefined){
                this.updateProductSelect(variant.id);
            }

            for (let i = 0; i < 3; i++) {
                const optionIndex = `option${i + 1}`;

                if(variant[optionIndex] !== undefined && variant[optionIndex] !== null){

                    if(variant[optionIndex] !== undefined && variant[optionIndex] !== null){
                        const availableOption = this.element.querySelector(`.js-product-variant[value="${variant[optionIndex].replaceAll('"', '*')}"][data-option="${i}"]`);

                        if(availableOption !== null){
                            availableOption.checked = true;

                            this.selectedValues[i] = availableOption.value;
                            this.updateVariantLabel(availableOption.value, i);
                        }
                    }
                }
            }
        }
    }

    updatePhotosByColor (color){
        color = handelize(color);
      
        if(this.variantColor !== undefined && this.variantColor !== null){
            const photoItems = document.querySelectorAll(".js-pdp-photo-item");
            let toOwl = true;

            photoItems.forEach(item => {
                const itemColor = item.dataset.color;

                if(itemColor === color){
                    const $owlPdpPhotos = jQuery('.js-pdp-photos'),
                          ownItemIndex = item.dataset.index;

                    if(toOwl === true){
                        $owlPdpPhotos.trigger('to.owl.carousel', ownItemIndex);
                        toOwl = false
                    }

                    item.parentElement.classList.remove('hidden--desk');
                }else{
                    item.parentElement.classList.add('hidden--desk');
                }
            });
        }
    }

    updateSelected (value, index) {
        this.selectedValues[index] = value;

        const valueOption1 = this.selectedValues[0] === undefined ? null : this.selectedValues[0],
              valueOption2 = this.selectedValues[1] === undefined ? null : this.selectedValues[1],
              valueOption3 = this.selectedValues[2] === undefined ? null : this.selectedValues[2],
              emptyValues = this.selectedValues.length - this.selectedValues.filter((el) => el !== null).length;

        let optionIndex = Number(index) + 1;

        if(this.selectedValues.length - 1 === index) optionIndex = Math.abs(Number(index) - 1);

        if(emptyValues === 1) this.selectedValues.forEach((item, index) => { if(item === null) optionIndex = index });

        this.updateOption(optionIndex, valueOption1, valueOption2, valueOption3);

        if(emptyValues === 0){
            const variant = this.variantData.filter((variant) => variant.option1 === valueOption1 && variant.option2 === valueOption2 && variant.option3 === valueOption3)[0];
       
            if(variant !== undefined){
                this.updateProductSelect(variant.id);
            }
        }
    }

    updateOption (index, value1, value2, value3) {
        let variants;

        switch(index) {
            case 2:
                variants = this.variantData.filter((variant) => variant.option1 === value1 && variant.option2 === value2);
                break;
            case 1:
                variants = this.variantData.filter((variant) => variant.option1 === value1 && variant.option3 === value3);
                break;
            default:
                variants = this.variantData.filter((variant) => variant.option2 === value2 && variant.option3 === value3);
        }

        this.variantOptions.forEach(option => {
            if(option.dataset.option === index) option.disabled = true;
        });

        if(variants.length > 0){
            variants.forEach(variant => {
                const optionIndex = `option${index + 1}`;

                let availableOption = null;

                if(variant[optionIndex] !== undefined && variant[optionIndex] !== null){
                    availableOption = this.element.querySelector(`.js-product-variant[value="${variant[optionIndex].replaceAll('"', '*')}"][data-option="${index}"]`);
                }
                     
                if(availableOption !== null){
                    if(variant.available) {
                        availableOption.disabled = false;
                    }else{
                        availableOption.disabled = true;

                        if(availableOption.checked === true){
                            availableOption.checked = false;
                            
                            this.updateSelected(null, index);
                        }
                    }
                }
            });
        }
    }

    updateVariantLabel (value, index, disabled = false) {
        const variantRow = this.element.querySelector(`.js-variant-row[data-index="${index}"]`),
              labelValue = variantRow.querySelector(".js-label-value");
       
        if(variantRow.classList.contains('js-variant-row--color')){
            value = `<span class="swatches-${value.toLowerCase().replaceAll(' ', '-')}"></span> ${value}`;
        }

        if(disabled !== true){
            labelValue.innerHTML = value.replaceAll('*', '"');        
        }
    }

    updatePrices (selectedVariantId) {
        const variant = this.variantData.filter((variant) => variant.id === selectedVariantId)[0];

        let priceHTML = '';

        if(variant !== undefined){
            if(variant.compare_at_price > variant.price){
                priceHTML += `<s class="pdp__prices-compare money">${variant.compare_at_price}</s>`
            }
            priceHTML += `<span class="pdp__prices-price money">${Shopify.formatMoney(variant.price, window.currency.moneyFormat)}</span>`

            this.prices.innerHTML = priceHTML;
        }
    }
    
    updateProductSelect (selectedVariantId) {
        this.productSelect.value = selectedVariantId;
        this.updatePrices(selectedVariantId);
        new switcherCurrency().default();  

        const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + selectedVariantId;
        window.history.replaceState({path: url}, '', url);
    }
}
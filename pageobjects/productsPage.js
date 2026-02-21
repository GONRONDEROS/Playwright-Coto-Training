const {encodeCategoryName} = require('../utils/helpers');
class ProductsPage{
    constructor(page){
        this.page = page;
        
    }

    async clickFiltroDeProductos(product){
        const normalizedUrl = encodeCategoryName(product);
        await Promise.all([
            this.page.waitForURL(new RegExp(normalizedUrl)),
            this.page.locator(`a[title="${product.trim()}"]`).click()
        ])
        // Capturar la URL actual despues de la navegación
        return this.page.url();
    }

    async onlyCategoryMethod(product){
        const normalizedUrl = encodeCategoryName(product);
        await this.page.waitForURL(new RegExp(normalizedUrl));
        // Capturar la URL actual despues de la navegación
        return this.page.url();
    }
}
module.exports = {ProductsPage}
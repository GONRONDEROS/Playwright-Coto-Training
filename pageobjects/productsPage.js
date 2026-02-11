class ProductsPage{
    constructor(page){
        this.page = page;
        
    }

    async clickFiltroDeProductos(product){
        await this.page.locator(`a[title="${product.trim()}"]`).click();
        const normalized = product.trim().toLowerCase().replace(/\s+/g, '-');
        await this.page.waitForURL(new RegExp(normalized));
        // Capturar la URL actual despues de la navegación
        return this.page.url();
    }

    async hayMasDeUnaPagina(){
        return await this.page.locator('li > .ng-star-inserted:has-text("2")').count() > 0;
    }

    async clickPaginacion(){
        await this.page.locator("li > .ng-star-inserted:has-text('2')").click(); 
    }

}
module.exports = {ProductsPage}
class ProductsPage{
    constructor(page){
        this.page = page;
        
    }

    async clickFiltroDeProductos(product){
        await this.page.locator(`a[title="${product.trim()}"]`).click();
        await this.page.waitForURL(new RegExp(`${(product.trim()).toLowerCase()}`));
        // Capturás la URL actual después de la navegación
        return this.page.url();
    }

    async volverAProductoMadre(product){
        
    }

    async hayMasDeUnaPagina(){
        return await this.page.locator('li > .ng-star-inserted:has-text("2")').count() > 0;
    }

    async clickPaginacion(){
        await this.page.locator("li > .ng-star-inserted:has-text('2')").click(); 
    }

}
module.exports = {ProductsPage}
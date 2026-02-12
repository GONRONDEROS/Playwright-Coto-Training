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

    async getCanonicalNf() { 
        let nfValue = null; 
        this.page.on('response', async (response) => { 
            const url = response.url(); 
            if (url.includes('/categoria/catalogo')) { 
                try { 
                    const body = await response.json(); 
                    const navState = body?.canonicalLink?.navigationState; 
                    const nfMatch = navState?.match(/Nf=([^&]+)/); 
                    if (nfMatch) { 
                        nfValue = decodeURIComponent(nfMatch[1]);
                    } 
                } catch (e) { 
                } 
            } 
        }); 
    return nfValue; 
    }
}
module.exports = {ProductsPage}
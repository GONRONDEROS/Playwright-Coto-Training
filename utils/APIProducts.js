// utils/APIProducts.js
const { request } = require('@playwright/test');

class APIProducts {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async listProducts({ nf } = {}) {
        const context = await request.newContext();
        const params = new URLSearchParams({
            No: '0',
            Nr: 'AND(product.language:español,product.sDisp_200:1004,OR(product.siteId:CotoDigital))',
            Nrpp: '1000',
            format: 'json'
        });
        if (nf) { params.set('Nf', nf); }

        const cleanBaseUrl = this.baseUrl.split('?')[0];
        const url = `${cleanBaseUrl}?${params.toString()}`;
        console.log("URL usada:", url);

        const response = await context.get(url);
        if (!response.ok()) {
            throw new Error(`API call failed: ${response.status()}`);
        }

        const body = await response.json();
        return this.parseProducts(body);
    }

    parseProducts(body) { 
        const productos = []; 
        const records = body?.contents?.[0]?.Main?.[2]?.contents?.[0]?.records || []; 
        for (const record of records) {
            const subRecords = record?.records || []; 
            for (const subRecord of subRecords) { 
                const nombre = subRecord?.attributes?.["product.displayName"] || subRecord?.attributes?.["product.description"] || nombrePadre; 
                const precio = subRecord?.attributes?.["sku.referencePrice"] || subRecord?.attributes?.["sku.activePrice"] || precioPadre; 
                if (nombre && precio) { 
                    productos.push({ nombre, precio }); 
                } 
            } 
        } 
        if (productos.length === 0) { 
            console.log("Categoría sin productos o estructura distinta"); 
        } 
        return productos; 
    }
}

module.exports = { APIProducts };
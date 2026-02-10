// utils/APIProducts.js
const { request } = require('@playwright/test');

class APIProducts {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async listProducts(nrpp = 3000) {
        const context = await request.newContext();

        const params = new URLSearchParams({
            Nf: 'product.endDate|GTEQ 1.7705952E12||product.startDate|LTEQ 1.7705952E12',
            No: '24',
            Nr: 'AND(product.language:español,product.sDisp_200:1004,OR(product.siteId:CotoDigital))',
            Nrpp: nrpp.toString(),
            format: 'json'
        });

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
            // Caso Baguette: atributos en el record principal
            const nombreDirecto = record?.attributes?.["product.displayName"] || record?.attributes?.["product.description"];
            const precioDirecto = record?.attributes?.["sku.referencePrice"];
            if (nombreDirecto && precioDirecto) {
                productos.push({ nombre: nombreDirecto, precio: precioDirecto });
            }

            // Caso Molde: atributos en subRecords
            const subRecords = record?.records || [];
            for (const subRecord of subRecords) {
                const nombre = subRecord?.attributes?.["product.displayName"] || subRecord?.attributes?.["product.description"];
                const precio = subRecord?.attributes?.["sku.referencePrice"];
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

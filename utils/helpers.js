import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

function encodeCategoryName(category) { 
    return encodeURIComponent( category 
        .trim() 
        .toLowerCase() 
        .replace(/\s+/g, "-") 
    ); 
}

function exportToExcel(products, filename = "productos.xlsx") {
    const normalized = products.map(p => ({
        nombre: p.nombre[0].trim(),
        precio: parseFloat(p.precio[0])
    }));

    const worksheet = XLSX.utils.json_to_sheet(normalized);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

   // Definir carpeta destino
    const outputDir = path.join(process.cwd(), "exports");
    const outputPath = path.join(outputDir, filename);
   // Crear carpeta si no existe
    if (!fs.existsSync(outputDir)) { 
    fs.mkdirSync(outputDir); 
    } 
    // Guardar archivo en la carpeta elegida
    XLSX.writeFile(workbook, outputPath);
}


module.exports = { encodeCategoryName, exportToExcel }


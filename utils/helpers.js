function encodeCategoryName(category) { 
    return encodeURIComponent( category 
        .trim() 
        .toLowerCase() 
        .replace(/\s+/g, "-") 
    ); 
} 
module.exports = { encodeCategoryName }
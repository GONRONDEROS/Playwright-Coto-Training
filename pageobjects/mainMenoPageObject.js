const {encodeCategoryName} = require('../utils/helpers');
class MainMenuBar{
    constructor(page){
        this.page = page;
        
    }

    async hoverCategoryMenu(menuCategory){
        await this.page.locator(`a.categorias-generales:has-text("${menuCategory}")`).hover();
    }

    async selectAndNavigateToParticularCategory(category, particularCategory){
        const normalizedUrl = encodeCategoryName(particularCategory);
        await Promise.all([
            this.page.waitForURL(new RegExp(normalizedUrl)),
            this.page.locator( `ul:has(> a:has-text("${category}")) >> li >> a:has-text("${particularCategory}")` ).first().click()
        ])
        return this.page.url();
    }
}
module.exports = {MainMenuBar}
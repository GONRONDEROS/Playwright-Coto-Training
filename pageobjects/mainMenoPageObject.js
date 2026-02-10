class MainMenuBar{
    constructor(page){
        this.page = page;
        
    }

    async hoverCategoryMenu(menuCategory){
        await this.page.locator(`a.categorias-generales:has-text("${menuCategory}")`).hover();
    }

    async selectAndNavigateToParticularCategory(category, particularCategory){
        await this.page.locator( `ul:has(> a:has-text("${category}")) >> li >> a:has-text("${particularCategory}")` ).click();
        await this.page.waitForURL(new RegExp(`${particularCategory.toLowerCase()}`));

    }
}
module.exports = {MainMenuBar}
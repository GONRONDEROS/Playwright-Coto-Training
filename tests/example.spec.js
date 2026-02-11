// @ts-check
import { test, expect } from '@playwright/test';
import { APIProducts } from '../utils/APIProducts';
const {MainMenuBar} = require('../pageobjects/mainMenoPageObject');
const {ProductsPage} = require('../pageobjects/productsPage');
const dataSet = JSON.parse(JSON.stringify(require('../utils/mainManuCategoriesOptions.json')));

for (const data of dataSet){
test(`Navegar a "${data.category}", "${data.particularCategory}", "${data.moreParticularCategory}"`, async ({ page }) => {
  await page.goto('https://www.cotodigital.com.ar/sitios/cdigi/nuevositio');

  const mainMenuBar = new MainMenuBar(page);
  const productPage = new ProductsPage(page);

  await mainMenuBar.hoverCategoryMenu(data.menuCategory);
  await mainMenuBar.selectAndNavigateToParticularCategory(data.category, data.particularCategory);
  expect(page.url()).toContain(data.particularCategory.toLowerCase());

  if(data.moreParticularCategory){
    await productPage.clickFiltroDeProductos(data.moreParticularCategory);
    for(const option of data.specificCategory){
    
    const url = await productPage.clickFiltroDeProductos(option);
    const apiProducts = new APIProducts(url.split('?')[0]);
    const products = await apiProducts.listProducts();
    console.log(products);
    await page.goBack();
    }
  } else {
  for(const option of data.specificCatefory){
    
    const url = await productPage.clickFiltroDeProductos(option);
    const apiProducts = new APIProducts(url.split('?')[0]);
    const products = await apiProducts.listProducts();
    console.log(products);
    await page.goBack();
  }
}})
};

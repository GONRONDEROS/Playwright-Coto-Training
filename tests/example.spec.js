
import { test, expect } from '@playwright/test';
import { APIProducts } from '../utils/APIProducts';
import {exportToExcel} from '../utils/helpers';
const {MainMenuBar} = require('../pageobjects/mainMenoPageObject');
const {ProductsPage} = require('../pageobjects/productsPage');
const dataSet = JSON.parse(JSON.stringify(require('../utils/mainManuCategoriesOptions.json')));
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");


for (const data of dataSet){
test(`Navegar a "${data.category}", "${data.particularCategory}", "${data.moreParticularCategory}"`, async ({ page }) => {
  await page.goto('https://www.cotodigital.com.ar/sitios/cdigi/nuevositio');

  const mainMenuBar = new MainMenuBar(page);
  const productPage = new ProductsPage(page);

  await mainMenuBar.hoverCategoryMenu(data.menuCategory);
  await mainMenuBar.selectAndNavigateToParticularCategory(data.category, data.particularCategory);
  
  if(data.moreParticularCategory){
    await productPage.clickFiltroDeProductos(data.moreParticularCategory);
    for(const option of data.specificCategory){
    const url = await productPage.clickFiltroDeProductos(option);
    expect(page.url()).toMatch(url);
    const apiProducts = new APIProducts(url.split('?')[0]);
    const products = await apiProducts.listProducts();
    console.log(products);
    exportToExcel(products, `${data.category}-${data.particularCategory}-${data.moreParticularCategory}-${timestamp}.xlsx`);
    await page.goBack();
    }
  } else if(data.onlyCategory) {
    const url = await productPage.onlyCategoryMethod(data.onlyCategory);
    expect(page.url()).toMatch(url);
    const apiProducts = new APIProducts(url.split('?')[0]);
    const products = await apiProducts.listProducts();
    console.log(products);
    exportToExcel(products, `${data.category}-${data.particularCategory}-${data.moreParticularCategory}-${timestamp}.xlsx`);
    await page.goBack();
  } else {
    for(const option of data.specificCategory){
    const url = await productPage.clickFiltroDeProductos(option);
    expect(page.url()).toMatch(url);
    const apiProducts = new APIProducts(url.split('?')[0]);
    const products = await apiProducts.listProducts();
    console.log(products);
    exportToExcel(products, `${data.category}-${data.particularCategory}-${data.moreParticularCategory}-${timestamp}.xlsx`);
    await page.goBack();
  }
}})
};
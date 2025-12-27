import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SweetsPage } from "../pages/SweetsPage";
import { LoginPage } from "../pages/LoginPage";
import { BasketPage } from "../pages/BasketPage";

test.describe("SE302 Homework02 - Sweet Shop", () => {
  test("TC01 Navigation: open Sweets page from nav", async ({ page }) => {
    const home = new HomePage(page);
    const sweets = new SweetsPage(page);

    await home.goto();
    await home.sweetsNav.click();
    await sweets.expectOnSweetsPage();
  });

  test("TC03 Basket: add one product increases basket count", async ({ page }) => {
    const home = new HomePage(page);
    const sweets = new SweetsPage(page);

    await home.goto();
    await home.sweetsNav.click();
    await sweets.expectOnSweetsPage();

    await expect(home.basketNav).toContainText("0");
    await sweets.addFirstItemToBasket();
    await expect(home.basketNav).toContainText("1");
  });

  test("TC05 Basket: empty basket clears items", async ({ page }) => {
    const home = new HomePage(page);
  const sweets = new SweetsPage(page);
  const basket = new BasketPage(page);

  await home.goto();
  await home.sweetsNav.click();
  await sweets.expectOnSweetsPage();

  await sweets.addFirstItemToBasket();
  await expect(home.basketNav).toContainText("1");

  await home.basketNav.click();
  await expect(page).toHaveURL(/\/basket/);

  await basket.emptyBasket();

  await home.sweetsNav.click();
  await sweets.expectOnSweetsPage();
  await expect(home.basketNav).toContainText("0");
  });

  test("TC09 Login negative: invalid email format shows validation", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("not-an-email", "qwerty");

    await expect(login.emailError).toBeVisible();
  });

  test("TC08 Checkout negative: clicking continue with empty form shows required errors", async ({ page }) => {
    const basket = new BasketPage(page);

    await basket.goto();
    await basket.continueCheckoutBtn.click();

    await expect(basket.firstNameError).toBeVisible();
  });
});

import { Page, Locator, expect } from "@playwright/test";

export class BasketPage {
  readonly page: Page;

  readonly emptyBasketLink: Locator;
  readonly redeemBtn: Locator;
  readonly promoError: Locator;
  readonly continueCheckoutBtn: Locator;
  readonly firstNameError: Locator;

  readonly basketLineItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emptyBasketLink = page.locator('a:has-text("Empty Basket")');

    this.redeemBtn = page.getByRole("button", { name: "Redeem" });
    this.promoError = page.getByText("Please input a valid promo code.");
    this.continueCheckoutBtn = page.getByRole("button", { name: "Continue to checkout" });
    this.firstNameError = page.getByText("Valid first name is required.");

    this.basketLineItems = page
      .locator(".basket-item, .list-group-item, tr")
      .filter({
        hasNotText:
          /Promo code|Redeem|Subtotal|Total|Collect|Standard Shipping|Shipping|Delivery|Tax|Taxes|Continue to checkout|Empty Basket/i,
      });
  }

  async goto() {
    await this.page.goto("/basket");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async emptyBasket() {
    await this.emptyBasketLink.waitFor({ state: "visible", timeout: 10000 });
    await this.emptyBasketLink.scrollIntoViewIfNeeded();
    await this.emptyBasketLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectBasketIsEmpty() {
    await this.page.reload();
    await this.page.waitForLoadState("domcontentloaded");

    await expect(this.basketLineItems).toHaveCount(0, { timeout: 10000 });
  }
}

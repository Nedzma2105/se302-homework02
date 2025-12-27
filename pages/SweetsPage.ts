import { Page, Locator, expect } from "@playwright/test";

export class SweetsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly basketNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /Browse sweets/i });
    this.basketNav = page.locator('a.nav-link[href="/basket"]');
  }

  async expectOnSweetsPage() {
    await expect(this.page).toHaveURL(/\/sweets/);
    await expect(this.heading).toBeVisible();
  }

  
  async addFirstItemToBasket() {
    await this.page.waitForLoadState("domcontentloaded");

    const addBtn = this.page
      .locator('button:has-text("Add to Basket"), a:has-text("Add to Basket")')
      .first();

    await expect(addBtn).toBeVisible({ timeout: 10000 });

    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
  }
}

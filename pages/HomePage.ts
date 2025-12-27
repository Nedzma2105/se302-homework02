import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly sweetsNav: Locator;
  readonly browseSweetsCta: Locator;
  readonly basketNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sweetsNav = page.locator('a.nav-link[href="/sweets"]');
    this.browseSweetsCta = page.getByRole("link", { name: "Browse Sweets" });
    this.basketNav = page.locator('a.nav-link[href="/basket"]');

  }

  async goto() {
    await this.page.goto("/");
  }
}

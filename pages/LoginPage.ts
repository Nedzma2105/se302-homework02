import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly emailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel("Email address");
    this.password = page.getByLabel("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.emailError = page.getByText("Please enter a valid email address.");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

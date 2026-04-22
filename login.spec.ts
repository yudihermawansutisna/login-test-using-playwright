import { test, expect, Page } from '@playwright/test';

class LoginPage {
  constructor(private page: Page) {}

  username = this.page.locator('[data-testid="username"]');
  password = this.page.locator('[data-testid="password"]');
  loginBtn = this.page.locator('[data-testid="login-button"]');
  dashboardHeader = this.page.locator('[data-testid="dashboard-header"]');

  async open() {
    await this.page.goto('https://example.com/login');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);

    // waiting berbasis kondisi (bukan sleep)
    await expect(this.loginBtn).toBeEnabled();

    await this.loginBtn.click();
  }
}

test('User bisa login dengan kredensial valid', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('validUser', 'validPassword');

  // tunggu sampai dashboard muncul
  await expect(loginPage.dashboardHeader).toBeVisible();

  // assertion utama
  await expect(loginPage.dashboardHeader).toHaveText('Welcome');
});
const { Given, When, Then, After } = require('@cucumber/cucumber');
const assert = require('assert/strict');
const { By, until } = require('selenium-webdriver');

// LoginSteps class

// Given I load the Login Page

Given('I load the Login Page', { timeout: 40000 }, async function () {
  await this.load();
  await this.driver.get(this.appUrl + 'login');

  // Wait
  await this.driver.wait(until.elementLocated(By.name('email')), 10000);
});

When('I enter the username {string}', async function (username) {
  const input = await this.getUsernameInput();
  await input.sendKeys(username);
});

When('I enter the password {string}', async function (password) {
  const input = await this.getPasswordInput();
  await input.sendKeys(password);
});

When('I click on the Sign In Button', async function () {
  const button = await this.findSignInButton();
  await button.click();

  // Delay
  await this.driver.sleep(3000);
});

Then('I should see the {string} page', async function (expectedPage) {
  let url = await this.driver.getCurrentUrl();
  assert.strictEqual(url, this.appUrl + expectedPage);
});

After(async function () {
  await this.driver.quit();
});

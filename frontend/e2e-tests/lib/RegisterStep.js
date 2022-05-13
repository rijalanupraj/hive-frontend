const { Given, When, Then, After } = require('@cucumber/cucumber');
const assert = require('assert/strict');
const { By, until } = require('selenium-webdriver');

Given('I load the Register Page', { timeout: 40000 }, async function () {
  await this.load();
  await this.driver.get(this.appUrl + 'register');

  // Wait
  await this.driver.wait(until.elementLocated(By.name('email')), 10000);
});

When('I enter the username {string} in register', async function (username) {
  // Make username unique
  username = username + Date.now();
  const input = await this.driver.findElement(By.name('username'));
  await input.sendKeys(username);
});

When('I enter the email {string} in register', async function (email) {
  // Make email unique to avoid duplicates
  let newEmail = email.split('@')[0] + Date.now() + '@' + email.split('@')[1];
  const input = await this.driver.findElement(By.name('email'));
  await input.sendKeys(newEmail);
});

When('I enter the password {string} in register', async function (password) {
  const input = await this.driver.findElement(By.name('password'));
  await input.sendKeys(password);
});

When('I click on the Register Button in register', async function () {
  const input = await this.driver.findElement(By.css('input[type="submit"]'));

  // Click on input type submit using different methods expect click
  await input.sendKeys('\uE007');

  // Delay
  await this.driver.sleep(3000);
});

Then('I should see the {string} page from register', async function (expectedPage) {
  let url = await this.driver.getCurrentUrl();
  assert.strictEqual(url, this.appUrl + expectedPage);
});

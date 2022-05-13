const { setWorldConstructor, World, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, By } = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');

class User extends World {
  constructor(options) {
    super(options);
  }

  async load() {
    setDefaultTimeout(10 * 1000);
    this.appUrl = this.parameters.appUrl;
    const service = new chrome.ServiceBuilder(chromedriver.path);
    let chromeOptions = new chrome.Options();
    if (this.parameters.headless) {
      chromeOptions = chromeOptions.headless();
    }
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeService(service)
      .setChromeOptions(chromeOptions)
      .build();

    await this.driver.get(this.appUrl);
  }

  async getUsernameInput() {
    return this.driver.findElement(By.name('email'));
  }

  async getPasswordInput() {
    return this.driver.findElement(By.name('password'));
  }

  async findSignInButton() {
    return this.driver.findElement(By.css('button[type="submit"]'));
  }
}

setWorldConstructor(User);

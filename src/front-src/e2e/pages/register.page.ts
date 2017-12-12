import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo(path) {
    return browser.get(path);
  }

  url() {
    return browser.getCurrentUrl();
  }

	fillAndSendFormCreateProfile(email, name , passwd, verifpasswd) {
		browser.element.all(by.css('input[type=email]')).last().sendKeys(email)
    .then(function() {
      browser.element.all(by.css('input[type=text]')).last().sendKeys(name);
			})
			.then(function() {
				browser.element.all(by.id('password')).sendKeys(passwd);
    }).then(function() {
      browser.element.all(by.id('verifPassword')).sendKeys(verifpasswd);
    }).then(function() {
      browser.element.all(by.css('button[type=submit]')).first().click();
    });
  }

	getNumberOfProject() {

	}

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

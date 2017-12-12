import { browser, by, element } from 'protractor';

export class WorkspacePage {
  navigateTo(path) {
    return browser.get(path);
  }

  url() {
    return browser.getCurrentUrl();
  }

  fillAndSendFormConnection(login,passwd) {
    browser.element.all(by.css('input[type=email]')).first().sendKeys(login)
    .then(function() {
      browser.element.all(by.css('input[type=password]')).first().sendKeys(passwd);
    }).then(function() {
      browser.element.all(by.css('button[type=submit]')).first().click();
    });
  }

	fillAndSendFormProject(name, description, url, begin,end) {
   return browser.element.all(by.css('button[type=button]')).last().click()
    .then(function() {
        browser.wait(element(by.className("modal-body")).isDisplayed, 5000);
      })
      .then(function() {
        browser.element.all(by.id('name')).sendKeys(name)
        })
    .then(function() {
      browser.element.all(by.id('description')).sendKeys(description);
			})
			.then(function() {
				browser.element.all(by.id('url')).sendKeys(url);
    }).then(function() {
      browser.element.all(by.id('begin')).sendKeys(begin);
    }).then(function() {
      browser.element.all(by.id('end')).sendKeys(end);
        }).then(function() {
      browser.element.all(by.css('button[type=submit]')).first().click();
    });
	}

	getFirstCellOfAddedProject() {
    return element.all(by.css('tr:last-of-type td')).first().getText();
	}

  clickOnCreatedProject() {
    browser.element.all(by.css('tr')).last().click();
  }

}

import { browser, by, element } from 'protractor';

export class SidebarPage {
	navigateTo(path) {
		return browser.get(path);
	}

	url() {
		return browser.getCurrentUrl();
	}

	clickOnNewSprint() {
		return browser.element.all(by.cssContainingText('button', 'New sprint')).click()
			.then(function() {
				browser.wait(element(by.className("modal-header")).isDisplayed, 5000);
			});
	}

	getNewSprintModelContent() {
		return element.all(by.className('btn-outline-danger')).last().getText();
	}

	closeModal() {
		browser.element(by.css(".close")).click();
	}

	selectUserStories() {
		return browser.element.all(by.css('tr')).all(by.css('td')).first().all(by.css('button')).click()
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td')).first().all(by.css('button')).click()
			})
	}

	createSprint(begin, duration) {
		return browser.element.all(by.id('begin')).sendKeys(begin)
			.then(function() {
				browser.element.all(by.id('duration')).sendKeys(duration);
			})
			.then(function() {
				browser.element.all(by.css('button[type=submit]')).first().click();
			})
	}

	getSprintArray() {
		return element.all(by.className('list-group')).first().getText();

	}

	countUserStory() {
		return element.all(by.css('tr')).count();
	}

	clickOnAddUser() {
		return browser.element.all(by.cssContainingText('button', 'Add user')).first().click()
			.then(function() {
				browser.wait(element(by.className("modal-body")).isDisplayed, 5000);
			});
	}


	findUser(username) {
		return browser.element.all(by.css('input[type="search"]')).sendKeys(username)
			.then(function() {
				browser.element.all(by.cssContainingText('button', 'Select')).click()
			})

	}


	addUser(username) {
		return browser.element.all(by.css('input[type="search"]')).sendKeys(username)
			.then(function() {
				browser.element.all(by.cssContainingText('button', 'Select')).first().click()
			})
			.then(function() {
				browser.element.all(by.cssContainingText('button', 'Add user')).last().click()
			})
	}

	getChangeButton() {
		return element(by.cssContainingText('button', 'Change')).getText();
	}

	getContributorArray() {
		return element.all(by.className('list-group')).last().getText();

	}
}

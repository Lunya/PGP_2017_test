import { browser, by, element } from 'protractor';

export class ProjectPage {
	navigateTo(path) {
		return browser.get(path);
	}

	url() {
		return browser.getCurrentUrl();
	}

	createUserStory(description, difficulty, priority) {
		return browser.element.all(by.cssContainingText('button', 'Add user story')).click()
			.then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(2)')).sendKeys(description)
			})
			.then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(3)')).clear()
			}).then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(3)')).sendKeys(difficulty)
			}).then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(4)')).clear()
			}).then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(4)')).sendKeys(priority)
			}).then(function() {
				browser.element.all(by.cssContainingText('button', 'Confirm')).click();
			});
	}


	editUserStory(description, difficulty, priority) {
		return browser.element.all(by.css('tr:last-of-type')).all(by.cssContainingText('button', 'Edit')).first().click()
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(2)')).clear()
			})
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(2)')).sendKeys(description)
			})
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(3)')).clear()
			}).then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(3)')).sendKeys(difficulty)
			}).then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(4)')).clear()
			}).then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(4)')).sendKeys(priority)
			}).then(function() {
				browser.element.all(by.cssContainingText('button', 'Confirm')).click();
			});
	}

	deleteUserStory() {
		return browser.element.all(by.css('tr:last-of-type')).all(by.css('td')).last().all(by.css('button')).last().click();
	}

	getFirstCellOfAddedUs() {
		return element.all(by.css('tr:last-of-type td:nth-of-type(2)')).first().getText();
	}

	countUserStory() {
		return element.all(by.css('tr')).count();
	}

}

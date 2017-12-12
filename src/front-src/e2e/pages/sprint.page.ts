import { browser, by, element } from 'protractor';

export class SprintPage {
	navigateTo(path) {
		return browser.get(path);
	}

	url() {
		return browser.getCurrentUrl();
	}

  clickOnSprint(id) {
    return browser.element.all(by.cssContainingText('a', 'Sprint '+id)).click();
  }

  clickOnEditSprint(id) {
      return browser.element.all(by.cssContainingText('button', 'Edit sprint')).click()
      .then(function() {
          browser.wait(element(by.className("modal-body")).isDisplayed, 5000);
        })
    }

  clickOnDeleteSprint(id) {
      return browser.element.all(by.cssContainingText('button', 'Delete sprint')).click();
    }

  selectTasksArray() {
    return browser.element.all(by.cssContainingText('button', 'Tasks')).click();
  }


  editUserStory(state) {
    return browser.element.all(by.css('tr:last-of-type')).all(by.cssContainingText('button', 'Edit')).first().click()
      .then(function() {
        browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(5)')).clear()
      })
      .then(function() {
        browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(5)')).sendKeys(state)
      }).then(function() {
        browser.element.all(by.cssContainingText('button', 'Confirm')).click();
      });
  }

  getUsStatus(description) {
    return element.all(by.cssContainingText('tr', description)).all(by.css('td:nth-of-type(5)')).getText();
  }


	createTask(description, developer, state) {
		return browser.element.all(by.cssContainingText('button', 'Add task')).click()
			.then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(2)')).sendKeys(description)
			}).then(function() {
				browser.element.all(by.css('.table-primary')).all(by.cssContainingText('option', developer)).click()
			}).then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(4)')).clear()
			}).then(function() {
				browser.element.all(by.css('.table-primary td:nth-of-type(4)')).sendKeys(state)
			}).then(function() {
				browser.element.all(by.cssContainingText('button', 'Confirm')).click();
			});
	}


	editTask(description, developer, state) {
		return browser.element.all(by.css('tr:last-of-type')).all(by.cssContainingText('button', 'Edit')).first().click()
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(2)')).clear()
			})
			.then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(2)')).sendKeys(description)
			}).then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(4)')).clear()
			}).then(function() {
				browser.element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(4)')).sendKeys(state)
			}).then(function() {
				browser.element.all(by.cssContainingText('button', 'Confirm')).click();
			});
	}

	deleteTask() {
    return browser.element.all(by.css('tr:last-of-type')).all(by.css('td')).last().all(by.css('button')).last().click();
	}

	getAddedTaskDescription() {
		return element.all(by.css('tr:last-of-type')).all(by.css('td:nth-of-type(2)')).getText();
	}

	countTask() {
		return element.all(by.css('tr')).count();
	}

}

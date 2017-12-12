import { ProjectPage } from './pages/project.page';
import { postRequest, deleteRequest, patchRequest }  from './httpRequests';
import { browser, by, element, protractor } from 'protractor';

const serverURL = "http://localhost:3000/api";

/**************DO NOT REMOVE ! THIS SLOW DONW PROTRACTOR****************

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
  var args = arguments;
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });
  return origFn.apply(browser.driver.controlFlow(), args);
};

/***********************************************************************/

describe('POST /userstories/:id : pgp create a user story e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
	});

	it('should add a user story with description "Apprendre aux poules à voler" into the database -> code 200', () => {
		page.createUserStory("Apprendre aux poules à voler", "13", "1").then(function() {
			let data = {
				description: 'Apprendre aux poules à voler',
				difficulty: 13,
				priority: 1,
				state: 'TODO'
			};
			postRequest(serverURL + "/userstories/1", data).then(function(result) {
				deleteRequest(serverURL + "/userstory/1/2").then(function(result) {
					expect(result["status"]).toBe(200);
				});
			});
		})
	});

	it('should display the added user story in the us list -> ', () => {
		expect(page.getFirstCellOfAddedUs()).toEqual('Apprendre aux poules à voler');
	});

});


/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('GET /userstories/:id : pgp UserStories listing e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
		page.createUserStory("Ouvrir une boite de brocolis", "8", "2");
		page.createUserStory("Chercher l'oiseau dans la grange", "5", "1");
	});

	it('should display 3 UserStories after adding 2 other one - > ', () => {
		let nbUsPLUSHeader = 3 + 1;
		expect(page.countUserStory()).toEqual(nbUsPLUSHeader);

	});

});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('PATCH, DELETE /userstory/:idproject/:id : pgp édition de user story e2e testing', () => {
	let page: ProjectPage;

	beforeEach(() => {
		page = new ProjectPage();
		page.navigateTo('/project/1');
	});

	it('should modify user story "Chercher l\'oiseau dans la grange" with description "Sortir la chèvre de la bergerie" into the database -> code 200', () => {
		page.editUserStory("Sortir la chèvre de la bergerie", "8", "1").then(function() {
			let data = {
				description: 'Sortir la chèvre de la bergerie',
				difficulty: 8,
				priority: 1,
				state: 'TODO'
			};
			patchRequest(serverURL + "/userstory/1/4", data).then(function(result) {
				expect(result["status"]).toBe(200);
			});
		})
	});


	it('should delete user story "Sortir la chèvre de la bergerie" -> after delete, http delete request code 400', () => {
		page.deleteUserStory();
		deleteRequest(serverURL + "/userstory/1/4").then(function(result) {
			expect(result["status"]).toBe(200);
		})
	});
});

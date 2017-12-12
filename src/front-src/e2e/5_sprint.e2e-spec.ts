import { SidebarPage } from './pages/sidebar.page';
import { SprintPage } from './pages/sprint.page';
import { postRequest, deleteRequest, getRequest, patchRequest }  from './httpRequests';
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


describe('POST /sprint : pgp sprint creation e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should not allow user to create sprint if no user stories are selected', () => {
		page.clickOnNewSprint().then(function() {
			page.getNewSprintModelContent().then(function(message) {
				expect(message).toEqual("Please select user stories first");
			})
		})
	});

	it('should create a new sprint in database -> code 200', () => {
		page.selectUserStories().then(function() {
			page.clickOnNewSprint().then(function() {
				page.createSprint('2018-1-1', 2).then(function() {
					let data = {
						begin: '2018-1-1',
						end: '2018-1-3',
						idProject: 1,
						usSprint:
						[{
							id: 3,
							description: 'Ouvrir une boite de brocolis',
							difficulty: 8,
							priority: 2,
							state: 'TODO'
						}]
					}
					postRequest(serverURL + "/sprint", data).then(function() {
						deleteRequest(serverURL + "/sprint/1/2").then(function(result) {
							expect(result["status"]).toBe(200);
						});
					});
				})
			})
		})
	});
});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/

describe('GET /sprints/:idproject : pgp sprint listing e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should get all sprint of project -> code 200, result = array of sprint', () => {
		getRequest(serverURL + "/sprints/1").then(function(result) {
			expect(result["status"]).toBe(200);
			expect(result["body"].length).toBeGreaterThan(0);
		});
	});

	it('should display added sprint in the sidebar', () => {
		let sprintArray = page.getSprintArray();
		expect(sprintArray).toContain("Sprint 1");
	});

});

/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('PATCH /userstory/:idproject/:id : pgp user story edition from sprint page e2e testing', () => {
	let page: SprintPage;

	beforeEach(() => {
		page = new SprintPage();
		page.navigateTo('/project/1');
		page.clickOnSprint('1');
	});

	it('should modify user story "Ouvrir une boite de brocolis" from status TODO to DONE  -> code 200', () => {
		page.editUserStory("DONE").then(function() {
			let data = {
				description: 'Ouvrir une boite de brocolis',
				difficulty: 8,
				priority: 2,
				state: 'DONE'
			};
			patchRequest(serverURL + "/userstory/1/3", data).then(function(result) {
				expect(result["status"]).toBe(200);
			});
		})
	});

	it('should display status DONE for updated user story', () => {
		expect(page.getUsStatus('Ouvrir une boite de brocolis')).toContain('DONE');
	});

});

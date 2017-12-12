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


describe('POST /tasks/:idsprint : pgp create a task in a sprint e2e testing', () => {
	let page: SprintPage;

	beforeEach(() => {
		page = new SprintPage();
		page.navigateTo('/project/1').then(function() {
			page.clickOnSprint('1').then(function() {
				page.selectTasksArray();
			})
		})
	});

	it('should add a task with description "Trouver un cric" into the database -> code 200', () => {
		page.createTask("Trouver un cric", "test0", "TODO").then(function() {
			let data = {
				description: 'Trouver un cric',
				developer: 'test0',
				state: 'TODO'
			};
			postRequest(serverURL + "/tasks/1", data).then(function() {
				deleteRequest(serverURL + "/task/1/2").then(function(result) {
					expect(result["status"]).toBe(200);
				});
			});
		})
	});

	it('should display the added task in the tasks list -> ', () => {
		expect(page.getAddedTaskDescription()).toContain('Trouver un cric');
	});

});



describe('GET /tasks/:idsprint : pgp tasks listing e2e testing', () => {
	let page: SprintPage;

	beforeEach(() => {
		page = new SprintPage();
		page.navigateTo('/project/1');
		page.clickOnSprint('1');
		page.selectTasksArray();
		page.createTask("Trouver l\'entrée de la bergerie", "test0", "TODO");
		page.createTask("Enfiler des gants en caoutchouc", "test0", "TODO");
	});

	it('should display 3 Task after adding 2 other one - > ', () => {
		let nbTaskPLUSHeader = 3 + 1;
		expect(page.countTask()).toEqual(nbTaskPLUSHeader);
	});
});
/*--------------------------------------------------------------------
----------------------------------------------------------------------*/
describe('PATCH, DELETE /task/:idsprint/:id : pgp tasks edition e2e testing', () => {
	let page: SprintPage;

	beforeEach(() => {
		page = new SprintPage();
		page.navigateTo('/project/1');
		page.clickOnSprint('1');
		page.selectTasksArray();
	});

	it('should modify the task "Enfiler des gants en caoutchouc" from TODO to DONE-> code 200', () => {
		page.editTask("Enfiler des gants en caoutchouc", "test0", "DONE").then(function() {
			let data = {
				description: 'Enfiler des gants en caoutchouc',
				developer: 'test0',
				state: 'DONE'
			};
			patchRequest(serverURL + "/task/1/4", data).then(function(result) {
				expect(result["status"]).toBe(200);
			});
		})
	});

	it('should delete task "Enfiler des gants en caoutchouc" -> 3 tasks left, code 400', () => {
		page.deleteTask();
      deleteRequest(serverURL + "/task/1/4").then(function(result) {
        expect(result["status"]).toBe(200);
      });
      let nbTaskPLUSHeader = 2 + 1;
      expect(page.countTask()).toEqual(nbTaskPLUSHeader);

	});
});

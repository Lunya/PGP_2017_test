import { SidebarPage } from './pages/sidebar.page';
import { SprintPage } from './pages/sprint.page';
import { postRequest, deleteRequest, getRequest, patchRequest }  from './httpRequests';
import { browser, by, element, protractor } from 'protractor';

const serverURL = "http://localhost:3000/api";


describe('POST /users and /user/:idproject : pgp project member addition e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should find a user with name = test2', () => {
		page.clickOnAddUser().then(function() {
			page.findUser('test2').then(function() {
				expect(page.getChangeButton()).toEqual('Change');
			})
		})
	});

	it('should add user "test2" in contributing users list -> code 200 ', () => {
		page.clickOnAddUser().then(function() {
			page.addUser('test2').then(function() {
				deleteRequest(serverURL + "/user/1/3").then(function(res) {
					postRequest(serverURL + "/user/1", { id: 3 }).then(function(result) {
						expect(result["status"]).toEqual(200);
					});
				})
			})
		})
	});

	it('should not add already existing contributor user "test2" -> code 400 ', () => {
		page.clickOnAddUser().then(function() {
			page.addUser('test2').then(function() {
				postRequest(serverURL + "/user/1", { id: 3 }).then(function(result) {
					expect(result["status"]).toBe(400);
				});
			})
		})
	});
});


describe('GET /users/:idproject : pgp contributor listing e2e testing', () => {
	let page: SidebarPage;

	beforeEach(() => {
		page = new SidebarPage();
		page.navigateTo('/project/1');
	});

	it('should get all contributor of project -> code 200, result = array of user', () => {
		getRequest(serverURL + "/users/1").then(function(result) {
			expect(result["status"]).toBe(200);
			expect(result["body"].length).toBeGreaterThan(0);
		});
	});

	it('should display added contributor in the sidebar', () => {
		let userArray = page.getContributorArray();
		expect(userArray).toContain("test2");
	});

});

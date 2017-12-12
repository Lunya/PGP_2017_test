import { LoginPage } from './pages/login.page';
import { postRequest, deleteRequest }  from './httpRequests';
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

describe('POST /login : pgp connection e2e testing', () => {
	let page: LoginPage;

	beforeEach(() => {
		page = new LoginPage();
		page.navigateTo('/');
	});

	it('should connect with login = test0@gmail.com and passwd = 123456789 -> code 200 and redirection to /workspace ', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "123456789");
		let data = { email: 'test0@gmail.com', password: '123456789' };
		postRequest(serverURL + "/login", data).then(function(result) {
			expect(result["status"]).toBe(200);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/workspace");
	});

	it('should be able to logout after login -> redirection to /home ', () => {
		page.logout();
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not not be able to connect with a wrong login and passwd -> code 400', () => {
		page.fillAndSendFormConnection("test0@gmail.m", "123456");
		let data = { email: 'test0@gmail.m', password: '123456' };
		postRequest(serverURL + "/login", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not be able to connect with a wrong login -> code 400', () => {
		page.fillAndSendFormConnection("test0@gmail.m", "123456789");
		let data = { email: 'test0@gmail.m', password: '123456789' };
		postRequest(serverURL + "/login", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

	it('should not be able to connect with a wrong passwd -> code 401', () => {
		page.fillAndSendFormConnection("test0@gmail.com", "");
		let data = { email: 'test0@gmail.com', password: '123456780' };
		postRequest(serverURL + "/login", data).then(function(result) {
			expect(result["status"]).toBe(401);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});
});

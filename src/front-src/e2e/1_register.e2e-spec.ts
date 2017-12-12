import { RegisterPage } from './pages/register.page';
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

describe('POST /register : pgp register e2e testing', () => {
	let page: RegisterPage;

	beforeEach(() => {
		page = new RegisterPage();
		page.navigateTo('/signup');
	})


	it('should create profile with login = test0@gmail.com name=test0 and passwd = 123456789 -> code 200 and redirection to /home', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "123456789");
		expect(page.url()).toEqual(browser.baseUrl + "/home").then(function(result) {
			let data = { email: 'test0bis@gmail.com', password: '123456789', name: 'test0' };
			postRequest(serverURL + "/register", data).then(function(result) {
				deleteRequest(serverURL + "/user/2").then(function(result) {
					expect(result["status"]).toBe(200);
				})
			});
		})
	});

	it('should not create profile if pasword and confirmation are not the same -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "12345678");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	it('should not create profile if login = test0@gmail.com  already exist -> code 400', () => {
		page.fillAndSendFormCreateProfile("test0@gmail.com", "test0", "123456789", "123456789");
		let data = { email: 'test0@gmail.com', password: '123456789', name: 'test0' };
		postRequest(serverURL + "/register", data).then(function(result) {
			expect(result["status"]).toBe(400);
		});
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	it('should not create profile if password is not long enough -> no redirection', () => {
		page.fillAndSendFormCreateProfile("test1@gmail.com", "test0", "12345", "12345");
		expect(page.url()).toEqual(browser.baseUrl + "/signup");
	});

	it('should create profile test2', () => {
		page.fillAndSendFormCreateProfile("test2@gmail.com", "test2", "123456789", "123456789");
		expect(page.url()).toEqual(browser.baseUrl + "/home");
	});

})

import { browser, by, element, protractor } from 'protractor';

//export module HttpRequests {

export function getRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'GET', json: true }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
			"body": response.body
		});
	});
	return defer.promise;
}


export function deleteRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'DELETE', json: true }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}



export function postRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'POST', json: true, body: data }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}


export function patchRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'PATCH', json: true, body: data }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
		});
	});
	return defer.promise;
}


//}

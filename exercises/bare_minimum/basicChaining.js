/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification');
var promiseConstructor = require('./promiseConstructor');



var writeResponseToFilePath = function(body, writeFilePath) {
	
	return new Promise(function (resolve, reject) {
		
		fs.writeFile(writeFilePath,body,'utf8', function(err) {
			if (err) {
				reject(err);
			} else {
				console.log("Function 3 done");
				
				var profile = fs.readFileSync(writeFilePath, 'utf8');
				console.log("hi" + profile);
				resolve();
			}
		})
	})
}


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  	
	return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
		.then(promisification.getGitHubProfileAsync)
			.then(function(body){
				writeResponseToFilePath (body, writeFilePath)
			});
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

trimUrlForm = document.querySelector('.trim-url-form');

/**Gets the new trim returned from the server and adds it to the display.
 * Prints an error if the server returns an error message.
 * @param {Response} response. The response object.
 */
const printNewTrim = (response)=> {
	if (!response.ok) 
		showError(response, true);

	// Logic to add new trim to the list here.
	console.log(response);
}

/**Prints an error message for the user.
 * @param {any} reason. An object representing the error, either from the browser, or sent back from the server.
 * @param {boolean} isServerResponse. A boolean value indicating if the response was gotten from the server.
 */
const showError = (reason, isServerResponse = false)=> {
	if (isServerResponse) {
		//Handle error from server here.
		console.log(reason);
	}

	else {
		//Handle browser error here.
		console.log(reason);
	}
}

trimUrlForm.onsubmit = (e)=> {
	const urlData = new FormData(trimUrlForm);

	fetch('/', {
		method: 'POST',
		body: urlData
	})
	.then(printNewTrim) //Be sure to handle error response from the server.
	.catch(showError) //If the browser fails to communicate with the server, handle such errors here.
}
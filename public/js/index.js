const trimUrlForm = document.querySelector('.trim-url-form');
const table_body = document.querySelector('#tbody');
const clipsListContainer = document.querySelector('#clips-list-container');
const err_msg = document.querySelector('#msg');
const clipText = " \n  Amazingly shortened with Trim. Visit http://trim.ng to trim your Links!!!";

/**Gets the new trim returned from the server and adds it to the display.
 * Prints an error if the server returns an error message.
 * @param {Response} response. The response object.
 */	
const printNewTrim = async(response)=> {
	if (!response.ok) 
		return showError(response, true);

	trimUrlForm.reset();
	let tr_clip = document.createElement('tr')
	tr_clip.id = 'table-body'
	// Logic to add new trim to the list here.
	try {
		const newClip = await response.json()
		let { _id, click_count, long_url, urlCode, clipped_url, expiry_date} = await newClip.payload;

		if (expiry_date)
			expiry_date = new Date(expiry_date).toDateString();
				
		const clip_row = `
			<td>
				<a id="clipCount" href="#chartModal" data-clip="${_id}" onclick="getChartInfo(event, 'device')" data-toggle="modal">
					${click_count}
				</a>		
			</td>
			<td>
				<a class="trimmed" target="_blank" href="/${urlCode}">
					${clipped_url}
				</a>
			</td>
			<td class="action-btn">
				<a href="javascript:void(0);" class="fas fa-copy fa-lg copy" data="${clipped_url}" data-tippy-placement="top" data-tippy-content="COPIED!">
				</a>
				<a href="https://api.whatsapp.com/send?&text=${clipped_url}+' '+ ${clipText}*">
					<i class="fab fa-whatsapp fa-lg"></i>
				</a>
				<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${clipped_url}+' '+ ${clipText}%>&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><i class="fab fa-facebook fa-lg"></i></a>
				<a class="" href="https://twitter.com/intent/tweet?text=${clipped_url}+' '+ ${clipText}%>" data-size="large">
					<i class="fab fa-twitter fa-lg"></i>
				</a>
			</td>
			<td>
				<a class="long-url" href="${long_url}">${long_url}</a>
			</td>
			<td id="col-expiry">
				${expiry_date || '—'}
			</td>
			`

		tr_clip.innerHTML = clip_row
		clipsListContainer.style.display = "initial";

		table_body.prepend(tr_clip)											
	}									
		//Handle browser error here.
	catch(error) {
		if(error.message === 'Body has already been consumed.')
			return;
			
		console.log(error);
	}
}

/**Prints an error message for the user.
 * @param {any} reason. An object representing the error, either from the browser, or sent back from the server.
 * @param {boolean} isServerResponse. A boolean value indicating if the response was gotten from the server.
 */
const showError = async(reason, isServerResponse = false)=> {
	if (isServerResponse) {
		//Handle error from server here.
		let message = await reason.json();
		err_msg.innerText = message.error;
		err_msg.style.display="block"
	}

	else {
		//Handle browser error here.
		console.log(reason);
	}
}

if(trimUrlForm){
	trimUrlForm.onsubmit = (e)=> {
		e.preventDefault();

		const clipData = new FormData(trimUrlForm);
		const urlData = {}; // constructing new obj.
	
		// add the form key/value pairs
		for (var pair of clipData.entries()) {
			urlData[pair[0]] = pair[1];
		}

		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({...urlData})
		})
		.then(printNewTrim) //Be sure to handle error response from the server.
		.catch(showError); //If the browser fails to communicate with the server, handle such errors here.
	}
}
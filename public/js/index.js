const trimUrlForm = document.querySelector('.trim-url-form');
const table_body = document.querySelector('#tbody');
const clipsListContainer = document.querySelector('#clips-list-container');
const err_msg = document.querySelector('#msg');
const clipText = " \n  Amazingly shortened with Trim. Visit http://trim.ng to trim your Links!!!";
const syncDevicesForm = document.querySelector('#sync-devices-form');
const showSyncID = document.querySelector('.show-sync-id')

const generateClipRow = (shortenedUrl) => {
	let expiry
	if (shortenedUrl.expiry_date) {
		expiry = new Date(shortenedUrl.expiry_date).toDateString()
	}
	return `
	<td>
		<a id="clipCount" href="#chartModal" data-clip="${shortenedUrl._id}" onclick="getChartInfo(event, 'device')" data-toggle="modal">
			${shortenedUrl.click_count}
		</a>		
	</td>
	<td>
		<a class="trimmed" target="_blank" href="/${shortenedUrl.urlCode}">
			${shortenedUrl.clipped_url}
		</a>
	</td>
	<td class="action-btn">
		<a href="javascript:void(0);" class="fas fa-copy fa-lg copy" data="${shortenedUrl.clipped_url}" data-tippy-placement="top" data-tippy-content="COPIED!">
		</a>
		<a href="https://api.whatsapp.com/send?&text=${shortenedUrl.clipped_url}+' '+ ${clipText}*">
			<i class="fab fa-whatsapp fa-lg"></i>
		</a>
		<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${shortenedUrl.clipped_url}+' '+ ${clipText}%>&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><i class="fab fa-facebook fa-lg"></i></a>
		<a class="" href="https://twitter.com/intent/tweet?text=${shortenedUrl.clipped_url}+' '+ ${clipText}%>" data-size="large">
			<i class="fab fa-twitter fa-lg"></i>
		</a>
		<a href="javascript:void(0);" data-id="${shortenedUrl._id}" class="fas fa-trash-alt fa-lg" onclick="deleteUrl(this)">
    </a>
	</td>
	<td>
		<a class="long-url" href="${shortenedUrl.long_url}">${shortenedUrl.long_url}</a>
	</td>
	<td id="col-expiry">
		${expiry || '—' }
	</td>
	`
}

/**Gets the new trim returned from the server and adds it to the display.
 * Prints an error if the server returns an error message.
 * @param {Response} response. The response object.
 */	
const renderShorts = async(response)=> {
	if (!response.ok) 
		return showError(response, true);
	trimUrlForm.reset();
	try {
		const clips = await response.json()
		if (clips.userClips) {
			const { userClips } = clips
			for (let shortUrl of userClips) {
				const tr_clip = document.createElement('tr')
				tr_clip.id = 'table-body'
				tr_clip.innerHTML = generateClipRow(shortUrl)
				table_body.append(tr_clip)
			}
			syncDevicesForm.reset()
			showSyncID.innerHTML = `Here is your syncID: <b>${clips.created_by}</b>`
		} else if (clips.payload) {
			// Logic to add new trim to the list here.
			const { payload } = clips
			const tr_clip = document.createElement('tr')
			tr_clip.id = 'table-body'
			tr_clip.innerHTML = generateClipRow(payload)
			clipsListContainer.style.display = "initial";
			table_body.prepend(tr_clip)			
			showSyncID.innerHTML = `Here is your syncID: <b>${payload.created_by}</b>`	
		}
		if(syncDevicesForm){
			syncDevicesForm.style.display = 'none'
		}
		showSyncID.style.display = 'block'							
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
		.then(renderShorts) //Be sure to handle error response from the server.
		.catch(showError); //If the browser fails to communicate with the server, handle such errors here.
	}
}

if (syncDevicesForm) {
	syncDevicesForm.onsubmit = (e) => {
		e.preventDefault()
		const userID = document.querySelector("input[name='userID'")
		fetch('/sync-device', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({userID: userID.value})
		})
		.then(renderShorts)
		.catch(showError)
	}
}
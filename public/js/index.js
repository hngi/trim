const trimUrlForm = document.querySelector('.trim-url-form');
const tr_body = document.querySelector('#tbody');
const clipsListContainer = document.querySelector('#clips-list-container');
const err_msg = document.querySelector('#msg')
const clipText = " \n  Amazingly shortened with trimly. Visit http://trimly.tk to trim your Links!!!";

/**Gets the new trim returned from the server and adds it to the display.
 * Prints an error if the server returns an error message.
 * @param {Response} response. The response object.
 */	
const printNewTrim = async(response)=> {
	if (!response.ok) 
		return showError(response, true);

	let tr_clip = document.createElement('tr')
	let td_click_count = document.createElement('td')
	let td_long_url = document.createElement('td')
	let td_trimmed = document.createElement('td')
	let td_expiry = document.createElement('td')
	let td_action_btn = document.createElement('td')
	let a_trimmed = document.createElement('a')
	let a_action_btn = document.createElement('a')
	let a_whatsapp = document.createElement('a')
	let a_facebook = document.createElement('a')
	let a_twitter = document.createElement('a')
	let clip_font_facebook = document.createElement('i')
	let clip_font_whatsapp = document.createElement('i')
	let clip_font_twitter = document.createElement('i')

	// Logic to add new trim to the list here.
	try {
		const newClip = await response.json()
		const {click_count, long_url, urlCode, clipped_url, expiry_date} = await newClip.payload;

		td_action_btn.classList.add('action-btn');

		td_click_count.innerText = click_count
		tr_clip.appendChild(td_click_count)
		td_long_url.innerText = long_url
		tr_clip.appendChild(td_long_url)

		a_trimmed.className= "trimmed"
		a_trimmed.target = "_blank"
		a_trimmed.href = `/${urlCode}`
		a_trimmed.innerText = clipped_url
		td_trimmed.appendChild(a_trimmed)
		tr_clip.appendChild(td_trimmed)

		td_expiry.id="col-expiry"
		td_expiry.innerText = expiry_date || '—'
		tr_clip.appendChild(td_expiry)


		a_action_btn.href = "javascript:void(0);"
		a_action_btn.className= "fas fa-copy fa-lg copy"
		a_action_btn['data'] = clipped_url;
		a_action_btn['data-tippy-placement'] = "top"
		a_action_btn['data-tippy-content'] = "COPIED!"
		td_action_btn.appendChild(a_action_btn);
		
		a_whatsapp.href = `https://api.whatsapp.com/send?&text=${clipped_url} ${clipText}*`
		clip_font_whatsapp.className= "fab fa-whatsapp fa-lg"
		a_whatsapp.appendChild(clip_font_whatsapp)
		td_action_btn.appendChild(a_whatsapp)

		a_facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${clipped_url} ${clipText}&amp;src=sdkpreparse`
		a_facebook.target="_blank"
		clip_font_facebook.className= "fab fa-facebook fa-lg"
		a_facebook.className="fb-xfbml-parse-ignore"
		a_facebook.appendChild(clip_font_facebook)
		td_action_btn.appendChild(a_facebook)

		a_twitter.href = `https://twitter.com/intent/tweet?text=${clipped_url} ${clipText}`
		a_twitter['data-size']="large"
		clip_font_twitter.className= "fab fa-twitter fa-lg"
		a_twitter.appendChild(clip_font_twitter)
		td_action_btn.appendChild(a_twitter)

		tr_clip.appendChild(td_action_btn)

		clipsListContainer.style.display = "initial";
		tr_body.prepend(tr_clip)											
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
		e.preventDefault()
		const clipData = new FormData(trimUrlForm);
		const newObj = {}; // constructing new obj.
	
		// add the form key/value pairs
		for (var pair of clipData.entries()) {
			newObj[pair[0]] = pair[1];
		}
		const {created_by, long_url} = newObj
		const urlData = {
			created_by, long_url
		}
	
		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(urlData)
		})
		.then(printNewTrim) //Be sure to handle error response from the server.
		.catch(showError) //If the browser fails to communicate with the server, handle such errors here.
	}
}
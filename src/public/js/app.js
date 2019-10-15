const addLink = async ()=>{
  const long_url= document.getElementsByName("long_url")
  const created_by= document.getElementsByName("created_by")

  let link = {
    long_url: long_url[0].value,
    created_by: created_by[0].value
  }
  try{
    await postLink('/', link)
    long_url[0].value=""
    await fetchLinks('/api/fetch/links')
    closeAlert()
  }catch(error){
    let info = document.querySelector('#page-info')
    let div_message = document.createElement('div')
    let error_anchor = document.createElement('a')
    let errorMessage = document.createTextNode('Enter a Valid URL')
    div_message.className = "alert alert-danger error-div"
    error_anchor.href="#"
    error_anchor.className="fa-pull-right"
    error_anchor.onclick= closeAlert
    error_anchor['aria-label'] = "close"
    error_anchor.innerHTML = "&times"
    div_message.appendChild(errorMessage)
    div_message.appendChild(error_anchor)
    info.appendChild(div_message)
  }
}

async function postLink(url ='', link ={}){
  const response = await fetch(url, {
    method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(link)
  })
  return await response.json()
}

function closeAlert() {
  document.querySelector('.error-div').style.display = 'none';
}

async function fetchLinks(url ='/api/fetch/links'){
  const response = await fetch(url)
  const data = await response.json()
  const {clips} = data
  const table_body = document.querySelector('.tbody')
  
  clips.map(clip => {
    let tr_body = document.createElement('tr')
    let td_click_count = document.createElement('td')
    let td_long_url = document.createElement('td')
    let td_trimmed = document.createElement('td')
    let td_social = document.createElement('td')
    let clip_anchor = document.createElement('a')
    let clip_anchor2 = document.createElement('a')
    let clip_anchor_whatsapp = document.createElement('a')
    let clip_anchor_facebook = document.createElement('a')
    let clip_anchor_twitter = document.createElement('a')
    let clip_font_facebook = document.createElement('i')
    let clip_font_whatsapp = document.createElement('i')
    let clip_font_twitter = document.createElement('i')



    td_click_count.innerText = clip.click_count
    tr_body.appendChild(td_click_count)
    // table_body.append(tr_body)
    
    td_long_url.innerText = clip.long_url
    tr_body.appendChild(td_long_url)
    // table_body.append(tr_body)

    clip_anchor.className= "trimmed"
    clip_anchor.target = "_blank"
    clip_anchor.href = `/${clip.urlCode}`
    clip_anchor.innerText = clip.clipped_url
    td_trimmed.appendChild(clip_anchor)
    tr_body.appendChild(td_trimmed)


    clip_anchor2.className= "fas fa-copy fa-lg copy"
    clip_anchor2.data = clip.clipped_url
    clip_anchor2.href = "#"
    td_social.appendChild(clip_anchor2)

    clip_anchor_whatsapp.href = `https://api.whatsapp.com/send?&text=${clip.clipped_url}*`
    clip_font_whatsapp.className= "fab fa-whatsapp fa-lg"
    clip_anchor_whatsapp.appendChild(clip_font_whatsapp)
    td_social.appendChild(clip_anchor_whatsapp)

    clip_anchor_facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${clip.clipped_url}&amp;src=sdkpreparse`
    clip_anchor_facebook.target="_blank"
    clip_font_facebook.className= "fab fa-facebook fa-lg"
    clip_anchor_facebook.className="fb-xfbml-parse-ignore"
    clip_anchor_facebook.appendChild(clip_font_facebook)
    td_social.appendChild(clip_anchor_facebook)

    clip_anchor_twitter.href = `https://twitter.com/intent/tweet?text=${clip.clipped_url}`
    clip_anchor_twitter['data-size']="large"
    clip_font_twitter.className= "fab fa-twitter fa-lg"
    clip_anchor_twitter.appendChild(clip_font_twitter)
    td_social.appendChild(clip_anchor_twitter)

    td_social.className = "action-btn"
    tr_body.appendChild(td_social)

    return table_body.append(tr_body)

  })

}

fetchLinks('/api/fetch/links')



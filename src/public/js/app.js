const addLink = async ()=>{
  const long_url= document.getElementsByName("long_url")
  const created_by= document.getElementsByName("created_by")

  let link = {
    long_url: long_url[0].value,
    created_by: created_by[0].value
  }


  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(link)
  })
  return await response.json()
}


// let response = await fetch('/article/fetch/post/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });

// let result = await response.json();
// alert(result.message);
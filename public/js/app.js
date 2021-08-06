
fetch('/exports', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      }
})
.then((response) => {
    return response.json()
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})


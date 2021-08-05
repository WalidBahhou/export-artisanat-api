
fetch('/exports', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'Authorization'
      }
})
.then((response) => {
    return response.json()
}).then((res) => {
    for (let index = 0; index < res.length; index++) {
        para = res[index];
    }

}).catch((e) => {
    console.log(e)
})


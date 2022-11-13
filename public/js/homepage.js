const params = {
    method:"post",
    Headers:{
        'Content-type':'application/json'
    },
}
fetch("/", params)
.then(rep=>rep.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
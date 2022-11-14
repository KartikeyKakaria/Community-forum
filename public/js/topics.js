const params = {
    method:"post",
    Headers:{
        'Content-type':'application/json'
    },
}
fetch("/", params)
.then(rep=>rep.json())
.then(data=>{
    const Topics = document.getElementById("Topics")
    data.forEach((element, index)=>{
        const topic = document.createElement("li")
        topic.classList.add("topic");
        topic.innerHTML = `<a href="/topics/${element.name}">${index+1} ${element.name}</a>`;
        Topics.appendChild(topic)
    })
})
.catch(err=>console.log(err))
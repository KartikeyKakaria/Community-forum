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
    data.forEach(element=>{
        const topic = document.createElement("li")
        topic.classList.add("topic");
        topic.innerHTML = `<li class="topic"><a href="/topics/${element.name}">${element.name}</a></li>`;
        Topics.appendChild(topic)
    })
})
.catch(err=>console.log(err))
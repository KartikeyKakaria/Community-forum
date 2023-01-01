const topics = document.querySelector('.topics')
window.onload = ()=>{
    fetch('/getTopics')
    .then(rep=>rep.json())
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err)
    })
}
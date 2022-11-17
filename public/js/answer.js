document.getElementById("submit").addEventListener("click",async()=>{
    const answer = document.querySelector("#answer").value;
    const quesId = document.getElementById("questionId").value;
    const params = {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({answer, quesId})
    }
    fetch("/postAnswer",params)
    .then(rep=>rep.json())
    .then(data=>console.log(data))
    .catch(err=>consol.log(err))
}) 
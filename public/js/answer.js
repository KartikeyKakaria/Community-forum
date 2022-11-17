const displayAnswers = ()=>{
    fetch("/getAnswers")
    .then(rep=>rep.json())
    .then(data=>{
        const answers = document.getElementById("answers");
        const answerForm = document.getElementById("form")
        answers.innerHTML  = "";
        data[0].forEach(async(element,index) => {
            const answer = document.createElement("li");
            const answererName = await getUserName(element.userId);
            answer.innerHTML = `${index+1}. ${element.description} by ${answererName}`
            answers.appendChild(answer)
        });
        if(data[1])return
        answerForm.innerHTML="Please login to ask questions";
    }).catch(err=>console.log(err))
}
displayAnswers()
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
    .then(data=>{
        if(data.description == undefined){
            alert("Couldn't post the answer, sorry for the inconvenience")
        }else{
            alert("Posted the answer successfully");
            displayAnswers();
        }
    })
    .catch(err=>consol.log(err))
}) 
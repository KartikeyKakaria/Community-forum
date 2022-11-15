function displayQuestions(){
 
    fetch("/getQuestions").then(rep=>rep.json())
    .then(data=>{
        data.forEach(element => {
            const quesUl = document.getElementById("questions");
            const question = document.createElement("li");
            question.innerHTML = `<a href="/questions/${element._id}">${element.heading}</a>`;
            quesUl.appendChild(question);
            console.log(quesUl, question)
        });

    })
    .catch(err=>console.error(err))
}
displayQuestions()
document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault();
    //getting ques details
    const heading = document.querySelector("#heading").value;
    const description = document.querySelector("#desc").value;
    const topicid = document.querySelector("#topicid").value;
    const userid = document.querySelector("#userid").value;
    const quesData = JSON.stringify({heading:heading,desc:description,topicid:topicid,userid:userid})
    const params = {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:quesData
    }
    fetch("/postQues",params)
    .then(rep=>rep.json())
    .then(data=>{
        if(data.heading !== undefined){
            alert("Poste the question successfully");
            displayQuestions();
        }
        else{
            alert("Couldnt Post the question we are sorry for the inconvenience")
        }
    })
    .catch(err=>{
        alert("Couldnt Post the question we are sorry for the inconvenience")
        console.log(err)
    })
})
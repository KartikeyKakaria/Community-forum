function displayQuestions() {
    
    fetch("/getQuestions").then(rep => rep.json())
    .then(data => {
        console.log("hello")
            const quesUl = document.getElementById("questions");
            quesUl.innerHTML = "";
            data[0].forEach(async(element) => {
                const username = await getUserName(element.userId);
                console.log(element.userId)
                const question = document.createElement("li");
                question.innerHTML = `<a href="/questions/${element._id}">${username}:${element.heading}</a>`;
                quesUl.appendChild(question);
                console.log(quesUl, question)
            });
            if (!data[1]) {
                document.getElementById("postQues").innerHTML = "Please login to ask questions"
            } 
        })

        .catch(err => console.error(err))
}
displayQuestions()
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    //getting ques details
    const heading = document.querySelector("#heading").value;
    const description = document.querySelector("#desc").value;
    const topicid = document.querySelector("#topicid").value;
    const userid = document.querySelector("#userid").value;
    const quesData = JSON.stringify({ heading: heading, desc: description, topicid: topicid, userid: userid })
    const params = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: quesData
    }
    fetch("/postQues", params)
        .then(rep => rep.json())
        .then(data => {
            if (data.heading !== undefined) {
                alert("Poste the question successfully");
                displayQuestions();
            }
            else {
                alert("Couldnt Post the question we are sorry for the inconvenience")
            }
        })
        .catch(err => {
            alert("Couldnt Post the question we are sorry for the inconvenience")
            console.log(err)
        })
})
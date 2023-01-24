const questionId = window.location.href.match(/questions\/\w*/)[0].replace("questions/", "")

// Display Answers
const displayAnswers = async () => {
    const answersDiv = document.querySelector(".answers");
    const request = await fetch(`/getAnswers/${questionId}`);
    const data = await request.json();
    console.log(data)

    return new Promise((resolve,reject)=>{
        if (data.success) {
            let str = ``;
            if (data.data.length > 0) {
                data.data.forEach(answer => {
                    str += `
                            <div class="answer">
                                <h3>${answer.user}</h3> <span>${findTimeElapsed(answer.date)} ago</span>
                                <p>${answer.text}</p>
                                <button class="btn hover-effect">Show Replies</button>
                            </div>
                            <div class="comments container">
                                <input id=${answer._id} class="comment-input" placeholder="Enter comment">
                                <button class="comment" data-id=${answer._id}>Post</button>
                            </div>
                            `
                })
            } else {
                str = `<h2>No Answers :(, Maybe you can Answer?</h2>`
            }
            answersDiv.innerHTML = str;
            resolve();
        } else { answersDiv.innerHTML = `<h2>${data.data.error}</h2>` ; reject() }
    })
}


// Post Answer
const submit = document.getElementById("submit");
submit.addEventListener('click', e => {
    const answer = getInpValue('answer');
    const params = new Params('json', { answer, questionId });
    fetch('/answer', params).then(rep => rep.json())
        .then(async (data) => {
            if (data.success) {
                swal({
                    title: "Posted",
                    text: "Your answer was posted successfully :)",
                    icon: "success",
                })
                await displayAnswers();
            } else {
                swal({
                    title: "Error",
                    text: data.msg,
                    icon: "warning",
                })
            }
        })
        .catch(err => window.location.href = "/login")
})
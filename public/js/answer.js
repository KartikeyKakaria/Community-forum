const questionId = window.location.href.match(/questions\/\w*/)[0].replace("questions/", "")

// Display Answers
const displayAnswers = async () => {
    const answersDiv = document.querySelector(".answers");
    fetch(`/getAnswers/${questionId}`)
        .then(rep => rep.json())
        .then(data => {
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
                        `
                    })
                } else {
                    str = `<h2>No Answers :(, Maybe you can Answer?</h2>`
                }
                answersDiv.innerHTML = str;
            } else { answersDiv.innerHTML = `<h2>${data.data.error}</h2>` }
        }).catch(err => answersDiv.innerHTML = `<h2>${err}</h2>`)
}
(async () => await displayAnswers())();

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
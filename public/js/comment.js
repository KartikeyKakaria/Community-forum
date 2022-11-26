const displayAnswers = () => {
    const questionid = document.getElementById("questionId").value;
    fetch("/getAnswers", {
        method: "post",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ questionid })
    })
        .then(rep => rep.json())
        .then(data => {
            const answerForm = document.getElementById("form")
            const answers = document.getElementById("answers");
            answers.innerHTML = "";
            data[0].forEach(async (element, index) => {
                const comments = await getComments(element._id)
                const answererName = await getUserName(element.userId);
                answers.innerHTML += `<li>${index + 1}. ${element.description} by ${answererName}<br>
            <button class="Reply" value="${element._id}">Reply</button><button class="showreplies" id="${element._id}">Show Replies</button></li><br><ul id="comments">${comments}</ul><hr>`;
            });


            if (!data[1]) {
                answerForm.innerHTML = "Please login to ask questions";
            }
        }).catch(err => console.log(err))
}

displayAnswers()
function postComment() {
    let postComment = document.querySelectorAll("button.Reply");
    console.log(postComment)
    postComment.forEach(element => {
        element.addEventListener("click", e => {
            let isloginned = false;
            cookieExists()
            .then(boole=>isloginned=true)
            if (isloginned) {
                const comment = prompt("Enter The Comment");
                const params = {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        comment: comment,
                        answerId: element.value
                    })
                }
                fetch("/postComment", params)
                    .then(rep => rep.json())
                    .then(async (data) => {

                        if (data.description == undefined) {
                            alert("Unable to post comment")
                        } else {
                            alert("posted the comment successfully")
                        }
                        displayAnswers()

                    })
                    .catch(err => console.log(err))
            } else {
                alert("Please login to ask questions")
            }
        })

    })
}

function getComments(id) {
    const params = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ id })
    }
    return fetch("/getComments", params)
        .then(rep => rep.text())
        .then(data => {
            let commentsStr = "";
            data = JSON.parse(data)
            if (data.length > 0) {
                data.forEach(async (element, index) => {
                    commentsStr += `<li class='comment'>${index + 1}. ${element.description}</li>`


                })
            } else {
                commentsStr = "No Comments"
            }
            return commentsStr
        })
        .catch(err => console.error(err))
}

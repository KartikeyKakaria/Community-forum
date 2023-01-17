updateNavbar()
const topicName = document.querySelector('h1').innerText;
const submit = document.getElementById('submit');
const displayQuestions = async () => {
    const questionDiv = document.querySelector('.questions');
    await fetch(`/getQuestions/${topicName}`).then(rep => rep.json())
        .then(data => {
            if (data.success) {
                let str = "";
                data.data.forEach(question => {
                    str += `
                    <div class="question">
                        <a href="/questions/${question._id}" >${question.title}</a>
                        <p>Posted by ${question.user}: <span>${findTimeElapsed(question.date)}ago</span></p>
                    </div>
                    `
                })
                questionDiv.innerHTML = str;
            } else {
                questionDiv.innerHTML = data.data.msg;
            }
        })
        .catch(err => questionDiv.innerHTML = err);
}
displayQuestions();
submit.addEventListener('click', e => {
    e.preventDefault();
    const title = getInpValue('title');
    const description = getInpValue('description');
    const data = { topicName, title, description };
    if (isEmpty(data)) {
        swal({
            title: "Invalid!",
            text: "Please Enter Out All fields",
            icon: "warning"
        })
    }
    else {
        const params = new Params('json', data);
        console.log(params)
        fetch('/ask', params)
            .then(rep => rep.json())
            .then(data => {
                if (data.success) {
                    swal({
                        title: "Posted!",
                        text: "Your question was posted successfully",
                        icon: "success",
                    }).then(() => displayQuestions())
                } else {
                    swal({
                        title: "Error",
                        text: data.data.msg,
                        icon: "warning",
                    })
                }
            })
            .catch(err => {
                window.location.href = "/login"
            });
    }
})
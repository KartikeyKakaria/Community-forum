updateNavbar()
const topicName = document.querySelector('h1').innerText;
const submit = document.getElementById('submit');
const displayQuestions = async()=>{
        await fetch(`/getQuestions/${topicName}`).then(rep=>rep.json())
        .then(data=>{
            data.data.forEach(question=>{
                const questionDiv = document.querySelector('.questions');
                questionDiv.innerHTML+=`
                <div class="question">
                    <a href="/questions/${question._id}" >${question.title}</a>
                    <p>Posted by ${question.user}: <span>${findTimeElapsed(question.date)}ago</span></p>
                </div>
                `
            })
        })
        .catch(err=>console.log(err));
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
                    }).then(()=>displayQuestions())
                } else {
                    swal({
                        title: "Error",
                        text: data.data.msg,
                        icon: "warning",
                    })
                }
            })
            .catch(err => {
                window.location.href="/login"
            });
    }
})
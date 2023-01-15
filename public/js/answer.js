const questionId = window.location.href.match(/questions\/\w*/)[0].replace("questions/", "")
const displayAnswers = async () => {
    fetch(`/getAnswers/${questionId}`)
        .then(rep => rep.json())
        .then(data => {
            console.log(data)
        }).catch(err => console.log(err))
}
(async () => await displayAnswers())();
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
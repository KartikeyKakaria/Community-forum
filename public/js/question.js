updateNavbar()
const submit = document.getElementById('submit');
submit.addEventListener('click', e => {
    e.preventDefault();
    const topicName = document.querySelector('h1').innerText;
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
        fetch('/ask', params)
            .then(rep => rep.json())
            .then(data => {
                if (data.success) {
                    swal({
                        title: "Posted!",
                        text: "Your question was posted successfully",
                        icon: "success",
                    })
                } else {
                    swal({
                        title: "Error",
                        text: data.data.msg,
                        icon: "warning",
                    })
                }
            })
            .catch(err => {
                swal({
                    title: "Error",
                    text: err,
                    icon: "warning",
                })
            });
    }
})
(async () => {
    await displayAnswers();
    const commentBtns = document.querySelectorAll(".comment");
    const commentInputs = document.querySelectorAll(".comment-input");
    commentBtns.forEach((commentBtn, index) => {
        commentBtn.addEventListener("click", async (e) => {
            const answerId = e.target.getAttribute('data-id')
            const comment = commentInputs[index].value;
            const params = new Params('json', {
                comment,
                answerId
            })
            console.log(params)
            const response = await fetch("/comment", params)
            const result = await response.json();
            if (result?.success) {
                swal({
                    title: "Posted!",
                    text: result.msg,
                    icon: "success"
                })
            } else {
                swal({
                    title: "Error",
                    text: result.msg,
                    icon: "warning",
                })
            }

        })
    })
})();
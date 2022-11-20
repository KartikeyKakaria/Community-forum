function postComment() {
    
    let postComment = document.querySelectorAll("button.Reply");
    console.log(postComment)
    postComment.forEach(element => {
        element.addEventListener("click", e => {
            const comment = prompt("Enter The Comment");
            const params = {
                method:'post',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    comment:comment,
                    answerId:element.value
                })
            }
            fetch("/postComment",params)
            .then(rep=>rep.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
        })

    })
}



window.onload = async()=>{
    const quesid = document.getElementById("quesId").value;
    const username = await getUserName(quesid);
    const heading = document.getElementById("heading");
    console.log(heading)
    heading.innerText+=`by ${username}`

    //comment
    // let postComment = document.querySelectorAll("button.Reply");
    // console.log(postComment)
    // postComment.forEach(element => {
    //     element.addEventListener("click", e => {
    //         const comment = prompt("Enter The Comment");
    //         console.log(comment, element.lol)
    //     })

    // })
    postComment()
}
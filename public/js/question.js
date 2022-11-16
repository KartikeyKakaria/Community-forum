

window.onload = async()=>{
    const quesid = document.getElementById("quesId").value;
    const username = await getUserName(quesid);
    const heading = document.getElementById("heading");
    console.log(heading)
    heading.innerText+=`by ${username}`
}
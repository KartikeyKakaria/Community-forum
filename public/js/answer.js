const submit = document.getElementById("submit");
submit.addEventListener('click',e=>{
    const answer = getInpValue('answer');
    const questionId = window.location.href.match(/questions\/\w*/)[0].replace("questions/","")
    const params = new Params('json',{answer, questionId});
    fetch('/answer',params).then(rep=>rep.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
})
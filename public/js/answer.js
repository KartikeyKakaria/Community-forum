const submit = document.getElementById("submit");
submit.addEventListener('click',e=>{
    const answer = getInpValue('answer');
    const questionId = window.location.href.match(/questions\/\w*/)[0].replace("questions/","")
    const params = new Params('json',{answer, questionId});
    fetch('/answer',params).then(rep=>rep.json())
    .then(data=>{
        if(data.success){
            swal({
                title:"Posted",
                text:"Your answer was posted successfully :)",
                icon:"success",
            })
        }else{
            swal({
                title:"Error",
                text:data.msg,
                icon:"warning",
            })
        }
    })
    .catch(err=>window.location.href="/login")
})
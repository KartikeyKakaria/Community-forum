updateNavbar()
const submit = document.getElementById('submit');
submit.addEventListener('click',e=>{
    e.preventDefault();
    const topicName = document.querySelector('h1').innerText;
    const title = getInpValue('title');
    const description = getInpValue('description');
    const params = new Params('json',{topicName,title,description});
    console.log(params)
    fetch('/ask',params)
    .then(rep=>rep.text())
    .then(data=>{
        console.log(data)
    })
    .catch(err=>console.log(err));
})
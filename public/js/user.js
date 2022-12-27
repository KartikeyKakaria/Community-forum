const edit = document.getElementById('edit');
const details = document.querySelectorAll('span');
const toggleCss = e=>{
    const btn = e.target;
    btn.classList.toggle('edit');
    btn.classList.toggle('btn');
    btn.classList.toggle('hover-effect');
}
edit.addEventListener('click',e=>{
    let btn = e.target
    if(btn.innerText == 'Change'){
        userDetails = [];
        details.forEach(detail=>{
            userDetails.push(detail.innerText)
            detail.contentEditable=false;  
        })
        const [name,email, age, address,number] = userDetails;
        btn.innerHTML = "&#x270E;"
        toggleCss(e);
        btn.style.background = "white";
        const params = new Params('json',{name, email, age, address, number});
        fetch('/edit',params)
        .then(rep=>rep.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }else{
        details.forEach(detail=>{
            detail.contentEditable=true;    
        })
        btn.innerText = "Change";
        toggleCss(e)       
        btn.style.background="linear-gradient(to bottom right, cyan, blue)";
    }
})
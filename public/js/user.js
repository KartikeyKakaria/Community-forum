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
        details.forEach(detail=>{
            detail.contentEditable=false;  
        })
        btn.innerHTML = "&#x270E;"
        toggleCss(e);
        btn.style.background = "white";
    }else{
        details.forEach(detail=>{
            detail.contentEditable=true;    
        })
        btn.innerText = "Change";
        toggleCss(e)       
        btn.style.background="linear-gradient(to bottom right, cyan, blue)";
    }
})
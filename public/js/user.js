updateNavbar();
const details = document.querySelectorAll('span');
const edit = document.getElementById('edit');
const changePassword = document.getElementById('changePassword');
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
        .then(data=>{
            console.log(data)
            if(data.success){
                swal({
                    title:"Updated",
                    text:"Your details were updated successfully",
                    icon:"success"
                }).then(()=>window.location.reload())
            }else{
                swal({
                    title:"Error",
                    text:data.msg,
                    icon:"warning"
                })
            }
        })
        .catch(err=>{
            swal({
                title:"Error",
                text:"We are facing some issues, sorry for the inconvenience",
                icon:"warning"
            })
            console.log(err)
        })
    }else{
        details.forEach(detail=>{
            detail.contentEditable=true;    
        })
        btn.innerText = "Change";
        toggleCss(e)       
        btn.style.background="linear-gradient(to bottom right, cyan, blue)";
    }
})

changePassword.addEventListener('click',e=>{
    const oldPassword = getInpValue('oldPassword');
    const newPassword = getInpValue('newPassword');
    const params = new Params('json',{oldPassword,newPassword});
    fetch('/changePassword',params)
    .then(rep=>rep.json())
    .then(data=>{
        if(data.success){
            swal({
                title:"Updated",
                text:"Your password was changed successfully",
                icon:"success"
            }).then(()=>window.location.reload())
        }else{
            swal({
                title:"Error",
                text:data.msg,
                icon:"warning"
            })
        }
    })
    .catch(err=>{
        swal({
            title:"Error",
            text:"We are facing some issues, sorry for the inconvenience",
            icon:"warning"
        })
    })
})
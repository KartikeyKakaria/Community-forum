const login = document.getElementById("submit");
login.addEventListener('click',()=>{
    const identifier = getInpValue('identifier');
    const password = getInpValue('password');
    let idType = "name";
    if(includes(identifier,"@")&&includes(identifier,".")){
        idType="email";
    }
    const params = new Params('json',{idType,identifier,password})
    console.log(params);
    
})
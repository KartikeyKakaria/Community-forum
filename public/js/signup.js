const inputs = Array.from(document.querySelectorAll(".register-input"));
const input_spans = Array.from(document.querySelectorAll(".span-animation"));
const submit = document.getElementById("submit");
inputs.shift();
input_spans.shift();
function updateForm() {
    inputs[0].classList.remove('hide')
    input_spans[0].classList.remove('hide')
    inputs.shift();
    input_spans.shift();
}
submit.addEventListener('click', e => {
    if (inputs.length > 1) updateForm();
    else if (inputs.length == 1) {
        updateForm();
        submit.innerText = 'Sign Up';
    } else {
        const password = getInpValue('password');
        const confpassword = getInpValue('confpassword');
        if(password == confpassword){
            const name = getInpValue('name');
            const email = getInpValue('email');
            const address = getInpValue('address');
            const age = getInpValue('age');
            const number = getInpValue('number');
            const userData = {name,email,address,age,number,password, confpassword};
            if(isEmpty(userData)){
                alert('Please enter all the fields');
            }else{
                const params = new Params('json',userData);
                fetch('/register',params)
                .then(rep=>rep.json())
                .then(result=>console.log(result))
                .catch(err=>console.log(err))
            }
        }else{
            alert("Passwords dont't match")
        }
    }
})

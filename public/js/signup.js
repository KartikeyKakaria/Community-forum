const inputs = Array.from(document.querySelectorAll(".register-input"));
const input_spans = Array.from(document.querySelectorAll(".span-animation"));
const submit = document.getElementById("submit");
const validations = {
    name: name => {
        return !(name.length < 2 || name.length > 50);
    },
    email: email => {
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(emailValidationRegex)) return true;
        return false;
    },
    number: number => {
        return number.length == 10;
    }
}
const changeTextCol = (bool, ind) => {
    if (bool) {
        ind.style.color = "white";
    } else {
        ind.style.color = "red";
    }
}
inputs.forEach(input => {
    ['keydown', 'keyup'].forEach(evt => {
        input.addEventListener(evt, () => {
            const id = input.id;
            const val = getInpValue(id);
            switch (id) {
                case 'name':
                    changeTextCol(validations.name(val), input)
                    break;
                case 'email':
                    changeTextCol(validations.email(val), input);
                    break;
                case 'number':
                    changeTextCol(validations.number(val), input);
                    break;
                default:
                    changeTextCol(true, input);
            }
        })
    })
})
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
        if (password == confpassword) {
            const name = getInpValue('name');
            const email = getInpValue('email');
            const address = getInpValue('address');
            const age = getInpValue('age');
            const number = getInpValue('number');
            const userData = {name,email,address,age,number,password,confpassword,};
            if (isEmpty(userData)) {
                alert('Please enter all the fields');
            } else {
                const params = new Params('json', userData);
                fetch('/register', params)
                    .then(rep => rep.json())
                    .then(result => {
                        if (result.success) {
                            alert(result.msg)
                                //code to show msg if user was registered successfully
                        } else {
                            alert(result.msg)
                                //code to show msg if user was not registered successfully
                        }
                    })
                    .catch(err => console.log(err))
            }
        } else {
            alert("Passwords dont't match")
        }
    }
})
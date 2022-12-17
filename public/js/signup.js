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
        console.log('submitted!')
    }
})

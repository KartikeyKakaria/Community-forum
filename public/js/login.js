const login = document.getElementById("submit");
login.addEventListener('click', () => {
    const identifier = getInpValue('identifier');
    const password = getInpValue('password');
    let idType = "name";
    if (includes(identifier, "@") && includes(identifier, ".")) {
        idType = "email";
    }
    const params = new Params('json', { idType, identifier, password })
    fetch('/signin', params)
        .then(rep => rep.text())
        .then(data => {
            console.log(data)
            if (data.success) {
                swal({
                    title: "Loginned",
                    text: "You were loginned successfully",
                    icon: "success",
                })
                window.location.href += "/me"
            } else {
                swal({
                    title: "Invalid Credentials",
                    text: "Please enter valid details",
                    icon: "warning"
                })
            }
        })
        .catch(err => console.log(err))

})
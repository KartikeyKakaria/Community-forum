window.onload = async () => {
    const inputs = Array.from(document.getElementsByClassName("form-input"))
    inputs.shift();
    updateNavbar();
    const loggedIn = await cookieExists();
    if (loggedIn) {
        window.location.href = "/user";
    } else {
        const next = document.getElementById("next");
        next.addEventListener("click", (e) => {
            e.preventDefault();
            if (inputs.length > 0) {
                console.log("hello", inputs[0])
                inputs[0].style.display = "block"
                inputs.shift();
                if (inputs.length == 0) next.innerText = 'Submit'
            } else {
                next.innerText = "Submit";

                const name = document.querySelector("#name").value;
                const email = document.querySelector("#email").value;
                const number = document.querySelector("#number").value;
                const address = document.querySelector("#address").value;
                const age = document.querySelector("#age").value;
                const password = document.querySelector("#password").value;
                const confpassword = document.querySelector("#confpassword").value;
                const data = {
                    name: name,
                    email: email,
                    number: number,
                    address: address,
                    age: age,
                    password: password,
                    confpassword: confpassword,
                }
                const params = {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }
                fetch("/register", params)
                    .then(response => response.text())
                    .then((data) => {
                        try {
                            if (JSON.parse(data).name == undefined) {
                                alert("please enter valid email and phone number")
                            } else {
                                window.location.href = "/user"
                            }
                        } catch (e) {
                            alert("passwords dont match")
                        }
                    })
                    .catch(err => console.log(err))

            }
        })
    }
}
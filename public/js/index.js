const updateNavbar = () => {
    const navLinks = document.getElementById("nav-links");
    const params = {
        method: 'post',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({ data: "jwt" })
    }
    fetch("/isCookieThere", params)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if (data == "") {
                navLinks.innerHTML = `<li><a class="nav-link" id="home" href="/">Home</a></li>
                <li><a class="nav-link" id="login" href="/login">Login</a></li>
                <li><a class="nav-link" id="register" href="/register">Register</a></li>`
            } else {
                navLinks.innerHTML = `<li><a class="nav-link" id="home" href="/">Home</a></li>

                <li><a class="nav-link" id="logout" href="/logout">Logout</a></li>
                <li><a class="nav-link" id="user" href="/User">You</a></li>`
            }
        })
        .catch(err => console.error(err))
}
const cookieExists = function() {
    const params = {
        method: 'post',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({ data: "token" })
    }
    return fetch("/isCookieThere", params)
        .then(response => response.text())
        .then(data => {
            if (data.toString() == "") {
                return false;
            } else {
                return true;
            }
        })
        .catch(err => console.error(err))
}
const getUserName = function(id) {
    const params = {
        method: 'post',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({ id: id })
    }
    return fetch("/getUsername", params)
        .then(rep => rep.text())
        .then(data => { return data })
        .catch(err => { return err })
}
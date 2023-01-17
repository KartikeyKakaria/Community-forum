class Params {
    constructor(type, data) {
        let headers;
        if (type == 'json') {
            headers = {
                'Content-type': 'application/json'
            }
        } else if (type == 'html' || type == 'text') {
            headers = {
                'Content-type': 'text/html'
            }
        }
        this.method = 'post';
        this.headers = headers;
        this.body = JSON.stringify(data);
    }
}
function getInpValue(id) {
    return document.getElementById(id).value;
}
function randomColorRGB() {
    const random = () => { return Math.floor((Math.random() * 250) + 100) }
    return { r: random(), g: random(), b: random() }
}
function isEmpty(obj) {
    let result = false;
    for (i in obj) {
        if (obj[i] === '') {
            result = true;
        }
    }
    return result;
}
function includes(mainStr, includedStr) {
    return mainStr.indexOf(includedStr) !== -1;
}

function isCookieThere() {
    const cookies = document.cookie;
    let result = false;
    if (includes(cookies, "jwt")) result = true;
    return result;
}
function shortenString(str, link) {
    return str.slice(0, 158) + `<a style="color:white;text-decoration:none;" href=${link}>...</a>`
}
function updateNavbar() {
    const links = document.querySelector('.links');
    if (isCookieThere()) {
        links.innerHTML = '<li><a class="link hover-effect" href="/">Home</a></li>        <li><a class="link hover-effect" href="/about">About</a></li><li><a class="link hover-effect" onclick="logout()">Logout</a></li><li><a class="link hover-effect" href="/me">Me</a></li>';
    }
}

function findTimeElapsed(date) {
    const currDate = new Date();
    const postDate = new Date(date);
    const diff = currDate.getTime() - postDate.getTime();
    if (diff > 31557600000) {
        return `${Math.floor(diff / 31557600000)} year(s)`;
    } else if (diff > 2629800000) {
        return `${Math.floor(diff / 2629800000)} month(s)`;
    } else if (diff > 604800000) {
        return `${Math.floor(diff / 604800000)} week(s)`;
    } else if (diff > 86400000) {
        return `${Math.floor(diff / 86400000)} day(s)`;
    } else if (diff > 3600000) {
        return `${Math.floor(diff / 3600000)} hour(s)`;
    } else if (diff > 60000) {
        return `${Math.floor(diff / 60000)} minute(s)`;
    } else {
        return `${Math.floor(diff / 1000)} second(s)`
    }
}

updateNavbar();
const logout = () => {
    fetch('/logout')
        .then(rep => rep.json())
        .then(result => {
            if (result.success) {
                swal({
                    title: "Logged out",
                    text: "Your account was logged out successfully",
                    icon: "success",
                })
                    .then(() => window.location.href = "/login");
            } else {
                swal({
                    title: "Error",
                    text: "Due to some technichal issues, we couldn't log you out!. We are sorry for the inconvenience",
                    icon: "warning",
                })
            }
        }).catch(err => {
            swal({
                title: "Error",
                text: "Due to some technichal issues, we couldn't log you out!. We are sorry for the inconvenience",
                icon: "warning",
            })
            console.log(err);
        })
}
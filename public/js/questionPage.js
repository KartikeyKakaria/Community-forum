updateNavbar();
let bgRGB = randomColorRGB();
let col1 = `rgb(${bgRGB.r},${bgRGB.g},${bgRGB.b})`
let col2 = `rgb(${bgRGB.r+20},${bgRGB.g+20},${bgRGB.b+20})`
document.querySelector('body').style.background=`linear-gradient(to right,${col1},${col2})`;
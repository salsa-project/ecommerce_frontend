const navBtnsMenu = document.getElementById('nav_btns_menu');
const showNavMenu = document.getElementById('nav-toggle-i');
const closeNavMenu = document.getElementById('close_nav_menu');



showNavMenu.addEventListener('click', function(){
    navBtnsMenu.classList.remove('hide');
    navBtnsMenu.classList.add('show');
})

closeNavMenu.addEventListener('click', function(){
    navBtnsMenu.classList.remove('show');
    navBtnsMenu.classList.add('hide');
})
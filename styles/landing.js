const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerLink = document.getElementById('reg-link');

const btnLogin = document.getElementById('btnLogin');
const btnReg = document.getElementById('btnReg');
const close = document.getElementById('close');

if (localStorage.getItem("isActive") === "false"){
    wrapper.classList.add('active');
}


registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');

    localStorage.setItem("isActive",!wrapper.classList.contains("active"));
})

loginlink.addEventListener('click',()=>{
    wrapper.classList.remove('active');

    localStorage.setItem("isActive",wrapper.classList.contains("active"));
})

btnReg.addEventListener('click',()=>{
    wrapper.classList.add('active')
    wrapper.classList.add('active-btnLogin')
})

btnLogin.addEventListener('click',()=>{
    wrapper.classList.remove('active');
    wrapper.classList.add('active-btnLogin')
})

 close.addEventListener('click',()=>{
    
    wrapper.classList.remove('active-btnLogin')
    wrapper.classList.remove('active');
}) 




/*
loginlink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
}) */
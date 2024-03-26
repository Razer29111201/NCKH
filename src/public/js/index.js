const login = document.querySelector('.login_form')
const modal = document.querySelector('.modal')
const btn_login = document.getElementById('btn_login')
const loginsus = document.querySelector('.nav--login-suss')

btn_login.onclick = () => {
    login.classList.remove('hiden')
}

modal.onclick = () => {
    login.classList.add('hiden')

}



$.ajax({
    url: '/user/checkLogin',
    type: 'get',
    success: function (data) {
        console.log(data.role);
        btn_login.classList.add('hiden')
        loginsus.classList.remove('hiden')
        $('#name_login').text(data.name)
        if (data.role == 1) {
            $("#admin").html(`<a href="/admin">
            <li>Admin</li>
        </a>`)
        }
    }
}


)

const login = document.querySelector('.login_form')
const modal = document.querySelector('.modal')
const usertt = document.querySelector('.header-user')
const user_list = document.querySelector('.user-list ')

const btn_user = document.querySelector('#usersuccess')
const btn_login = document.getElementById('btn_login')
const loginsus = document.querySelector('.header-user-success')
const login_submid = document.querySelector('.login_submid')
const log_out = document.getElementById('logout')

btn_login.onclick = () => {
    login.classList.remove('hiden')
}

modal.onclick = () => {
    login.classList.add('hiden')

}
btn_user.onclick = () => {
    user_list.classList.toggle('hiden')

}


$.ajax({
    url: '/user/checkLogin',
    type: 'get',
    success: function (data) {
        console.log(data.role);
        btn_login.classList.add('hiden')
        usertt.classList.add('hiden')
        loginsus.classList.remove('hiden')
        $('#usersuccess').text(data.name)
        if (data.role == 1) {
            $("#adminrole").html(`  <i class='bx bxs-caret-right-circle'></i>
            <a href="/admin" id="admin">Quản Lý Web</a>`)
        }
    }
})
var formData = {

};

$('#form').submit(function (event) {
    event.preventDefault();

    // Lấy giá trị của tên đăng nhập và mật khẩu từ form

    $.ajax({
        url: '/user/',
        type: 'POST',
        data: {
            username: $('#login').val(),
            password: $('#password').val()
        },
        success: function (data) {

            location.href = '/'
        },
        error: function (xhr, status, error) {
            $('.err').text('Tài khoản hoặc mật khẩu không đúng')



        }

    }
    )
});
// setCookie('acc', '', -222)
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
log_out.onclick = () => {
    setCookie('acc', '', -222)
}



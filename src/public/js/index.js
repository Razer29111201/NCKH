const login = document.querySelector('.login_form')
const modal = document.querySelector('.modal')
const usertt = document.querySelector('.header-user')
const user_list = document.querySelector('.user-list ')

const btn_user = document.querySelector('#usersuccess')
const btn_login = document.getElementById('btn_login')
const loginsus = document.querySelector('.header-user-success')
const login_submid = document.querySelector('.login_submid')
const log_out = document.getElementById('logout')
if (btn_login) {

    btn_login.onclick = () => {
        login.classList.remove('hiden')
    }
}
if (modal) {
    modal.onclick = () => {
        login.classList.add('hiden')

    }
}
if (btn_user) {

    btn_user.onclick = () => {
        user_list.classList.toggle('hiden')

    }
}

const istrueSidebar = () => {

    $.ajax({
        url: '/user/checkLogin',
        type: 'get',
        success: function (data) {
            const checkrole = $("#role")
            const role_news = $("#role_news")

            if (checkrole) {
                console.log(data.role);
                if (data.role == 1) {
                    checkrole.html(`<p class="sidebar_title">Tài Khoản</p>
                        <li li class= "sidebar_item " >
                        <div class="sidebar_i">
                            <div class="sidebar_i-left">
        
                                <i class="fa-solid fa-newspaper"></i>
                                <span>Tài Khoản</span>
                            </div>
                            <div class="sidebar_item-more">
                            <i class="fa-solid fa-user"></i>
                            </div>
                        </div>
                        <ul class="sidebar_item-list">
                            <li class="sidebar_item-item">
                                <a href="/admin/1">
                                    <i class="fa-solid fa-list"></i>
                                    Danh sách tài khoản
                                </a>
                            </li>
                            <li class="sidebar_item-item">
                                <a href="">
                                    <i class="fa-solid fa-plus"></i>
                                    Quản Lý tài khoản
                                </a>
                            </li>
                        </ul>
                    </li > `)
                    role_news.html(`
                    <li class="sidebar_item-item">
                    <a href="">
                        <i class="fa-solid fa-plus"></i>
                        Quản Lý bài viết
                    </a>
                </li>`)

                }

            }

            if (data) {
                if (btn_login || usertt || loginsus) {

                    btn_login.classList.add('hiden')
                    usertt.classList.add('hiden')
                    loginsus.classList.remove('hiden')
                }
                $('#usersuccess').text(data.name)
                if (data.role == 1) {
                    $("#adminrole").html(`  <i class='bx bxs-caret-right-circle'></i>
                    <a href="/admin/1" id="admin">Quản Lý Web</a>`)
                }
                if (data.role == 3) {
                    $("#adminrole").html(`  <i class='bx bxs-caret-right-circle'></i>
                    <a href="/admin/3" id="admin">Quản Lý Web</a>`)
                }
                if (data.role == 4) {
                    $("#adminrole").html(`  <i class='bx bxs-caret-right-circle'></i>
                    <a href="/admin/3" id="admin">Quản Lý Web</a>`)
                }
                if (data.role == 5) {
                    $("#adminrole").html(`  <i class='bx bxs-caret-right-circle'></i>
                    <a href="/admin/4" id="admin">Quản Lý Web</a>`)
                }
                console.log(data);
                $('#name').text(data.name)
                return true
            }
        }
    })
}
istrueSidebar()
$('#form11').submit(function (event) {
    $('#loading').html()
    event.preventDefault();
    $('#loading').html(`  <div class="loading">
    <div class="spinner"></div>

</div>`)

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
            $('#loading').html("")
            $('.err').text('Tài khoản hoặc mật khẩu không đúng')



        }

    }
    )
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function deleteCookie(cookieName) {
    // Đặt thời gian sống của cookie thành một thời điểm trong quá khứ
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Sử dụng hàm để xóa một cookie có tên "example"

if (log_out) {
    log_out.onclick = () => {
        deleteCookie("acc");
        window.location.href = "/"
    }
}
var search = document.getElementById('search')
var modal_search = document.querySelector('.search_detail')
search.oninput = (e) => {
    if (e.target.value.length > 0) {
        $.ajax({
            url: '/news/search',
            type: 'POST',
            data: {
                title: e.target.value
            },
            success: function (data) {

                $('#header_news').html('')
                $('#subject_news').html('')
                $('#title_news').html(``)
                $('#title_subject').html(``)
                console.log(data);
                if (data.news.length > 0 || data.subject.length > 0) {

                    modal_search.classList.remove("hiden")

                    if (data.news.length > 0) {
                        $('#title_news').html(`<h4>Tin Tức</h4>`)
                        for (let index = 0; index < 4; index++) {
                            $('#header_news').append(`<li class="search_detail_item" ><a href="/news/newsDetail${data.news[index].id}">${data.news[index].title}</a></li>`)
                        }



                    }
                    if (data.subject.length > 0) {
                        $('#title_subject').html(`<h4>Môn Học</h4>`)
                        for (let index = 0; index < 4; index++) {
                            $('#subject_news').append(`<li class="search_detail_item" ><a href="/subject/${data.subject[index].id}">${data.subject[index].name}</a></li>`)
                        }

                    }


                }
                else {
                    $('#title_news').html(`Không có dữ liệu`)
                }

            },
            error: function (xhr, status, error) {
                $('.err').text('Tài khoản hoặc mật khẩu không đúng')



            }

        }
        )

    }
}
document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('.search_detail') && !target.closest('.search')) {
        modal_search.classList.add('hiden')
    }

});


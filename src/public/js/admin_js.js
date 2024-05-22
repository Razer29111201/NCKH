

setTimeout(function () {
    const input_search = document.getElementById('header_search')
    var header_search = document.querySelector('.header__search')
    var search_icon = document.getElementById('search_icon')
    var user_btn = document.getElementById('user_btn')
    var user_drop = document.getElementById('user_drop')
    var noti_btn = document.getElementById('noti_btn')
    var noti_drop = document.getElementById('noti_drop')

    let isExpanded = false

    search_icon.onclick = () => {
        if (isExpanded) {
            input_search.style.width = '0'
            header_search.style.borderBottom = '0 solid #333'
            isExpanded = false
        }
        else {
            input_search.style.width = '100px'
            header_search.style.borderBottom = '1px solid #333'
            isExpanded = true

        }

    }

    const clickShow = (btn, drop) => {
        btn.onclick = () => {
            drop.classList.toggle('show')
        }
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (!target.closest('#noti_drop') && !target.closest('#noti_btn')) {
                noti_drop.classList.remove('show')
            }
            if (!target.closest('#user_btn') && !target.closest('#user_drop')) {
                user_drop.classList.remove('show')
            }
        });
    }

    clickShow(user_btn, user_drop)
    clickShow(noti_btn, noti_drop)



    const sidebar_item = document.querySelectorAll('.sidebar_item')

    sidebar_item.forEach(item => {

        item.onclick = () => {
            sidebar_item.forEach(otherItem => {
                otherItem.classList.remove('active');
            })
            item.classList.add('active')

            const children = item.querySelector('.sidebar_item-list')

            if (children) {
                children.classList.toggle('show')
            }
        }
    })

    // dateToday
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0'); // Ngày
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng (Chú ý: Tháng bắt đầu từ 0)
    const year = today.getFullYear(); // Năm

    const hour = today.getHours();

    let greeting;

    if (hour >= 5 && hour < 11) {
        greeting = 'Chào buổi sáng,';
    } else if (hour >= 11 && hour < 14) {
        greeting = 'Buổi trưa của bạn thế nào?,';
    } else if (hour >= 14 && hour < 18) {
        greeting = 'Chào buổi chiều,';
    } else if (hour >= 18 && hour < 23) {
        greeting = 'Chào buổi tối,';
    } else {
        greeting = 'Chà, Cú đêm,';
    }


    document.getElementById('time_title').innerText = greeting
    document.querySelector('.header_calender-title').innerText = `${day}/${month}/${year}`

    const bar = document.getElementById('bar')
    const titlee = document.querySelector('.title h2')
    const container = document.querySelector('.container')
    const content = document.querySelectorAll('.sidebar_i-left span')
    const list = document.querySelectorAll('.sidebar_item-list')
    const sidebar_title = document.querySelectorAll('.sidebar_title')
    const sidebar_item_more = document.querySelectorAll('.sidebar_item-more i')

    let isTrue = true



    bar.onclick = () => {
        if (isTrue) {

            bar.style.animation = 'rotate_icon 300ms ease'
            container.classList.add('sidebar_only-icon')
            addd(content)
            addd(list)
            addd(sidebar_title)
            addd(sidebar_item_more)
            titlee.classList.add('hiden')
            isTrue = false

        }
        else {
            container.classList.remove('sidebar_only-icon')
            bar.style.animation = ''
            removee(content)
            removee(list)
            removee(sidebar_title)
            removee(sidebar_item_more)
            titlee.classList.remove('hiden')
            isTrue = true

        }
    }
    const addd = (el) => {

        el.forEach(item => {

            item.classList.add('hiden')
        })
    }
    const removee = (el) => {

        el.forEach(item => {

            item.classList.remove('hiden')
        })
    }



    var form_status = document.querySelectorAll('.content_table')
    var btn_status = document.querySelectorAll('.btn_status')
    const id = '<%= id%>'

    if (btn_status.length > 0) {
        btn_status.forEach((item, index) => {
            item.onclick = () => {
                form_status.forEach((e, i) => {
                    e.classList.add('hiden')
                })
                btn_status.forEach((e, i) => {
                    e.classList.remove('active')
                })
                item.classList.add('active')
                form_status[index].classList.remove('hiden')
            }
        })
        if (id) {
            form_status.forEach((e, i) => {
                e.classList.add('hiden')
            })
            btn_status.forEach((e, i) => {
                e.classList.remove('active')
            })
            form_status[1].classList.remove('hiden')
            btn_status[1].classList.add('active')
            document.addEventListener("DOMContentLoaded", function (event) {
                var col22Element = document.getElementById(`col${id}`);
                if (col22Element) {
                    col22Element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }
    }



}, 1000
)

const timeNoti = (mysqlTime) => {


    // Chuỗi thời gian từ MySQL


    // Chuyển đổi chuỗi thời gian thành đối tượng Date
    const pastTime = new Date(mysqlTime);

    // Tính khoảng thời gian giữa thời điểm này và thời gian hiện tại
    const timeDifference = Date.now() - pastTime.getTime();

    // Chuyển đổi khoảng thời gian thành phút
    const minutes = Math.floor(timeDifference / 60000);

    // Kiểm tra và hiển thị kết quả
    if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        if (hours > 24) {
            const days = Math.floor(hours / 24);
            if (days > 7) {
                const weeks = Math.floor(days / 7);
                if (weeks > 4) {
                    const months = Math.floor(days / 30);
                    if (months > 12) {
                        const years = Math.floor(months / 12);
                        return (years + " năm trước");
                    } else {
                        return (months + " tháng trước");
                    }
                } else {
                    return (weeks + " tuần trước");
                }
            } else {
                return (days + " ngày trước");
            }
        } else {
            return (hours + " giờ trước");
        }
    } else {
        return (minutes + " phút trước");
    }

}


$.ajax({
    url: '/news/noti',
    type: 'get',
    success: function (data) {
        data.forEach(item => {

            if (item.type == 1) {

                $.ajax({
                    url: '/user/user',
                    type: 'POST',
                    data: {
                        id: item.iduser
                    },
                    success: function (dat) {


                        $('#add').append(` <li class="header_noti-item">
                       <a href="${item.link}">
                       <div class="flex">
                           <div class="noti-item_icon">
                               <i class="fa-solid fa-circle-info success"></i>
                           </div>
                           <div class="noti-item_title">
                            ${dat[0].name} đã thêm một bài viết
                           </div>
                           </div>
                           <div class="time_noti">
                           ${timeNoti(item.time)}
                            </div>
                       </a>
                   </li>`)

                    },
                    error: function (xhr, status, error) {
                        $('.err').text('Tài khoản hoặc mật khẩu không đúng')



                    }

                }
                )


            }
            if (item.type == 2) {

                $.ajax({
                    url: '/user/user',
                    type: 'POST',
                    data: {
                        id: item.iduser
                    },
                    success: function (dat) {


                        $('#editNoti').append(` <li class="header_noti-item">
                       <a href="${item.link}">
                            <div class="flex">
                           <div class="noti-item_icon">
                           <i class="fa-solid fa-triangle-exclamation"></i>
                       
                           </div>
                           <div class="noti-item_title">
                            ${dat[0].name} đã chỉnh sửa một bài viết
                           </div>
                           </div>
                           <div class="time_noti">
                           ${timeNoti(item.time)}
                       </div>
                       </a>
                   </li>`)

                    },
                    error: function (xhr, status, error) {
                        $('.err').text('Tài khoản hoặc mật khẩu không đúng')



                    }

                }
                )
            }
            if (item.type == 3) {
                $.ajax({
                    url: '/user/user',
                    type: 'POST',
                    data: {
                        id: item.iduser
                    },
                    success: function (dat) {


                        $('#delnoti').append(` <li class="header_noti-item">
                       <a href="${item.link}">
                            <div class="flex">
                           <div class="noti-item_icon">
                           <i class="fa-solid fa-circle-exclamation"></i>
                           </div>
                           <div class="noti-item_title">
                            ${dat[0].name} đã xóa một bài viết
                           </div>
                           </div>
                           <div class="time_noti">
                           ${timeNoti(item.time)}
                       </div>

                       </a>
                   </li>`)

                    },
                    error: function (xhr, status, error) {
                        $('.err').text('Tài khoản hoặc mật khẩu không đúng')



                    }

                }
                )
            }
        })


    }
})


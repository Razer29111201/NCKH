const bar = document.getElementById('bar')
const title = document.querySelector('.title h2')
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
        add(content)
        add(list)
        add(sidebar_title)
        add(sidebar_item_more)
        title.classList.add('hiden')
        isTrue = false

    }
    else {
        container.classList.remove('sidebar_only-icon')
        bar.style.animation = ''
        remove(content)
        remove(list)
        remove(sidebar_title)
        remove(sidebar_item_more)
        title.classList.remove('hiden')
        isTrue = true

    }
}
const add = (el) => {

    el.forEach(item => {

        item.classList.add('hiden')
    })
}
const remove = (el) => {

    el.forEach(item => {

        item.classList.remove('hiden')
    })
}


// ck
var input_search = document.getElementById('header_search')
var header_search = document.querySelector('.header_search')
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

console.log(greeting);
document.getElementById('time_title').innerText = greeting
document.querySelector('.header_calender-title').innerText = `${day}/${month}/${year}`



var group = document.querySelectorAll('#group option')
console.log(group.text); 
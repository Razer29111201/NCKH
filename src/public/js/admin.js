var add = document.getElementById('adda')
var del = document.getElementById('del')
var id = document.getElementById('id')
var exit = document.getElementById('exit')
var idE = document.getElementById('idE')
var edit = document.getElementById('edit')
var form_title = document.getElementById('form_title')
var form = document.querySelector('.wpaper')
const form1 = document.getElementById('form')
var form_ = document.querySelector('.form_')
var formdel = document.getElementById('formdel')
var btn_add = document.getElementById('btn_addd')
var btn_edit = document.getElementById('btn_edit')
var cb = document.querySelectorAll('.editButton')
const title = document.getElementById('title')
const link = document.getElementById('link')
const editor = document.querySelector('.ck-editor__editable')
console.log(exit);
add.onclick = () => {
    console.log("a");
    form.classList.remove('hiden')
    form1.setAttribute('action', '/news/banner/add')
    btn_add.classList.remove('hiden')
    btn_edit.classList.add('hiden')
    form_title.innerText = 'Tạo Banner'
}

exit.onclick = () => {
    form.classList.add('hiden')
    btn_add.classList.add('hiden')
    btn_edit.classList.add('hiden')
}
form_.onclick = () => {
    form.classList.add('hiden')
}
document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('.wpaper') && !target.closest('#adda') && !target.closest('.editButton')) {
        form.classList.add('hiden')
    }
});



cb.forEach((e, i) => {
    e.onclick = () => {

        btn_add.classList.add('hiden')
        form.classList.remove('hiden')
        form1.setAttribute('action', '/news/banner/edit')
        btn_edit.classList.remove('hiden')
        form_title.innerText = 'Cập Nhật Banner'
        var a = e.parentElement.parentElement.querySelectorAll('td')
        console.log(a);
        console.log(a[0].innerText);
        id.value = a[0].innerText
        title.value = a[1].innerText
        link.value = a[4].innerText


    }
})

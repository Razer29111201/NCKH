var add = document.getElementById('add')
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
var cb = document.querySelectorAll('.checkbox')
const title = document.getElementById('title')
const tomtat = document.getElementById('tomtat')
const editor = document.querySelector('.ck-editor__editable')
console.log(btn_add);
add.onclick = () => {
    form.classList.remove('hiden')
    form1.setAttribute('action', 'news')
    btn_add.classList.remove('hiden')
    form_title.innerText = 'Thêm Tin Tức'
}
edit.onclick = () => {
    form.classList.remove('hiden')
    form1.setAttribute('action', '/news/edit')
    btn_edit.classList.remove('hiden')
    form_title.innerText = 'Cập Nhật Tin Tức'
}
if (id.value === '') {
    formdel.setAttribute('onsubmit', 'return false')

}
else {
    formdel.setAttribute('onsubmit', 'return true')

}
exit.onclick = () => {
    form.classList.add('hiden')
    btn_add.classList.add('hiden')
    btn_edit.classList.add('hiden')
}
form_.onclick = () => {
    form.classList.add('hiden')
}




cb.forEach((e, i) => {
    e.onchange = () => {

        if (e.checked === true) {
            var a = e.parentElement.parentElement.querySelectorAll('td')
            console.log(a[0].querySelector('input').value);
            id.value = a[0].querySelector('input').value
            idE.value = a[0].querySelector('input').value
            title.value = a[1].innerText
            tomtat.value = a[2].innerText


            window.editor.setData(a[3].innerHTML);
            formdel.setAttribute('onsubmit', 'return true')
        }
        else {
            id.value = ''
            formdel.setAttribute('onsubmit', 'return false')
        }
    }
})

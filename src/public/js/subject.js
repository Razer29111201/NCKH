var add = document.getElementById('add')
var del = document.getElementById('del')
var id = document.getElementById('id')
var exit = document.getElementById('exit')
var idE = document.getElementById('idE')
var edit = document.getElementById('edit')
const form1 = document.getElementById('form2')
var form_title = document.getElementById('form_title')
var form = document.querySelector('.wpaper')
var form_ = document.querySelector('.form_')
var formdel = document.getElementById('formdel')
var btn_add = document.getElementById('btn_addd')
var btn_edit = document.getElementById('btn_edit')
var cb = document.querySelectorAll('.checkbox')
const title = document.getElementById('title')
const editor = document.querySelector('.ck-editor__editable')
var link = document.getElementById('link')

console.log(form1);
add.onclick = () => {
    form.classList.remove('hiden')
    form1.setAttribute('action', '/subject/add')
    btn_add.classList.remove('hiden')
    form_title.innerText = 'Thêm Tin Tức'
}
const editBtn = (e) => {
    if (e === 1) {

        edit.onclick = () => {
            form.classList.remove('hiden')
            form1.setAttribute('action', '/subject/update')
            btn_edit.classList.remove('hiden')
            form_title.innerText = 'Cập Nhật Tin Tức'
        }
    }
    if (e === 2) {
        edit.onclick = () => {
            alert('Hãy chọn bài viết muốn sửa')
        }
    }
}
if (idE.value === '') {
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


editBtn(2)

cb.forEach((e, i) => {
    e.onchange = () => {

        if (e.checked === true) {
            editBtn(1)
            var a = e.parentElement.parentElement.querySelectorAll('td')
            console.log(a[0].querySelector('input').value);
            id.value = a[0].querySelector('input').value
            idE.value = a[0].querySelector('input').value
            title.value = a[2].innerText
            link.value = a[3].innerText

            console.log(idE);

            formdel.setAttribute('onsubmit', 'return true')
        }
        else {
            editBtn(2)
            id.value = ''
            formdel.setAttribute('onsubmit', 'return false')
        }
        if (this.checked) {
            // Hủy chọn tất cả các checkbox khác
            cb.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
    }
})

var add = document.getElementById('adda')
var del = document.getElementById('del')
var id = document.getElementById('id')
var exit = document.getElementById('exit')
var idE = document.getElementById('idE')
var edit = document.getElementById('edit')
const form1 = document.getElementById('form_sub')
var form_title = document.getElementById('form_title')
var form = document.querySelector('.form_addSub')
var form_ = document.querySelector('.form_sub')
var formdel = document.getElementById('formdel')
var btn_add = document.getElementById('btn_addd')
var btn_editt = document.getElementById('btn_edit')
var btn_edit = document.querySelectorAll('.btn_editt')
var btn_del = document.querySelectorAll('.btn_del')
const title = document.getElementById('title')
const editor = document.querySelector('.ck-editor__editable')
var subdetail = document.querySelector('.subdetail')
var link = document.getElementById('link')
document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('#adda') && !target.closest('#editDetail') && !target.closest('.modal_form') && !target.closest('.btn_editt') && !target.closest('#addDetail')) {
        form.classList.add('hiden')
        subdetail.classList.add('hiden')
    }
});


add.onclick = () => {
    form.classList.remove('hiden')
    form1.setAttribute('action', '/subject/add')
    btn_add.classList.remove('hiden')
    form_title.innerText = 'Thêm môn học'
    btn_editt.classList.add('hiden')
}




btn_edit.forEach(e => {

    e.onclick = () => {


        form.classList.remove('hiden')
        btn_add.classList.add('hiden')
        form1.setAttribute('action', '/subject/update')
        btn_editt.classList.remove('hiden')
        form_title.innerText = 'Cập Nhật Tin Tức'
        var a = e.parentElement.parentElement.querySelectorAll('td')

        id.value = a[0].innerText
        title.value = a[1].innerText
        link.value = a[2].innerText


    }
})
btn_del.forEach(e => {
    e.onclick = () => {
        var a = e.parentElement.parentElement.querySelectorAll('td')
        var id = a[0].innerText
        $.ajax({
            url: '/subject/del',
            type: 'POST',
            data: {
                id: id

            },
            success: function (data) {
                window.location.href = '/admin/6'
            },
            error: function (xhr, status, error) {
            }

        }
        )
    }
})

var select_choise = document.getElementById('select_choise')
var addDetail = document.getElementById('addDetail')
var idDetail = document.getElementById('idDetail')
var titleDetail = document.getElementById('titleDetail')
var editDetail = document.getElementById('editDetail')
var subject_info_title = document.querySelector('.subject_info_title h3')
var subject_price_sale = document.querySelector('.subject_price_sale')
var subject_price_real = document.querySelector('.subject_price_real')

var subject_tomtat = document.querySelector('.subject_tomtat p')

select_choise.onchange = (e) => {
    const id = e.target.value

    idDetail.value = id.trim()
    $.ajax({
        url: `/subject/getSubjectbyid`,
        type: 'post',
        data: {
            id: id
        },

        success: function (resul) {
            titleDetail.value = resul.name
        }
    })
    $.ajax({
        url: `/subject/getSubjectInfobyid?q=${id}`,
        type: 'get',

        success: function (data) {
            console.log(data);
            if (data != 1) {

                var subject_sologan = document.querySelector('.subject_sologan p')
                console.log(data);
                subject_info_title.innerText = data.data.name
                subject_price_real.innerText = data.data.price + "Đ"
                subject_price_sale.innerText = (data.data.price / 100) * (100 - data.data.sale) + "Đ"
                subject_sologan.innerText = data.data.slogan
                subject_tomtat.innerText = data.data.tomtat
                addDetail.classList.add('hiden')
                editDetail.classList.remove('hiden')
            }
            else {
                var subject_sologan = document.querySelector('.subject_sologan p')
                console.log(subject_sologan, subject_tomtat);
                subject_info_title.innerText = ""
                subject_price_real.innerText = ''
                subject_price_sale.innerText = ''
                subject_sologan.innerText = " "
                subject_tomtat.innerText = " "
                addDetail.classList.remove('hiden')
                editDetail.classList.add('hiden')
            }


        },
        error: function (xhr, status, error) {

        }

    }
    )
}


var subject_info_title = document.querySelector('.subject_info_title')
var subject_price_sale = document.querySelector('.subject_price_sale')
var subject_price_real = document.querySelector('.subject_price_real')
var subject_sologan = document.querySelector('.subject_info_title p')

var form_subdetail = document.getElementById('form_subdetail')
var form_subdetail = document.getElementById('form_subdetail')

var btn_edit_detail = document.getElementById('btn_edit_detail')
addDetail.onclick = () => {
    subdetail.classList.remove('hiden')
    form_subdetail.setAttribute('action', '/subject/addDetail')
    btn_add_detail.classList.remove('hiden')
    form_title.innerText = 'Thêm chi tiết môn học'
    btn_edit_detail.classList.add('hiden')
}


editDetail.onclick = () => {
    subdetail.classList.remove('hiden')
    form_subdetail.setAttribute('action', '/subject/editDetail')
    btn_edit_detail.classList.remove('hiden')
    form_title.innerText = 'Chỉnh sửa chi tiết môn học'
    btn_add_detail.classList.add('hiden')
    document.getElementById('idDetail').value = select_choise.value;
    $.ajax({
        url: `/subject/getSubjectInfobyid?q=${select_choise.value}`,
        type: 'get',

        success: function (data) {
            console.log(data);
            window.editor.setData(data.content)
            document.getElementById('price').value = data.data.price;
            document.getElementById('sale').value = data.data.sale;
        }
    })
    var subject_sologan = document.querySelector('.subject_sologan p')
    document.getElementById('titleDetail').value = subject_info_title.innerText;
    document.getElementById('slogan').value = subject_sologan.innerText;



    document.getElementById('tomtat').value = subject_tomtat.innerText;



}

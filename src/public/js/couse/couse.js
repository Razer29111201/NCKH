const views_detail = document.querySelector('.views_detail')
document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('.views_detail') && !target.closest('.detail_btn')) {
        views_detail.classList.add('hidden')
    }

});
const btn_del = document.querySelectorAll('.deleteButton')
btn_del.forEach(item => {
    item.onclick = () => {
        var tr = item.parentNode.parentNode
        var listtd = tr.querySelectorAll('td')
        const id = listtd[0].outerText
        $.ajax({
            url: '/couse/delCouse',
            type: 'POST',
            data: {
                id: id

            },
            success: function (data) {
                window.location.href = '/couse/QL_Couse'
            },
            error: function (xhr, status, error) {
            }
        }
        )

    }
})




const detail_btn = document.querySelectorAll('.detail_btn')

const iddate = document.querySelector('.iddate')
const idtime = document.querySelector('.idtime')
const idClass = document.getElementById('idClass')
const addHocvien = document.querySelector('.addHocvien')
detail_btn.forEach(item => {
    item.onclick = () => {
        var tr = item.parentNode.parentNode.parentNode
        var listtd = tr.querySelectorAll('td')
        views_detail.classList.remove('hidden')
        const id = listtd[0].innerText
        iddate.value = id
        idtime.value = id
        if (idClass) {

            idClass.value = id
        }
        $.ajax({
            url: '/couse/QL_Couse_API',
            type: 'POST',
            data: {
                id: id

            },
            success: function (data) {
                if (data[0].status == "Pending" || data[0].status == "Pre-open") {
                    addHocvien.classList.add('hidden')
                }
                data[0].date_next.forEach((e, i) => {
                    $("#date").append(`
                    <li class="detail_item">
                        <label for="">#${i}:</label>
                        <input type="text" value="${e}">
                        <input type="text" value="${data[0].time}">
                    </li>`)

                })
                $('#tongquan').html(`  <div class="detail_name">
                    ${data[0].subject_info.name}
                </div>
                <div class="detail_status">
                    <button class="btn_table status pending">
                        ${data[0].status}
                    </button>
                </div>`)
                console.log(data);
                $('#info').html(`<ul class="detail_list">
                    <li class="detail_item">
                        <label for="">Tên bộ môn:</label>
                        <input type="text" value=" ${data[0].subject_info.name}">
                    </li>
                    <li class="detail_item">
                        <label for="">Tên giáo viên:</label>
                        <input type="text" value="${data[0].teacher.name}">
                    </li>
                    <li class="detail_item">
                        <label for="">Ngày bắt đầu:</label>
                        <input type="text" value=" ${data[0].date_next[0]}">
                    </li>
                    <li class="detail_item">
                        <label for="">Khung giờ:</label>
                        <input type="text" value="${data[0].time}">
                    </li>
                  
                </ul>`)
                if (data[0].hocvien.length > 0) {
                    data[0].hocvien.forEach(e => {
                        $('#hocvien_info').append(`<tr id="">
                        <td> ${e.id}</td>
                        <td style="width: 300px;">
                            ${e.name}
                        </td>
                        <td>
                        ${e.code}
                        </td>
                        <td>
                        ${e.sdt}
                        </td>
        
        
                        <td>
                        ${e.birth}
                        </td>
        
                        <td style="width: 100px; display: flex;justify-content: center;">
                            <div class="idstatus">
                            </div>
                        </td>
        
        
                        
                    </tr>`)
                        if (data[0].status === 0) {
                            $('.idstatus').html(`<label class="switch">
    
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>`)
                        } else {
                            $('.idstatus').html(`<label class="switch">
    
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>`)
                        }

                    })

                }
                else {
                    $('#hocvien_info').html('Hãy thêm học viên')
                }


                var detail_list = document.querySelectorAll('.detail_list')
                var border = document.querySelectorAll('.border')
                var detail_direc = document.querySelectorAll('.detail_direc ul li')
                detail_direc.forEach((element, index) => {
                    element.onclick = () => {
                        border.forEach(e => {
                            e.classList.remove('line')
                        })
                        detail_list.forEach(e => {
                            e.classList.add('hidden')
                        })
                        border[index].classList.add('line')
                        detail_list[index].classList.remove('hidden')

                    }
                });

                var updateDate = document.querySelector('.updateDate')
                var updateTime = document.querySelector('.updateTime')
                var changeDate = document.getElementById('changeDate')
                var changeTime = document.getElementById('changeTime')
                changeDate.onclick = () => {
                    updateTime.classList.add('hidden')
                    updateDate.classList.remove('hidden')
                }
                changeTime.onclick = () => {
                    updateDate.classList.add('hidden')
                    updateTime.classList.remove('hidden')
                }
                const btn_add = document.getElementById('btn_add')

                btn_add.onclick = () => {
                    const selectedValue = $('#searchable-select').val();

                    $.ajax({
                        url: '/couse/add_Class_HocVien',
                        type: 'POST',
                        data: {

                            clas: id
                            , hocvien: selectedValue

                        },
                        success: function (data) {

                        },
                        error: function (xhr, status, error) {
                        }
                    }
                    )

                }


            },
            error: function (xhr, status, error) {
            }
        }
        )

    }
})



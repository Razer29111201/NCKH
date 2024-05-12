var btn_edit = document.querySelectorAll('.btn_edit')
var btn_del = document.querySelectorAll('.btn_del')

btn_edit.forEach(item => {
    item.onclick = () => {
        var tr = item.parentNode.parentNode
        var listtd = tr.querySelectorAll('td')
        document.getElementById('id').value = listtd[0].outerText
        document.getElementById('title').value = listtd[1].outerText
        document.getElementById('form_').setAttribute("action", "/tuyensinh/group/update")
        document.getElementById('btn').value = "Lưu"
    }
})

btn_del.forEach(item => {
    item.onclick = () => {
        var tr = item.parentNode.parentNode
        var listtd = tr.querySelectorAll('td')
        const id = listtd[0].outerText
        $.ajax({
            url: '/tuyensinh/group/del',
            type: 'POST',
            data: {
                id: id

            },
            success: function (data) {
                window.location.href = '/tuyensinh/group_news'
            },
            error: function (xhr, status, error) {
            }

        }
        )

    }
})


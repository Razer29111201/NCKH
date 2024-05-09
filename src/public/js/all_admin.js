var fr_time = document.getElementById('fr_time')
var last_time = document.getElementById('last_time')

function formatDate(inputDate) {
    // Tạo một đối tượng Date từ inputDate
    var date = new Date(inputDate);

    // Lấy tháng và ngày
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var year = date.getFullYear();

    // Loại bỏ số 0 đứng trước nếu có
    month = parseInt(month);
    day = parseInt(day);

    // Trả về ngày đã định dạng lại
    return month + '/' + day + '/' + year;
}



last_time.onchange = () => {
    var fistime = formatDate(fr_time.value);
    var lasttime = formatDate(last_time.value);
    getvalue(fistime, lasttime)
    console.log(fistime, lasttime);


}
const getvalue = (a, b) => {
    $.ajax({
        url: '/admin/setAllAdmin',
        type: 'post',
        data: {
            firTime: a,
            lastTime: b
        },
        success: function (data) {
            $(".news-count").text = data.lenght
            console.log(data);
        }
    })
}


var btn = document.getElementById("btn")
var name = document.getElementById("name").value
var gender = document.getElementById("gender").value
var dob = document.getElementById("dob").value
var phone = document.getElementById("phone").value
var id_card = document.getElementById("id_card").value
var email = document.getElementById("email").value
var province = document.getElementById("province").value
var district = document.getElementById("district").value
var ward = document.getElementById("ward").value
var course = document.getElementById("course").value

var data = {
    name: name + 1,
    gender: gender,
    dob: dob,
    phone: phone,
    cccd: id_card,
    email: email,
    hometown: province + district + ward,
    course: course
}

var url = 'https://script.google.com/macros/s/AKfycbxLzvIhTEAY6USnv9QSuRu7yf4RJBYaU2MbOpIpAqhtVZ3noLjMHSnsuj_usDBq2u7SPQ/exec';
btn.onclick = () => {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data
    });
}

var select = document.getElementById('province')
var select1 = document.getElementById('district')
var select2 = document.getElementById('ward')
var id = ''
const api_provi = async () => {

    await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json').then(response => {
        return response.json()

    }).then(data => {
        data.forEach(element => {

            var newOption = document.createElement("option");
            id = element.Id
            newOption.value = element.Name;
            newOption.text = element.Name;
            select.appendChild(newOption);
        });

        select.addEventListener("change", function () {
            select1.innerHTML = ""
            const results = data.filter(item => item.Name === select.value);
            id = results
            results[0].Districts.forEach(elementt => {
                var newOption = document.createElement("option");
                newOption.value = elementt.Name;
                newOption.text = elementt.Name;
                select1.appendChild(newOption);
            })
        })
        select1.addEventListener("change", function () {
            select2.innerHTML = ""
            const results = id[0].Districts.filter(item => item.Name === select1.value);
            results[0].Wards.forEach(elementt => {
                var newOption = document.createElement("option");
                newOption.value = elementt.Name;
                newOption.text = elementt.Name;
                select2.appendChild(newOption);
            })
        })
    })
}


api_provi()


var course = document.getElementById("course")

const urlParams = new URLSearchParams(window.location.search);
const selectedId = urlParams.get('id');
const id_class = urlParams.get('id_class');
console.log(id_class);
if (selectedId) {
    $.ajax({
        url: '/tuyensinh/getClassDetail',
        type: "POST",
        data: { id: selectedId },
        success: function (data) {
            if (data.length > 0) {
                document.querySelector('.class_info').classList.remove('hidden')
                data.forEach(e => {
                    $('#class_info').append(`<option value="${e.id}" ${e.id == id_class ? 'selected' : ''} >
                    ${e.subject.name + " - " + e.teacher.name + " - " + e.date + " - " + e.time}
                </option >
                <% } %> `)
                })
            }
            else { }
        },
        error: function (xhr, status, error) {
            console.log(status);
        }
    });
}
course.onchange = (e) => {
    var id = e.target.value
    $.ajax({
        url: '/tuyensinh/getClassDetail',
        type: "POST",
        data: { id: id },
        success: function (data) {
            if (data.length > 0) {
                document.querySelector('.class_info').classList.remove('hidden')
                data.forEach(e => {
                    $('#class_info').append(`<option value="${e.id}">
                    ${e.subject.name + " - " + e.teacher.name + " - " + e.date + " - " + e.time}
                </option >
                <% } %> `)

                })

            }
            else {

            }
        },
        error: function (xhr, status, error) {
            console.log(status);
        }
    });
}
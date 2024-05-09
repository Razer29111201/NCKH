var form = document.getElementById("form-1")
var user = document.getElementById("user")
const nameInput = document.getElementById('name');
const nberInput = document.getElementById('nber');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const comfimpassInput = document.getElementById('comfimpass');
const sexSelect = document.getElementById('cars');

function validateForm(tag, params, mess) {
    if (params) {
        tag.parentElement.querySelector('small').innerText = ""
        document.getElementById("form").setAttribute("onsubmit", "return true")
    } else {
        tag.parentElement.querySelector('small').innerText = mess
        document.getElementById("form").setAttribute("onsubmit", "return false")
    }
}

var onC = (name, reg, count, mess) => {

    name.onchange = (event) => {
        const istrue = reg.test(event.target.value);
        validateForm(name, istrue && event.target.value.length >= count, mess);
        if (istrue && event.target.value.length >= count) {

        }
        else {
        }
    }

}

user.onchange = function (e) {
    $.ajax({
        url: '/user/doublecheck',
        type: 'post',
        data: { name: e.target.value },
        success: function (data) {
            validateForm(user, data === 0, "Tài Khoản đã tồn tại")
        }
    })
}

const regexName = /^\S+\s\S+.*$/
const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexSdt = /^[1-9][0-9]{8}$/
const regexPass = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/



comfimpassInput.onchange = (e) => {
    validateForm(comfimpassInput, e.target.value === passInput.value, "Mật khẩu không khớp")

}

onC(nameInput, regexName, 1, "Hãy nhập từ 2 ký tự trở lên.... ví dụ: Lê Thương")
onC(nberInput, regexSdt, 9, "Hãy nhập 9 số và bỏ số 0 ở đầu ....")
onC(emailInput, regexMail, 6, "Hãy nhập đúng email")
onC(passInput, regexPass, 8, "Hãy nhập có ký tự đặc biệt, viết hóa và trên 8 ký tự..... ví dụ: Abcd@1234")


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
        console.log(select);
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
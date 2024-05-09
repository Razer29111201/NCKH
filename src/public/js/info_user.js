var modall = document.getElementById("myModal");
var imguser = document.querySelector('.img_info')
var imgsrc = document.querySelector('.img_info img')
var click_img = document.querySelector('.click_img')
imguser.onclick = () => {
    click_img.classList.toggle('hiden')
}
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('see_avt')
var modalImg = document.getElementById("img01");


img.onclick = function () {
    click_img.classList.add('hiden')
    modall.style.display = "block";
    modalImg.src = imgsrc.src;
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modall.style.display = "none";
}

document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('.click_img') && !target.closest('.img_info')) {
        click_img.classList.add('hiden')
    }
    if (!target.closest('#see_avt') && !target.closest('#img01')) {
        modall.style.display = "none";
    }

});

document.getElementById("img").addEventListener("change", function () {
    const save_avt = document.querySelector(".save_avt")
    save_avt.classList.remove("hiden")
    const file = this.files[0];
    const previewImage = document.getElementById("previewImage");

    if (file && file.type.startsWith("image/")) {
        const fileURL = URL.createObjectURL(file);
        imgsrc.src = fileURL;
    } else {

        console.log("Vui lòng chọn một file ảnh.");
    }
});

// Nếu bạn muốn lấy link khi nhấn nút "Lấy Link"



















const input = document.querySelectorAll('.info_data input')
const edit = document.querySelector('#edit')
function a() {
    input.forEach((item, index) => {
        item.setAttribute("readonly", "")
        item.classList.add("opacity")
    })

}
a()
edit.onclick = () => {
    document.getElementById('cancel').removeAttribute("hidden")
    document.getElementById('btn_save').removeAttribute("hidden")
    input.forEach((item, index) => {
        item.removeAttribute("readonly")
        item.classList.remove("opacity")
        document.getElementById('address').classList.add("hiden")
        document.getElementById('select').classList.remove("hiden")
    })
    edit.setAttribute("hidden", "")
}
document.getElementById('cancel').onclick = () => {
    document.getElementById('cancel').setAttribute("hidden", "")
    document.getElementById('btn_save').setAttribute("hidden", "")
    document.getElementById('address').classList.remove("hiden")
    document.getElementById('select').classList.add("hiden")
    a()
}
//validate
var date = document.getElementById("date")
date.onchange = e => {
    validateDate(e)
}
function validateDate(event) {
    // Biểu thức chính quy để kiểm tra định dạng "dd-mm-yyyy"
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    // Kiểm tra xem chuỗi đầu vào có khớp với biểu thức chính quy không
    if (regex.test(event.target.value)) {
        date.parentElement.querySelector('span').innerText = ""
        document.getElementById("form").setAttribute("onsubmit", "return true")
    } else {
        date.parentElement.querySelector('span').innerText = "Hãy điền đúng định dạng.... ví dụ: 13-07-2003"
        document.getElementById("form").setAttribute("onsubmit", "return false")


    }
}
function validateForm(tag, params, mess) {
    if (params) {
        tag.parentElement.querySelector('span').innerText = ""
        document.getElementById("form").setAttribute("onsubmit", "return true")
    } else {
        tag.parentElement.querySelector('span').innerText = mess
        document.getElementById("form").setAttribute("onsubmit", "return false")


    }


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
            console.log(data);
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
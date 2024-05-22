
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
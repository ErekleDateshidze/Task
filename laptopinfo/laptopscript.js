const API_URL = 'https://pcfy.redberryinternship.ge/api/brands';
const API_URL2 = 'https://pcfy.redberryinternship.ge/api/cpus';
const TOKEN = '78c6628ba41952177a825ad8f9af23c8';
const CREATE_LAPTOP_URL = 'https://pcfy.redberryinternship.ge/api/laptop/create';

const selectBrand = document.getElementById('select-brand');
const selectCpu = document.getElementById('select-cpu');

getBrands(API_URL)
getCpus(API_URL2)

const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector("h4");
const button = document.querySelector("button");
const input = document.querySelector("input");
let file;
let requestBody;
let image;

button.onclick = () => input.click();

input.onchange = () => {
    file = this.files[0];
    dropArea.classList.add("active");
    showImage();

    /* TODO: replace the blob content with your byte[] */
    var blob = new Blob([yourBinaryDataAsAnArrayOrAsAString], { type: "application/octet-stream" });
    var fileName = "myFileName.myExtension";
    saveAs(blob, fileName);
};

dropArea.ondragover = (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "აუშვით მაუსის მარცხენა ღილაკს თითი";
};

dropArea.ondragleave = () => {
    dropArea.classList.remove("active");
    dragText.textContent = "ჩააგდეთ ფოტო";
};

dropArea.ondrop = (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showImage();
};

showImage = () => {
    let fileType = file.type;
    let validFiletypes = ["image/jpeg", "image/jpg", "image/png"];

    if (validFiletypes.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let image = `<img src="${fileURL}" alt="image">`;
            dropArea.innerHTML = image;
        }
    }
    else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "ჩააგდეთ ფოტო";
    }
}


function validateLaptopName() {
    let laptopName = document.getElementById('laptop-name');
    let validationMessage = document.getElementById('validation-laptop-name');
    let regex = /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    if (!regex.test(laptopName.value)) {
        laptopName.classList.add('validation-input')
        validationMessage.classList.add('validation-text');
        return false
    }

    validationMessage.classList.remove('validation-text');
    laptopName.classList.remove('validation-input');
    return true;
}

function validateNumericValues(fieldName) {
    let field = document.getElementById(fieldName);
    let fieldValidationMessage = document.getElementById('validation-' + fieldName);
    let regex = /^[0-9]+$/;

    if (!regex.test(field.value) || field.value === '' || !field.value) {
        field.classList.add('validation-input')
        fieldValidationMessage.classList.add('validation-text');
        return false
    }

    fieldValidationMessage.classList.remove('validation-text');
    field.classList.remove('validation-input');
    return true;
}

function validateRadioButtons(fieldName) {
    let field = document.querySelector('input[name=' + fieldName + ']');

    if (!field.checked) {
        field.classList.add('validation-input')
        return false
    }

    field.classList.remove('validation-input');
    return true;
}

function submitForm() {
    validateLaptopName()
    validateNumericValues('cpu-cores');
    validateNumericValues('cpu-threads');
    validateNumericValues('ram');
    validateNumericValues('price');
    validateRadioButtons('memory');
    validateRadioButtons('condition');
    let formValidationFailed = document.getElementsByClassName('validation-input').length
    if (!formValidationFailed.length) {
        getRequestBody();
        setTimeout(() => {
            let body = requestBody;
            body.laptop_image = image
            console.log(body);
            const formData = new FormData()
            formData.append('json', JSON.stringify(body));

            fetch(CREATE_LAPTOP_URL, {
                method: 'POST',
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.path)
                })
                .catch(error => {
                    console.error(error)
                })
        }, 1000)

    }
}

async function getBrands(url) {
    const res = await fetch(url)
    const data = await res.json()
    showBrands(data)
}


function showBrands(brands) {
    brands.data.forEach((brand) => {
        const { name } = brand

        selectBrand.innerHTML += `
        <option class="brands" value="${brand.id}"> ${name}</option>
        `

    });

}

async function getCpus(url) {
    const res = await fetch(url)
    const data = await res.json()
    showCpus(data)
}

function showCpus(cpus) {
    cpus.data.forEach((cpu) => {
        const { name } = cpu

        selectCpu.innerHTML += `
        <option class="cpus" value="${cpu.name}"> ${name}</option>
        `

    });

}

function getStoredInfo() {
    let localStorage = window.localStorage;
    return {
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname'),
        team_id: localStorage.getItem('select-team_id'),
        position_id: localStorage.getItem('select-position_id'),
        email: localStorage.getItem('mail'),
        phone_number: localStorage.getItem('tel')
    }
}

function getRequestBody() {
    let laptopImage = new FileReader();
    laptopImage.onload = () => {
        image = laptopImage
    }
    image = laptopImage.readAsBinaryString(file);

    let laptopName = document.getElementById('laptop-name').value;
    let laptopBrand = +document.getElementById('select-brand').value;
    let laptopCpu = document.getElementById('select-cpu').value;
    let laptopCpuCores = +document.getElementById('cpu-cores').value;
    let laptopCpuThreads = +document.getElementById('cpu-threads').value;
    let laptopRam = +document.getElementById('ram').value;
    let laptopMemory = document.querySelector('input[name=memory]:checked').value;
    let laptopPurchaseDate = document.getElementById('purchase-date').value;
    let laptopPrice = +document.getElementById('price').value;
    let laptopState = document.querySelector('input[name=condition]:checked').value;
    let storedInfo = getStoredInfo();


    requestBody = {
        token: TOKEN,
        laptop_name: laptopName,
        laptop_image: image,
        laptop_brand_id: laptopBrand,
        laptop_cpu: laptopCpu,
        laptop_cpu_cores: laptopCpuCores,
        laptop_cpu_threads: laptopCpuThreads,
        laptop_ram: laptopRam,
        laptop_hard_drive_type: laptopMemory,
        laptop_state: laptopState,
        laptop_purchase_date: laptopPurchaseDate,
        laptop_price: laptopPrice,
        name: storedInfo.name,
        surname: storedInfo.surname,
        team_id: +storedInfo.team_id,
        position_id: +storedInfo.position_id,
        email: storedInfo.email,
        phone_number: storedInfo.phone_number
    }


}
const dropArea = document.querySelector(".drag-area"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");


let file; //this is a global variable and we'll use it inside multiple funcitons


button.onclick = () => {
    input.click(); //if user click onthe button then input is also clicked
}

input.addEventListener("change", function () {

    //getting user select file [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    showFile();
})


//when user drags file over dragarea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    console.log("File is over DragArea")
})


//when user drags file outside dragarea

dropArea.addEventListener("dragleave", () => {
    console.log("File is outside DragArea")
})



dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    console.log("File is dropped on DragArea")
    file = event.dataTransfer.files[0];
});

function showFile() {
    let fileType = file.type;
    console.log(fileType);

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];  //adding some valid image extensions

    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader(); //creaing new file reader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL varaiable
            let imgTag = `<img src="${fileURL}">` //creating and img tag and passing user selected file source isnide src  attribute
            dropArea.innerHTML = imgTag; // adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        console.log("this is not an Image File");
    }
}


const API_URL = 'https://pcfy.redberryinternship.ge/api/brands'
const API_URL2 = 'https://pcfy.redberryinternship.ge/api/cpus'

const selectBrand = document.getElementById('select-brand')
const selectCpu = document.getElementById('select-cpu')

getBrands(API_URL)
getCpus(API_URL2)

async function getBrands(url) {
    const res = await fetch(url)
    const data = await res.json()
    showBrands(data)
}


function showBrands(brands) {
    brands.data.forEach((brand) => {
        const { name } = brand

        selectBrand.innerHTML += `
        <option class="brands"> ${name}</option>
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
        <option class="cpus"> ${name}</option>
        `

    });

}
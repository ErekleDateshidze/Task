const API_URL = 'https://pcfy.redberryinternship.ge/api/teams'
const API_URL2 = 'https://pcfy.redberryinternship.ge/api/positions'

const selectTeam = document.getElementById('select-team');
const selectPosition = document.getElementById('select-position');
let allTeams;
let allPositions;

getTeams(API_URL);
getPositions(API_URL2);
getStoredInfo();

function getStoredInfo() {
    if (window.localStorage.getItem('name')) {
        let storedInfoInputs = ['name', 'surname', 'select-team', 'select-position', 'mail', 'tel'];
        storedInfoInputs.forEach(info => {
            if (info === 'select-team' || info === 'select-position') {
                document.getElementById(info).innerHTML += `
                <option hidden selected disabled value="">${window.localStorage.getItem(info)}</option>
                `
                document.getElementById(info).removeAttribute('disabled');

            } else {
                document.getElementById(info).value = window.localStorage.getItem(info);
            }
        })
    }
}


async function getTeams(url) {
    const res = await fetch(url)
    const data = await res.json();
    allTeams = data;
    showTeams(data)
}

function showTeams(teams) {
    teams.data.forEach((team) => {
        const { name } = team

        selectTeam.innerHTML += `
        <option class="teams" id="team-${team.id}" value="${team.id}"> ${name}</option>
        `

    });

}

selectTeam.addEventListener('change', function (e) {
    selectPosition.removeAttribute('disabled');
    showPositions();
});

function showPositions() {
    let positions = allPositions;
    selectPosition.innerHTML = 'პოზიცია';
    positions?.data.forEach(position => {
        if (position.team_id === +selectTeam.value) {
            const { name } = position

            selectPosition.innerHTML += `
            <option value="${position.id}"> ${name}</option>
            `
        }
    })
}

async function getPositions(url) {
    const res = await fetch(url)
    const data = await res.json()
    allPositions = data
}

function validateNameAndSurname(fieldName) {
    let field = document.getElementById(fieldName);
    let fieldValidationMessage = document.getElementById('validation-' + fieldName);
    let fieldRegex = (/^[ა-ჰ]+$/);

    if (field.value.length <= 2 || field.value === '' || !field.value) {
        fieldValidationMessage.innerHTML = 'მინიმუმ 2 სიმბოლო';
        field.classList.add('validation-input')
        fieldValidationMessage.classList.add('validation-text');
        return false;
    }

    if (!field.value.match(fieldRegex)) {
        fieldValidationMessage.innerHTML = 'გამოიყენე ქართული ასოები';
        field.classList.add('validation-input')
        fieldValidationMessage.classList.add('validation-text');
        return false;
    }

    fieldValidationMessage.innerHTML = 'მინიმუმ 2 სიმბოლო, ქართული ასოები';
    fieldValidationMessage.classList.remove('validation-text');
    field.classList.remove('validation-input');
    return true;
}

function validateTeam(fieldName) {
    let field = document.getElementById(fieldName);
    if (field.value === 'თიმი') {
        field.classList.add('validation-input');
        return false;
    }

    field.classList.remove('validation-input');
    return true
}

function validateMail(fieldName) {
    let field = document.getElementById(fieldName);
    let fieldValidationMessage = document.getElementById('validation-' + fieldName);
    let mail = field.value;
    if (mail.search(/^[\w-\.]+@redberry.ge/) < 0) {
        fieldValidationMessage.classList.add('validation-text');
        field.classList.add('validation-input');
        return false;
    }

    fieldValidationMessage.classList.remove('validation-text');
    field.classList.remove('validation-input');
    return true;
}

function validateTel(fieldName) {
    let field = document.getElementById(fieldName);
    let fieldValidationMessage = document.getElementById('validation-' + fieldName);
    let numberRegex = /^\d+$/;
    number = field.value.replace(/\s+/g, "");

    if (number[0] != "+") {
        fieldValidationMessage.innerHTML = 'მობილურის ნომერი უნდა იწყებოდეს "+"-ით';
        fieldValidationMessage.classList.add('validation-text');
        field.classList.add('validation-input');
        return false
    } else {
        number = number.substring(1);
    }

    if (number.indexOf("9955") != 0 || numberRegex.test(number) != true || number.length != 12) {
        fieldValidationMessage.innerHTML = 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'
        fieldValidationMessage.classList.add('validation-text');
        field.classList.add('validation-input');
        return false
    }

    fieldValidationMessage.classList.remove('validation-text');
    field.classList.remove('validation-input');
    return true;

}

function nextPage() {
    validateNameAndSurname('name');
    validateNameAndSurname('surname');
    validateTeam('select-team');
    validateMail('mail');
    validateTel('tel')
    let formValidationFailed = document.getElementsByClassName('validation-input').length
    if (!formValidationFailed) {
        let selectedTeam;
        let selectedPosition;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const teamId = document.getElementById('select-team').value;
        const positionId = document.getElementById('select-position').value;
        const mail = document.getElementById('mail').value;
        const tel = document.getElementById('tel').value;


        allTeams.data.forEach(teamFromApi => {
            if (teamFromApi.id === +teamId) {
                selectedTeam = teamFromApi.name;
            }
        })

        allPositions.data.forEach(positionFromApi => {
            if (positionFromApi.id === +positionId) {
                selectedPosition = positionFromApi.name;
            }
        })

        let fieldObj = {
            'name': name,
            'surname': surname,
            'select-team': selectedTeam,
            'select-team_id': teamId,
            'select-position': selectedPosition,
            'select-position_id': positionId,
            'mail': mail,
            'tel': tel,


        }

        for (const [key, value] of Object.entries(fieldObj)) {
            window.localStorage.setItem(key, value);
        }

        window.location.href = '../laptopinfo/laptopinfo.html'
    }
}


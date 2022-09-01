const API_URL = 'https://pcfy.redberryinternship.ge/api/teams'

const select = document.getElementById('select-team')

getTeams(API_URL)


async function getTeams(url) {
    const res = await fetch(url)
    const data = await res.json()
    showTeams(data)
}


function showTeams(teams) {
    select.innerHTML = ''
    teams.data.forEach((team) => {
        const { name } = team

        const teamEl = document.createElement('option')
        teamEl.classList.add('team-option')

        teamEl.innerHTML = `
        <option> ${name}</option>
        `

        select.appendChild(teamEl)
    });
}



const API_URL2 = 'https://pcfy.redberryinternship.ge/api/positions'

const select2 = document.getElementById('select-position')

getPositions(API_URL2)



async function getPositions(url) {
    const res = await fetch(url)
    const data = await res.json()
    showPositions(data)
}

function showPositions(positions) {
    select.innerHTML = ''
    positions.data.forEach((position) => {

        const { name } = position

        const posEl = document.createElement('option')
        posEl.classList.add('position-option')

        posEl.innerHTML = `
        <option> ${name}</option>
        `

        select.appendChild(posEl)
    })
}


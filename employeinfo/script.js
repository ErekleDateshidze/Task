const API_URL = 'https://pcfy.redberryinternship.ge/api/teams'

const select = document.getElementById('select-team')

getTeams(API_URL)


async function getTeams(url) {
    const res = await fetch(url)
    const data = await res.json()
    // showTeams(data.results)
    console.log(data)
}



// function showTeams(teams) {
//     select.innerHTML = ''
//     teams.forEach((team) => {
//         const { name } = team

//         const teamEl = document.createElement('option')
//         teamEl.classList.add('team-option')

//         teamEl.innerHTML = `
//         <option> ${name}</option>
//         `

//         select.appendChild(teamEl)
//     });
// }
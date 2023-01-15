const resultText = $('#result-text')
const resultJson = $('#result-json')
let tableHeader = $('#result-json thead tr')
let tableBody = $('#result-json tbody')
let headers = false
let heads = []

function showError (error) {
    resultText.removeClass('d-none').text(error)
}

function showJson(data) {
    $(data).each((index, value) => {
        setupTableHeader(value)

        // Insert new rows using table's header titles
        let row = ''
        for (let head in heads) {
            let col = heads[head]
            console.log(col)
            row = row.concat(`<td>${value[col]}</td>`)
        }

        tableBody.append(`<tr>${row}</tr>`)
    })
}

function setupTableHeader(value) {
    if (!headers) {
        let keys = Object.keys(value)
        for (let key in keys) {
            tableHeader.append(`<th>${keys[key]}</th>`)
            heads.push(keys[key])
        }

        headers = true
    }
}

$('#btn-text').on('click', function () {
    fetch("articled.txt").then(r => {
        return r.text()
    }).then(r => {
        resultText.removeClass('d-none').text(r)
    }).catch(reason => {
        showError(reason)
    })
})

$('#btn-json').on('click', function () {
    fetch("article.json").then(r => {
        return r.json()
    }).then(r => {
        resultJson.removeClass('d-none')
        showJson(r)

    }).catch(reason => {
        showError(reason)
    })
})

$('#btn-api').on('click', function () {
    fetch("https://api.github.com/users").then(r => {
        return r.json()
    }).then(r => {
        resultJson.removeClass('d-none')
        showJson(r)

    }).catch(reason => {
        showError(reason)
    })
})

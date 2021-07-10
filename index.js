async function getPost (){
    const tbody = document.getElementById('tbody')
    // tbody.innerHTML = ''
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (response.ok) {
        return response.json()
    }
}

function fillPost  ()  {
    getPost().then(data => {
        data.forEach(post => {
            let text = post.body
            const tbody = document.getElementById('tbody')
            const tr = document.createElement('tr')
            const title = document.createElement('td')
            const comments = document.createElement('td')
            const action = document.createElement('td')
            tr.append(title, comments, action)
            tbody.append(tr)

            title.innerHTML = `<p>${post.title}</p>`
            comments.innerHTML = `<p class="comments">Комментарии</p>`
            comments.addEventListener('click', () => {
                openModal()
                createModal(post.title, post.body, post.id)
            })
            action.addEventListener('click', () => {
                deletePost(post.id)
                tr.remove()
            })
            action.innerHTML = `<div class="deleteButton"><p>Удалить</p></div>`
        })
    })
}
fillPost()

function createModal(t, b, id) {
    const table = document.getElementById('table-modal')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const title = document.createElement('td')

    const  tbody = document.createElement('tbody')
    const trBody = document.createElement('tr')
    const text = document.createElement('td')

    getComment(id).then(dataCom => {
        dataCom.forEach(comment => {
            const trCom = document.createElement('tr')
            const tdEmail = document.createElement('td')
            const tdComment = document.createElement('td')
            trCom.append(tdEmail, tdComment)
            tbody.append(trCom)
            tdEmail.innerText = `${comment.email}`
            tdComment.innerText = `${comment.body}`
        })
    })

    tr.append(title)
    thead.append(tr)
    title.innerHTML = `<h3>${t}</h3>`

    trBody.append(text)
    tbody.append(trBody)
    table.append(thead, tbody,)
    text.innerHTML = `<p>${b}</p>`
}



async function getComment(id) {
    const tbody = document.getElementById('table-modal')
    tbody.innerHTML = ''
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    if (response.ok) {
        return response.json()
    }
}

function fillComment() {
    getPost().then(data => {
        data.forEach(post => {
            let text = post.body
        })

    })
}

fillComment()

const openModal = () => {

        document.getElementById('myModal').style.display = 'block'

    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })

}

const closeModal = () => {
    document.getElementById('myModal').style.display = 'none'
    const tbody = document.getElementById('table-modal')
    tbody.innerHTML = ''
}

async function deletePost(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        return  fillPost()

    }
}

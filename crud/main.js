'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => { 
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

    // CRUD - create, read, update, delete

// Esse sim irá adicionar: precisa aplicar o json.parse, pois estava sendo reconhecido como string 
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
// Essa parte funciona bem, porém eu preciso adicionar, não substituir no LS
const setLocalStorage = (db_client) => localStorage.setItem("db_client", JSON.stringify(db_client))

// CREATE
const createClient = (client) => {
    const db_client =  getLocalStorage()
    db_client.push(client)
    setLocalStorage(db_client)
}

// READ
const readClient = () => getLocalStorage()

// UPDATE 
const updateClient = (index, client) => {
    // vai ler e botar numa variável
    const db_client = readClient()
    // precisa receber um indice pra saber quem vai editar
    db_client[index] = client
    // mandar para o banco
    setLocalStorage(db_client)
}

// DELETE 
const deleteClient = (index) => {
    const db_client = readClient()
    db_client.splice(index, 1)
    setLocalStorage(db_client)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
 }

// layout interection

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById("name").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("phone").value,
            cidade: document.getElementById("city").value
        }
        const index = document.getElementById('name').dataset.index
        if(index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
        
    }
 }

 const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}" >Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('name').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('phone').value = client.celular
    document.getElementById('city').value = client.cidade
    document.getElementById('name').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if(action == 'edit')  {
            editClient(index)
        }else {
            const client = readClient()[index]
            const response = confirm (`Deseja realmente excluir o cliente ${client.nome}`)
            if(response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

 updateTable()

// events
document.getElementById('registerCustomer')
        .addEventListener('click', openModal)

document.getElementById('modalClose')
        .addEventListener('click', closeModal)

document.getElementById('save')
        .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
        .addEventListener('click', editDelete)
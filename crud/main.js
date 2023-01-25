'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Bruna",
    email: "bruna@email.com",
    celular: "21123456",
    cidade: "Mesquita"
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

// events
document.getElementById('registerCustomer')
        .addEventListener('click', openModal)

document.getElementById('modalClose')
        .addEventListener('click', closeModal)
'use strict'

let dataBase = [
    {'task': 'Estudar JS', 'status': ''},
    {'task': 'Estudar python', 'status': 'checked'}
]

const createItem = (task, status) => {
    const item = document.createElement('label');
    item.classList.add('todo_item')
    item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${task}</div>
        <input type="button" value="X">
    `
    document.getElementById('todoList').appendChild(item)
}

const updateList = () => {
    dataBase.forEach(item => createItem(item.task, item.status));
}

updateList();
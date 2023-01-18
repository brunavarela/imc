'use strict'

let dataBase = [
    {'task': 'Estudar JS', 'status': ''},
    {'task': 'Estudar python', 'status': 'checked'}
]

const getDataBase = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDataBase = (dataBase) => localStorage.setItem('todoList', JSON.stringify(dataBase));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const clearTask = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const updateTask = () => {
    clearTask();
    const dataBase = getDataBase();
    dataBase.forEach((item, index) => createItem(item.task, item.status, index));
}


const insertItem = (event) => {
    const key = event.key
    const text = event.target.value
    if (key==='Enter') {
        const dataBase = getDataBase();
        dataBase.push({'task': text, 'status': ''});
        setDataBase(dataBase);
        updateTask();
        event.target.value = ''
    }
}

const removeItem = (index) => {
    const dataBase = getDataBase()
    dataBase.splice(index, 1);
    setDataBase(dataBase);
    updateTask();
}

const updateItem = (index) => {
    const dataBase = getDataBase();
    dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
    setDataBase(dataBase);
    updateTask();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    }else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

updateTask();
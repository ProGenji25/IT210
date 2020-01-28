let jsonString = localStorage.getItem('database');
const data = JSON.parse(jsonString) || [];
readItems();

function updateStorage(newData) {
    localStorage.setItem('database', JSON.stringify(newData));
}

function createItem(){
    // Pulls in form data from DOM, formats it to JSON, and saves it to localStorage
    let task = document.getElementById("inputtext").value;
    let item = {
        text: task,
        done: false
    };
    data.push(item);
    updateStorage(data);
    readItems();
}

function readItems() {
    // Pulls in data from localStorage, parses it, and updates DOM accordingly
    let list = document.getElementById("myUL");
    let tasks = "";
    for(let i = 0; i < data.length; i++) {
        tasks +=`<li class ="collection-item" id="${i}">
                    <label>
                        <input type="checkbox" id ="check${i}" value="${data[i].done}" onclick ="updateItem(${i})" ${data[i].done ? "checked" : ""}/>
                        <span>${data[i].text}</span>
                        <button class ="waves-effect waves-light btn" id ="del-btn${i}" onclick ="deleteItem(${i})">Delete</button>
                    </label>
                 </li>`;
    };
    list.innerHTML = tasks;
}

function updateItem(index) {
    // Updates item in data, saves it to localStorage
    data[index].done === false ? data[index].done = true : data[index].done = false;
    updateStorage(data);
    readItems();
}

function deleteItem(index) {
    // Deletes item from data, saves it to localStorage
    data.splice(index, 1);
    updateStorage(data);
    readItems();
}

document.getElementById("submit-btn").addEventListener("click", createItem);
// DOM Elements
const sunbtn = document.getElementById('sunbtn');
const darkmodeElements = document.querySelectorAll('.darkmode');
const sunimg = document.getElementById('sunimg');
const todobtn = document.getElementById('todobtn');
const addbtn = document.getElementById('addbtn');
const todolistpage = document.getElementById('todolistpage');
const topimg = document.getElementById('topimg');

// Initialize todo data from localStorage
let tododata = JSON.parse(localStorage.getItem('tododata')) || [];
topimg.classList.add('darkbackground');

// Initialize the todo list
displaydata();

// Dark/Light mode toggle
sunbtn?.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    darkmodeElements.forEach(item => {
        item.classList.toggle('darkmode');
        item.classList.toggle('lightmode');
    });

    const isDarkMode = document.querySelector('.darkmode');
    sunimg.src = isDarkMode ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
    
    topimg.classList.toggle('darkbackground');
    topimg.classList.toggle('lightbackground');
}

// Add new todo item
addbtn?.addEventListener('click', () => {
    if (!todobtn.value.trim()) {
        alert('Please insert content');
        return;
    }

    tododata.push({
        text: todobtn.value.trim(),
        done: false
    });

    saveAndRender();
    todobtn.value = '';
});

// Toggle todo item completion status
function checkdata(index) {
    tododata[index].done = !tododata[index].done;
    saveAndRender();
}

// Delete todo item
function deleteitem(index) {
    tododata.splice(index, 1);
    saveAndRender();
}

// Save to localStorage and render the list
function saveAndRender() {
    localStorage.setItem('tododata', JSON.stringify(tododata));
    displaydata();
}

// Render the todo list
function displaydata() {
    if (!todolistpage) return;

    // Using document fragment for better performance
    const fragment = document.createDocumentFragment();

    tododata.forEach((item, i) => {
        const todoElement = document.createElement('div');
        todoElement.className = 'newtodo w-100 p-2';
        todoElement.innerHTML = `
            <div class="inputgroup mb-1 d-flex justify-content-start align-items-center gap-2">
                <label class="containers">
                    <input onchange="checkdata(${i})" type="checkbox" ${item.done ? 'checked' : ''}>
                    <div class="checkmark"></div>
                </label>
                <p class="text-center p-0 m-0 ${item.done ? 'textdelete' : ''}">
                    ${item.text}
                </p>
                <button class="zr d-flex justify-content-end align-items-end btn btn-danger deletebtn" onclick="deleteitem(${i})">
                    <img src="images/icon-cross.svg" alt="Delete">
                </button>
            </div>
        `;
        fragment.appendChild(todoElement);
    });

    todolistpage.innerHTML = '';
    todolistpage.appendChild(fragment);
}
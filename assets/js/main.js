const sunbtn = document.getElementById('sunbtn')
const darkmodehtml = document.querySelectorAll('.darkmode')
const sunimg = document.getElementById('sunimg')
const todobtn = document.getElementById('todobtn')
const addbtn = document.getElementById('addbtn')
const todolistpage = document.getElementById('todolistpage')
let tododata = []
const topimg = document.getElementById('topimg')
topimg.classList.add('darkbackground')
if(JSON.parse(localStorage.getItem('tododata')) !== null){
    tododata = JSON.parse(localStorage.getItem('tododata'))
    displaydata()
}

sunbtn.addEventListener('click',()=>{
    darkmodehtml.forEach((item)=>{
        if(item.classList.contains('darkmode')){
            item.classList.remove('darkmode')
            item.classList.add('lightmode')
            sunimg.src = 'images/icon-moon.svg'
            topimg.classList.add('lightbackground')
            topimg.classList.remove('darkbackground')
        }else{
            item.classList.add('darkmode')
            item.classList.remove('lightmode')
            sunimg.src='images/icon-sun.svg'
           topimg.classList.remove('lightbackground')
           topimg.classList.add('darkbackground')
        }
    })
    console.log(topimg)
})
addbtn.addEventListener('click', () => {
    if (todobtn.value == '') {
        alert('Please insert content');
    } else {
        // Add new todo item to the tododata array
        tododata.push({
            text: todobtn.value,
            done: false // Default to false for new items
        });

        // Clear the existing todo list
        

        // Render each todo item
        displaydata()

        // Save the updated tododata to localStorage
        localStorage.setItem('tododata', JSON.stringify(tododata));

        // Clear the input field
        todobtn.value = '';
    }
});
function checkdata(i){
    console.log(i)
    tododata[i].done = !tododata[i].done
    console.log(tododata)
    localStorage.setItem('tododata', JSON.stringify(tododata));
    displaydata()
}
function displaydata(){
    todolistpage.innerHTML = '';
    tododata.forEach((item,i) => {
        todolistpage.innerHTML += `
            <div class="newtodo w-100 p-2">
                <div class="inputgroup mb-1 d-flex justify-content-start align-items-center gap-2">
                    <label class="containers">
                        <input onchange="checkdata(${i})" type="checkbox" ${item.done ? 'checked' : ''}>
                        <div class="checkmark"></div>
                    </label>
                    <p class="text-center p-0 m-0 ${item.done ? 'textdelete' : ''}" id="exampleFormControlInput1">
                        ${item.text}
                    </p>
                </div>
            </div>
        `;
    });

}
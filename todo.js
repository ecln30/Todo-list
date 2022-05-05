








// - Filter by all/active/complete todos
// - Clear all completed todos
// - Toggle light and dark mode
// - **Bonus**: Drag and drop to reorder items on the listBonus: Build this project as a full-stack application


const input = document.querySelector(".create-todo")
const button = document.querySelector("button")
const todos = document.querySelector(".todos")
const selected = document.querySelector("select")
const options = document.querySelectorAll("option")
let arr = JSON.parse(localStorage.getItem('user')) || []


button.addEventListener("click", addItem)
todos.addEventListener("click", del)
todos.addEventListener("click", edit)
todos.addEventListener("click",  toggleDone)
selected.addEventListener("change", selectedValue)
display(arr, todos)

function addItem(e) {
    e.stopPropagation()
    let work = {
        todo: input.value,
        id: Date.now(),
        done: false
    }

    arr.push(work)
    display(arr,todos)
    localStorage.setItem("user", JSON.stringify(arr))
    input.value = ""
     
}

function display(Arr = [],container){
    container.innerHTML = Arr.map(( item, i ) => {
        return ` 
        <div class="todo">
          <input type="checkbox" class="todocheck" 
          data-index=${i}
          ${item.done ? "checked" : ""} >

          <input type="text" class="task" 
            value="${item.todo}" 
          >
 
          <img src="https://aux.iconspalace.com/uploads/edit-icon-256-1210673614.png" class="edit" 
          data-index=${i}
          >
 
          <div class="Icon" >
          <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/OOjs_UI_icon_trash.svg/240px-OOjs_UI_icon_trash.svg.png" 
          class="trash" 
          id="${item.id}" >
          </div>
        </div>
      `
    }).join("")

}

function toggleDone(e){
    e.stopPropagation()
    if(!e.target.matches(".todocheck"))return
    const el = e.target
    const index = el.dataset.index
    arr[index].done = !arr[index].done
    if(arr[index].done){
        el.nextElementSibling.classList.add("line")
    } else {
        el.nextElementSibling.classList.remove("line")
    }
    console.log( el.nextElementSibling)
    localStorage.setItem("user", JSON.stringify(arr))
    display(arr, todos)
}

function edit(e) {
    e.stopPropagation()
    if(!e.target.matches(".edit"))return
    const el = e.target
    const index = el.dataset.index
    let value
    if(el.matches(".edit")) {
        if( el.previousElementSibling.readonly == true) {
            el.previousElementSibling.removeAttribute("readonly")
            el.previousElementSibling.readonly = false
            el.previousElementSibling.style.color ="green"
            el.src = "https://iconarchive.com/download/i98133/flat-icons.com/square/save.ico"
        } else {
            el.previousElementSibling.setAttribute("readonly", "readonly")
            el.previousElementSibling.readonly = true
            el.previousElementSibling.style.color ="yellow"
            el.src = "https://aux.iconspalace.com/uploads/edit-icon-256-1210673614.png"
            value =  el.previousElementSibling.value
            changeValue(value, index)
        }
    }
}

function changeValue(value, index){
    arr[index].todo = value
    localStorage.setItem("user", JSON.stringify(arr))
}

function del(e){
    e.stopPropagation()
    if(!e.target.matches(".trash")) return
   let el = e.target
   const Id = el.id
   if(el.matches(".trash")){
       el.parentNode.parentNode.removeChild(el.parentNode)
        arr = arr.filter( item => item.id != Id)
       localStorage.setItem("user", JSON.stringify(arr))
       display(arr, todos)
   }
}

function selectedValue() {
    let active = []
    let completed = []
    const value = Array.from(options)
                 .filter(option => option.selected)
                 .map(option => option.value)
    
    console.log(value[0])
    if(value[0] === 'all') display(arr, todos)
    else if ( value[0] === "active") {
         active = arr.filter(item => item.done !== true)
         display(active, todos)
         console.log(arr)
    } else if(value[0] === "completed") {
        completed = arr.filter(item => item.done !== false)
        console.log(arr)
        display(completed, todos)
    }

}
 console.log(arr)
input.addEventListener("keyup", e => {
    e.stopPropagation()
    if(e.keyCode === 13) {
        button.click()
    }
})

























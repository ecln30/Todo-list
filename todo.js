// selector
const input = document.querySelector(".create-todo")
const button = document.querySelector("button")
const todos = document.querySelector(".todos")
const selected = document.querySelector("select")
const options = document.querySelectorAll("option")
const clear = document.querySelector(".clear")
const imgEl = document.querySelector("img")
let arr = JSON.parse(localStorage.getItem('user')) || []

// declaration variable
const body = document.body
let inputBox = body.querySelector(".todoBox")
const moon = "https://cdn-icons-png.flaticon.com/512/196/196685.png" 
const sun = "https://icon-library.com/images/sun-icon-png/sun-icon-png-27.jpg"


// functions Here
reFresh()
function reFresh(e) {
    if(localStorage.getItem("theme") === "light"){
             body.classList.add("light")
             selected.classList.add("white")
             clear.classList.add("white")
             inputBox.classList.add("white")
             input.classList.add("white")
        localStorage.setItem("theme", "light")
    } else if(localStorage.getItem("theme") === "Dark") {
                 body.classList.remove("light")
                 selected.classList.remove("white")
                 clear.classList.remove("white")
                 input.classList.remove("white")
                 inputBox.classList.remove("white")
                 localStorage.setItem("theme", "dark")
        }
}
 
// eventlistener
button.addEventListener("click", addItem)
todos.addEventListener("click", del)
todos.addEventListener("click", edit)
todos.addEventListener("click",  toggleDone)
selected.addEventListener("change", selectedValue)
clear.addEventListener("click", Clear)
imgEl.addEventListener("click", toggleTheme)
display(arr, todos)

function addItem(e) {
    e.stopImmediatePropagation()
    let work = {
        todo: input.value,
        id: Date.now(),
        done: false,
        class: false
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

          <input type="task" class="task"
            value="${item.todo}" 
            readonly
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
    e.stopImmediatePropagation()
    if(!e.target.matches(".todocheck"))return
    const el = e.target
    const index = el.dataset.index
    arr[index].done = !arr[index].done
    if(arr[index].done){
        el.nextElementSibling.classList.add("line")
    } else {
        el.nextElementSibling.classList.remove("line")
    }
    
    localStorage.setItem("user", JSON.stringify(arr))
    
    display(arr, todos)
}

function edit(e) {
    if(!e.target.matches(".edit"))return
    const el = e.target
    const index = el.dataset.index
    let value
    if(el.matches(".edit")) {
        if( el.previousElementSibling.readonly == true) {
            el.previousElementSibling.removeAttribute("readonly")
            el.previousElementSibling.readonly = false
            el.src = "https://iconarchive.com/download/i98133/flat-icons.com/square/save.ico"
        } else {
            el.previousElementSibling.setAttribute("readonly", "readonly")
            el.previousElementSibling.readonly = true
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
       reFresh()
       display(arr, todos)
   }
}

function selectedValue(e) {
    e.stopImmediatePropagation()
    let active = []
    let completed = []
    const value = Array.from(options)
                 .filter(option => option.selected)
                 .map(option => option.value)
    
    if(value[0] === 'all') display(arr, todos)
    else if ( value[0] === "active") {
         active = arr.filter(item => item.done !== true)
         display(active, todos)
    } else if(value[0] === "completed") {
        completed = arr.filter(item => item.done !== false)
        display(completed, todos)
    }

}

function Clear(e) {
    e.stopImmediatePropagation()
    let comfirm = prompt("Are your sure ? All Items will be deleted")
    if(comfirm === "null" || comfirm === "no") return
    else if (comfirm === "" || comfirm === "yes") {

        localStorage.clear()
        arr.length = 0
        todos.innerHTML = ""
    }
}

function toggleTheme(e) {
    e.stopImmediatePropagation()
    if(!e.target.matches(".sun-icon"))return
    let todo = document.querySelectorAll(".todo")
    let text = body.querySelectorAll(".task")
    if( imgEl.src == sun) {
        imgEl.src = moon
        body.classList.add("light")
        selected.classList.add("white")
        clear.classList.add("white")
        inputBox.classList.add("white")
        input.classList.add("white")
        todo.forEach(item => {
            item.classList.add("white")
        })
        text.forEach(item => {
            item.classList.add("white")
        })
        localStorage.setItem("theme", "light")
    } else if(imgEl.src == moon) {
            imgEl.src = sun
            body.classList.remove("light")
            selected.classList.remove("white")
            clear.classList.remove("white")
            input.classList.remove("white")
            inputBox.classList.remove("white")
            todo.forEach(item => {
                item.classList.remove("white")
            })
            text.forEach(item => {
                item.classList.remove("white")
            })
            localStorage.setItem("theme", "dark")
     }
    
}

input.addEventListener("keyup", e => {
    e.stopImmediatePropagation()
    if(e.keyCode === 13) {
        button.click()
    }
})























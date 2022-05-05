








// - Filter by all/active/complete todos
// - Clear all completed todos
// - Toggle light and dark mode
// - **Bonus**: Drag and drop to reorder items on the listBonus: Build this project as a full-stack application


const input = document.querySelector(".create-todo")
const button = document.querySelector("button")
const todos = document.querySelector(".todos")
let arr = JSON.parse(localStorage.getItem('user')) || []


button.addEventListener("click", addItem)
todos.addEventListener("click", del)
todos.addEventListener("click", edit)
todos.addEventListener("click",  toggleDone)
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
    console.log("Hello I'm from the toggleDone")
    if(!e.target.matches(".todocheck"))return
    const el = e.target
    const index = el.dataset.index
    arr[index].done = !arr[index].done
    arr[index].done ? el.nextElementSibling.style.textDecoration ='line-through' : ""

    localStorage.setItem("user", JSON.stringify(arr))
    display(arr, todos)
   
}

function edit(e) {
    e.stopPropagation()
    console.log("Hello I'm from the edit event")
    if(!e.target.matches(".edit"))return
    const el = e.target
    const index =  el.dataset.index
    const value =  el.previousElementSibling.value
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
            changeValue(value, index)
        }
    }
}

function changeValue(value, index){
    console.log("Hello on change input function")
    arr[index].todo = value
    localStorage.setItem("user", JSON.stringify(arr))
}

function del(e){
    e.stopPropagation()
    if(!e.target.matches(".trash")) return
   let el = e.target
   console.log("Hello I'm from delete event")
   const Id = el.id
   if(el.matches(".trash")){
       el.parentNode.parentNode.removeChild(el.parentNode)
        arr = arr.filter( item => item.id != Id)
       localStorage.setItem("user", JSON.stringify(arr))
       display(arr, todos)
   }
}

input.addEventListener("keyup", e => {
    e.stopPropagation()
    console.log("Hello I'm from the keyup event")
    if(e.keyCode === 13) {
        button.click()
    }
})

























var todo = {
  
  data : [],        // todo list
  hAdd : null,      //  add item 
  hTemplate : null, // item row template
  hList : null,     
  init : () => {
    
    if (localStorage.todo == undefined) { localStorage.todo = "[]"; }

    todo.data = JSON.parse(localStorage.todo);

    todo.hAdd = document.getElementById("todo-item");
    todo.hTemplate = document.getElementById("todo-template").content;
    todo.hList = document.getElementById("todo-list");

   document.getElementById("todo-add").onsubmit = todo.add;

   
    todo.draw();
  },

  
  draw : () => {
   
    todo.hList.innerHTML = "";

    //LOOP & GENERATE ROWS
    if (todo.data.length>0) { for (let id in todo.data) {
      let row = todo.hTemplate.cloneNode(true),
          edit = row.querySelector(".todo-edit"),
          item = row.querySelector(".todo-item");
      item.value = todo.data[id][0];
      item.id = "item" + id;
      edit.id = "edit" + id;
      edit.onclick = () => todo.edit(id);
      row.querySelector(".todo-done").onclick = () => todo.toggle(id);
      row.querySelector(".todo-del").onclick = () => todo.del(id);
      if (todo.data[id][1]) { row.querySelector(".todo-item").classList.add("todo-ok"); }
      todo.hList.appendChild(row);
    }}
  },

  
  save: () => {
    localStorage.todo = JSON.stringify(todo.data);
    todo.draw();
  },

  //Add new item to the list
  add : () => {
    todo.data.push([todo.hAdd.value, false]);
    todo.hAdd.value = "";
    todo.save();
    return false;
  },

   edit : id => {
   
    let edit = document.getElementById("edit" + id),
        item = document.getElementById("item" + id);

    if (item.disabled) {
      item.classList.add("editing");
      item.disabled = false;
      item.select();
      edit.value = "\u270F";
    }

    else {
      item.classList.remove("editing");
      item.disabled = true;
      edit.value = "\u270E";
      todo.data[id][0] = item.value;
      todo.save();
    }
  },

  //update item
  toggle: id => {
    todo.data[id][1] = !todo.data[id][1];
    todo.save();
  },

  //delete item
  del: id => { if (confirm("Delete task?")) {
    todo.data.splice(id, 1);
    todo.save();
  }}
};

window.addEventListener("load", todo.init);
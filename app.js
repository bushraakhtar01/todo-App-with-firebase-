var list = document.getElementById("list");

var ref = firebase.database().ref("todo");

ref.on('child_added', function(data) {

    var li = document.createElement("li");
  var liText = document.createTextNode(data.val().task);
  li.appendChild(liText);
  list.appendChild(li)
  console.log(data.val())


 

  // Delete Button
  var delBtn = document.createElement("button");
  var delText = document.createTextNode("Delete");
  delBtn.setAttribute("class","btn");
  delBtn.setAttribute("id",data.val().key)
  delBtn.setAttribute("onclick","delItem(this)");
  delBtn.appendChild(delText);
  li.appendChild(delBtn);
  list.appendChild(li)


   //Edit Button
   var editBtn = document.createElement("button");
   var editText = document.createTextNode("Edit");
   editBtn.appendChild(editText);
   editBtn.setAttribute("class","btn1");
 editBtn.setAttribute("id",data.val().key)
editBtn.setAttribute("onclick","editItem(this)");
   li.appendChild(editBtn);
   list.appendChild(li);
  //  todoItem.value = "";
  list.appendChild(li)


 });


// var a=firebase.database().ref('todo').on('child_added',function(data){

//   data.forEach( console.log(data.val())
//   var li = document.createElement("li");
//   var liText = document.createTextNode(todoItem.value);
//   li.appendChild(liText);
//   )
// })

function addTodo(){
  //Add item
  var todoItem = document.getElementById("todo-item");
  // var li = document.createElement("li");
var database=firebase.database().ref('todo')
var key=database.push().key

  // var liText = document.createTextNode(todoItem.value);
  // li.appendChild(liText);

var todo={
  task : todoItem.value,
  key:key
  
}


database.child(key).set(todo)
todoItem.value=""



}

function delItem(k){
firebase.database().ref('todo').child(k.id).remove()

k.parentNode.remove()
}

function delAll(){
  list.innerHTML = "";
firebase.database().ref('todo').remove()
  
}

function editItem(e){
  var val = e.parentNode.firstChild.nodeValue ;
  var editValue = prompt("Enter edit value", val);

  var editTodo={
    task: editValue,
    key:e.id
  }
firebase.database().ref('todo').child(e.id).set(editTodo)

  e.parentNode.firstChild.nodeValue = editValue ;
}
const Todo=require('./todo.js');

class User {
  constructor(userName) {
    this.userName=userName;
    this.todos={};
  }
  getUserName(){
    return this.userName;
  }
  addTodo(title,description){
    let newTodo=new Todo(title,description);
    this.todos[title] = newTodo;
    return newTodo;
  }
  load(todos){
    todos.map((todo)=>{
      let addedTodo = this.addTodo(todo.title,todo.description);
      addedTodo.loadItems(todoItems);
    });
  }
  getTodo(title) {
    return this.todos[title];
  }
  getTitle(todoId) {
    return this.getTodo(todoId).getTitle();
  }
  getDescription(todoId) {
    return this.getTodo(todoId).getDescription();
  }
  deleteTodo(todoId) {
    delete this.todos[todoId];
  }
  editTitle(todoId,newTitle) {
    let oldTodo = this.getTodo(todoId);
    this.addTodo(newTitle,oldTodo.description);
    this.deleteTodo(todoId);
  }
  editDescription(todoId,newDescription) {
    this.getTodo(todoId).editDescription(newDescription);
  }
  addTodoItem(todoId,newTodoItem) {
    let todo=this.getTodo(todoId);
    todo.addTodoItem(newTodoItem);
  }
  getTodoItem(todoId,itemId) {
    let todo=this.getTodo(todoId);
    return todo.getTodoItem(itemId);
  }
  deleteTodoItem(todoId,itemId) {
    let todo=this.getTodo(todoId);
    todo.deleteTodoItem(itemId);
  }
  editTodoItem(todoId,itemId,editedTodoItem) {
    let todo=this.getTodo(todoId);
    todo.editTodoItem(itemId,editedTodoItem);
  }
  markAsDone(todoId,itemId) {
    let todo=this.getTodo(todoId);
    todo.markAsDone(itemId);
  }
  markAsUndone(todoId,itemId) {
    let todo=this.getTodo(todoId);
    todo.markAsUndone(itemId);
  }
  isDone(todoId,itemId) {
    let todo=this.getTodo(todoId);
    return todo.isDone(itemId);
  }
}
module.exports=User;

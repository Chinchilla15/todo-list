export default function Project(name){
    this.name = name;
    this.projectToDos = [];
};

Project.prototype.addTodo = function(todo){
    this.projectToDos.push(todo);
};
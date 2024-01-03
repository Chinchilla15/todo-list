import ToDo from "./todos";
import Project from "./projects";

function createTodo(title, project, dueDate, priority, info){
    return new ToDo(title, project, dueDate, priority, info);
}

function createProject(name){
    return new Project(name)
}

function addTodoToProject(todo, project){
    project.addTodo(todo)
}

export {createTodo, createProject, addTodoToProject}
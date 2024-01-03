import { createProject, createTodo, addTodoToProject } from "./modules/logic";

const schoolProject = createProject("School");

const newTodo = createTodo("Do Homework", "School", "05-01-24", "low", "math homework");
const newTodo1 = createTodo("Study for Exam", "School", "05-01-25", "medium", "history exam");

addTodoToProject(newTodo, schoolProject);
addTodoToProject(newTodo1, schoolProject);

console.log(schoolProject);

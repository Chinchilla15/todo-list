import { createProject, createTodo, projectList } from "./modules/logic";

const schoolProject = createProject("School");
const carProject = createProject("Car")

const newTodo = createTodo("Do Homework", "School", "05-01-24", "low", "math homework");
const newTodo1 = createTodo("Study for Exam", "School", "05-01-25", "medium", "history exam");
const schoolTodo = createTodo("Test","School","05-01-25", "important", "science exam")

const hometodo = createTodo("Do Homework", "Home", "05-01-24", "low", "math homework")

const code = createTodo("Create a todo app", "Programming", "15-01-24", "Important", "Project from TOP")

const none = createTodo("No project", "", "Sometime", "meh", "test")

const carTodo = createTodo("Repair car", "Car", "08-02-24", "High", "Use new oil")

console.log(projectList)
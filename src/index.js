import Dom from "./modules/dom";
import { Create, Edit, Delete, projectList } from "./modules/logic";
import {format} from 'date-fns'

// Create factory manager
const dom = Dom()
const createManager = Create();
const editManager = Edit();
const deleteManager = Delete();
/*
// Create tasks and projects
const task1 = createManager.createTodo("Do Homework", "School", "05-01-24", "low", "math homework");
const task2 = createManager.createTodo("Study for Exam", "School", "2024-01-17", "medium", "history exam");

const workProject = createManager.createProject("Work");
const task3 = createManager.createTodo("Prepare Presentation", "Work", "05-02-01", "high", "important meeting");

console.log("Initial project list:");
console.log(projectList);

// Edit task and project
const updatedTask2 = editManager.editTodo(task2, { priority: "high", info: "more details" });
console.log("Task after editing:");
console.log(updatedTask2);

const updatedWorkProject = editManager.editProject(workProject, { description: "Updated project description" });
console.log("Project after editing:");
console.log(updatedWorkProject);

deleteManager.deleteProject(workProject);
deleteManager.deleteTodo(task1)

console.log("Project list after deleting task and project:");
console.log( projectList);
*/

const task1 = createManager.createTodo('Test', 'Project', new Date(), 'high', 'details')

dom.showTasks();
dom.showProjects();
dom.renderHomeTab();
dom.renderTodayTab();
dom.renderImportantTab();
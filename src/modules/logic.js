import ToDo from "./todos";
import Project from "./projects";

const projectList = [];

function createTodo(title, project, dueDate, priority, info){
    let existingProject = projectList.find(p => p.name === project);

    if(!existingProject){
        existingProject = createProject(project);
    }

    const newTodo = new ToDo(title, project, dueDate, priority, info);
    existingProject.addTodo(newTodo);

    return newTodo;
}

function createProject(name){
    const newProject =  new Project(name)
    projectList.push(newProject);
    return newProject;
}

export {createTodo, createProject, projectList}
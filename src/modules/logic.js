import ToDo from "./todos";
import Project from "./projects";
import {format} from 'date-fns'

const projectList = [];
const standAloneTasks = []

function Create(){

    function createTodo(title, project, dueDate, priority){
        
        if (!project) {
            const newTodo = new ToDo(title, null, format(new Date(dueDate), 'MM/dd/yyyy'), priority);
            standAloneTasks.push(newTodo);
            return newTodo;
        }
    
        let existingProject = projectList.find(p => p.name === project);
    
        const newTodo = new ToDo(title, existingProject, format(new Date(dueDate), 'MM/dd/yyyy'), priority);
        existingProject.addTodo(newTodo);
    
        return newTodo;
    };

    function createProject(name){
        const newProject =  new Project(name);
        projectList.push(newProject);
        return newProject;
    };

    return{createTodo, createProject};
};

function Edit(){
    function editTodo(todo, updatedInfo) {
        Object.assign(todo, updatedInfo);
        return todo;
      };
    
      function editProject(project, updatedInfo) {
        Object.assign(project, updatedInfo);
        return project;
      };
    
      return { editTodo, editProject };
}

function Delete(){
    function deleteTodo(todo){
        const standAloneIndex = standAloneTasks.indexOf(todo);
        if (standAloneIndex !== -1) {
            standAloneTasks.splice(standAloneIndex, 1);
        }
        projectList.forEach(project => {
            const index = project.projectToDos.indexOf(todo);
            if (index !== -1) {
                project.projectToDos.splice(index, 1);
            };
        });
    };

    function deleteProject(project){
        const projectIndex = projectList.indexOf(project);
        if(projectIndex !== -1){
            projectList.splice(projectIndex,1);
        };
    };

    return {deleteTodo, deleteProject};
};

export {Create, Edit, Delete, projectList, standAloneTasks};
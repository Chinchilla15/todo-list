import ToDo from "./todos";
import Project from "./projects";

const projectList = [];
const standAloneTasks = [];

function Create(){

    function createTodo(title, project, dueDate, priority){
        
        if (!project) {
            const newTodo = new ToDo(title, null, dueDate, priority);
            standAloneTasks.push(newTodo);
            return newTodo;
        };

        let existingProject = projectList.find(p => p.name === project);

        const newTodo = new ToDo(title, existingProject, dueDate, priority);
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
    function editItem(item, updatedInfo) {
        Object.assign(item, updatedInfo);
        return item;
    }

    return { editItem };
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
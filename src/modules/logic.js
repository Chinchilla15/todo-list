import ToDo from "./todos";
import Project from "./projects";

const projectList = [];

function Create(){

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

    return{createTodo, createProject}
}

function Edit(){
    function editTodo(todo, updatedInfo) {
        Object.assign(todo, updatedInfo);
        return todo;
      }
    
      function editProject(project, updatedInfo) {
        Object.assign(project, updatedInfo);
        return project;
      }
    
      return { editTodo, editProject };
}

function Delete(){
    function deleteTodo(todo){
        projectList.forEach(project => {
      const index = project.projectToDos.indexOf(todo);
      if (index !== -1) {
        project.projectToDos.splice(index, 1);
      }
    });
    }

    function deleteProject(project){
        const projectIndex = projectList.indexOf(project);
        if(projectIndex !== -1){
            projectList.splice(projectIndex,1);
        }
    }

    return {deleteTodo, deleteProject}
}

export {Create, Edit, Delete, projectList}
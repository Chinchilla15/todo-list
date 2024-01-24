import { standAloneTasks } from "./logic";
import { projectList } from "./projects";

function saveToLocalStorage() {
    const projectsToSave = projectList.map(project => ({
        name: project.name,
        projectToDos: project.projectToDos.map(todo => ({
            title: todo.title,
            dueDate: todo.dueDate,
            priority: todo.priority,
            completed: todo.completed,
        })),
    }));
    localStorage.setItem('projects', JSON.stringify(projectsToSave));
    localStorage.setItem('standAloneTasks', JSON.stringify(standAloneTasks));
};

export {saveToLocalStorage};
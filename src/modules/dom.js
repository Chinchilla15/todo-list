import Project from "./projects";
import ToDo from "./todos";
import { Create, Edit, Delete, projectList } from "./logic";

const create = Create();
const edit = Edit();
const remove = Delete();


export default function Dom(){

    const mainContainer = document.querySelector('main');
    const tabs = document.querySelectorAll('button');
    const homeButton = document.getElementById('home-button');
    const tabTitle = document.querySelector('.tab-title');
    const taskContainer = document.getElementById('task-container'); // Added reference to the task container


    homeButton.addEventListener('click',()=>{
        console.log('Home button clicked');
        //mainContainer.innerHTML = "";
        showTasks();
    });

    /**
     * Dialog Funcionality
     */
    const formDialog = document.getElementById("formDialog")
    const showButton = document.getElementById("add-button")
    const cancelButton = document.getElementById("cancel-button")
    
    showButton.addEventListener("click",() =>{
        formDialog.showModal();
        document.body.style.filter = 'blur(4px)'
    })

    cancelButton.addEventListener("click",(e)=>{
        e.preventDefault();
        document.getElementById('add-form').reset();
        formDialog.close();
        document.body.style.filter = 'none'
    })

    /**Add task function */

    function addTaskToHome(){
        const newTask = create.createTodo(title, project, dueDate, priority, info);

        // Append the new task to the task container
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-box');
        taskElement.innerHTML = `
        <i class="fa-regular fa-square fa-xl"></i>
        <p class="task-name">${newTask.title}</p>
        <p class="task-date">${newTask.dueDate}</p>
        <i class="fa-solid fa-pen-to-square fa-lg"></i>
        <i class="fa-solid fa-trash fa-lg"></i>
    `;

    taskContainer.appendChild(taskElement);
    };

     // Helper function to show tasks on the home page
  function showTasks() {
    taskContainer.innerHTML = ""; // Clear existing tasks

    // Iterate through projects and tasks to display them
    projectList.forEach(project => {
      project.projectToDos.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-box');
        taskElement.innerHTML = `
          <i class="fa-regular fa-square fa-xl"></i>
          <p class="task-name">${task.title}</p>
          <p class="task-date">${task.dueDate}</p>
          <i class="fa-solid fa-pen-to-square fa-lg"></i>
          <i class="fa-solid fa-trash fa-lg"></i>
        `;
        taskContainer.appendChild(taskElement);
      });
    });
  };

   // Event listener for the form submission
   const submitButton = document.getElementById("submit-button");
   submitButton.addEventListener("click", (e) => {
     e.preventDefault();
 
     const title = document.getElementById("title").value;
     const priority = document.getElementById("priority").value;
     const description = document.getElementById("description").value;
     const dueDate = document.getElementById("date").value;
 
     // Assuming "Home" as the default project for now
     addTaskToHome(title, "Home", dueDate, priority, description);
 
     document.getElementById('add-form').reset();
     formDialog.close();
     document.body.style.filter = 'none';
   });

};
import Project from "./projects"; //Remove
import ToDo from "./todos"; //Remove
import { Create, Edit, Delete, projectList } from "./logic";

const create = Create();
const edit = Edit();
const remove = Delete();

export default function Dom(){

    const mainContainer = document.querySelector('main');
    const homeButton = document.getElementById('home-button');
    const todayButton = document.getElementById('today-button');
    const importantButton = document.getElementById('important-button');
    const projectsButton = document.getElementById('projects-button');
    const tabTitle = document.querySelector('.tab-title');
    const taskContainer = document.getElementById('task-container');
    const submitButton = document.getElementById('submit-button')

    const dialogTaskButton = document.getElementById('dialog-task');
    const dialogProjectButton = document.getElementById('dialog-project');

    //Forms
    const taskForm = document.getElementById('add-task-form');
    const projectForm = document.getElementById('add-project-form');

    homeButton.addEventListener('click',()=>{
        taskContainer.innerHTML = ''
        showTasks();
    });
    

    /**
     * Dialog Funcionality
     */
    const formDialog = document.getElementById("formDialog");   
    const showButton = document.getElementById("add-button");
    const cancelButton = document.getElementById("cancel-button");

    showButton.addEventListener("click",() =>{
        formDialog.showModal();
        setActiveButton(dialogTaskButton);
        document.body.style.filter = 'blur(4px)';
        taskForm.style.display = "block"
        projectForm.style.display = "none"
        submitButton.setAttribute('form','add-task-form')
    })

    cancelButton.addEventListener("click",(e)=>{
        e.preventDefault();
        taskForm.reset();
        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none';
    })

    /**Add task function */

    function addTaskToHome(title, project, dueDate, priority, info){
        const newTask = create.createTodo(title, project, dueDate, priority, info);

        const taskElement = document.createElement('li');
        taskElement.classList.add('task-box');
        taskElement.setAttribute('data-priority', priority);
        taskElement.innerHTML = `
        <i class="fa-regular fa-square fa-xl"></i>
        <p class="task-name">${newTask.title}</p>
        <p class="task-date">${newTask.dueDate}</p>
        <i class="fa-solid fa-pen-to-square fa-lg"></i>
        <i class="fa-solid fa-trash fa-lg"></i>
        <i class="fa-solid fa-circle-info fa-lg"></i>`;
        

    taskContainer.appendChild(taskElement);
    };

     
  function showTasks() {
    taskContainer.innerHTML = ""; 

    projectList.forEach(project => {
      project.projectToDos.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-box');
        taskElement.setAttribute('data-priority', task.priority);
        taskElement.innerHTML = `
          <i class="fa-regular fa-square fa-xl"></i>
          <p class="task-name">${task.title}</p>
          <p class="task-date">${task.dueDate}</p>
          <i class="fa-solid fa-pen-to-square fa-lg"></i>
          <i class="fa-solid fa-trash fa-lg"></i>
          <i class="fa-solid fa-circle-info fa-lg"></i>`;

        taskContainer.appendChild(taskElement);
      });
    });
  };

    //Active button functionality
    const activeButtonClass = "active-button";

    function setActiveButton(button) {
    document.querySelectorAll('.dialog-button').forEach((btn) => {
    btn.classList.remove(activeButtonClass);
    });
    button.classList.add(activeButtonClass);
    };

    // Task Dialog
    dialogTaskButton.addEventListener('click',()=>{
        setActiveButton(dialogTaskButton);
        taskForm.style.display = "block";
        projectForm.style.display = "none"
        submitButton.setAttribute('form','add-task-form')
    })

   // Event listener for the task form submission
   taskForm.addEventListener("submit", function(e) {
     e.preventDefault();
 
     const title = document.getElementById("title").value;
     const priority = document.getElementById("priority").value;
     const description = document.getElementById("description").value;
     const dueDate = document.getElementById("date").value;
     const project = undefined;    
 
     addTaskToHome(title, project, dueDate, priority, description);
 
     taskForm.reset();
     formDialog.close();
     document.body.style.filter = 'none';
   });


   //Project dialog functionality here
   dialogProjectButton.addEventListener('click',(e)=>{
        setActiveButton(dialogProjectButton);
        taskForm.style.display = "none";
        projectForm.style.display = "block"
        submitButton.removeAttribute('form','add-task-form')
        submitButton.setAttribute('form','add-project-form')
   });

   projectForm.addEventListener("submit",function(e){
        e.preventDefault();
    
        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none'
   })

   showTasks();

};
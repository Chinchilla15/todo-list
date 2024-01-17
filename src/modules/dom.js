import { format, isToday,} from 'date-fns';
import { Create, Edit, Delete, projectList } from "./logic";

const create = Create();
const edit = Edit();
const remove = Delete();
console.log(projectList)

export default function Dom(){

    const mainContainer = document.querySelector('main');
    const homeButton = document.getElementById('home-button');
    const todayButton = document.getElementById('today-button');
    const importantButton = document.getElementById('important-button');
    const tabTitle = document.querySelector('.tab-title');
    const taskContainer = document.getElementById('task-container');
    const projectsContainer = document.querySelector('.projects-list')
    const submitButton = document.getElementById('submit-button')

    const dialogTaskButton = document.getElementById('dialog-task');
    const dialogProjectButton = document.getElementById('dialog-project');

    //Forms
    const taskForm = document.getElementById('add-task-form');
    const projectForm = document.getElementById('add-project-form');

    function renderHomeTab(){
        homeButton.addEventListener('click',()=>{
            tabTitle.innerHTML = 'Home'
            taskContainer.innerHTML = ''
            showButton.style.display = "block"
            showTasks();
        });
    }
    
    function renderTodayTab(){
        todayButton.addEventListener('click',()=>{
            showButton.style.display = "none";
            taskContainer.innerHTML = ''
            tabTitle.innerHTML = 'Today'

           showTasks({
            dueDate: format(new Date(), 'MM/dd/yyyy')
           })
        })
    }

    function renderImportantTab(){
        importantButton.addEventListener('click',()=>{
            showButton.style.display = "none";
            taskContainer.innerHTML = '';
            tabTitle.innerHTML = 'Important'
            showTasks({
                priority: 'high'
            })
        })
    }

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

    /**Add projects function */

    function addProjectsToList(name){
        const newProject =create.createProject(name);

        const projectElement = document.createElement('li');
        projectElement.classList.add('p-list-element');
        projectElement.innerHTML = `
        <i class="fa-solid fa-clipboard"></i> 
        ${newProject.name}`

        projectsContainer.appendChild(projectElement);
    }

     
  function showTasks(filters = {}) {

    projectList.forEach(project => {
      project.projectToDos.forEach(task => {

        const isHighPriority = filters.priority === 'high' && task.priority === 'high'
        const istaskToday = isToday(task.dueDate);

        if(Object.keys(filters).length === 0 || isHighPriority || (istaskToday && filters.dueDate === task.dueDate)){
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
        }

      });
    });
  };

  function showProjects(){
    projectList.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.classList.add('p-list-element');
        projectElement.innerHTML = `
            <i class="fa-solid fa-clipboard"></i> 
            ${project.name}`;

        projectsContainer.appendChild(projectElement);
    });
  }

    //Active button functionality
    const activeButtonClass = "active-button";

    function setActiveButton(button) {
    document.querySelectorAll('.dialog-button').forEach((btn) => {
    btn.classList.remove(activeButtonClass);
    });
    button.classList.add(activeButtonClass);
    };

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

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
 
     const titleInput = document.getElementById("title");
     const title = capitalizeFirstLetter(titleInput.value)
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

        const nameInput = document.getElementById('project-name');
        const projectName = capitalizeFirstLetter(nameInput.value);

        addProjectsToList(projectName);

        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none'
   })


   return {showTasks, showProjects,renderHomeTab, renderTodayTab, renderImportantTab}
};
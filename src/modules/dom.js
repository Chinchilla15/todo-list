import { format, isToday,} from 'date-fns';
import { Create, Edit, Delete, projectList, standAloneTasks } from "./logic";

const create = Create();
const edit = Edit();
const remove = Delete();
console.log(projectList);

export default function Dom(){

    const homeButton = document.getElementById('home-button');
    const todayButton = document.getElementById('today-button');
    const importantButton = document.getElementById('important-button');
    const tabTitle = document.querySelector('.tab-title');
    const taskContainer = document.getElementById('task-container');
    const projectsContainer = document.querySelector('.projects-list');
    const submitButton = document.getElementById('submit-button');

    const dialogTaskButton = document.getElementById('dialog-task');
    const dialogProjectButton = document.getElementById('dialog-project');

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('delete-project-button');

    //Forms
    const taskForm = document.getElementById('add-task-form');
    const projectForm = document.getElementById('add-project-form');

    function renderHomeTab(){
        tabTitle.innerHTML = 'Home';
        taskContainer.innerHTML = '';
        showButton.style.display = "block";
        showTasks();
        dialogProjectButton.style.display = 'block';
        setSelectedProject(null);
        console.log(standAloneTasks)
    };

    function renderTodayTab(){
        tabTitle.innerHTML = 'Today';
        taskContainer.innerHTML = '';
        showButton.style.display = "none";
    
       showTasks({
        dueDate: format(new Date(), 'MM/dd/yyyy')
       });
    };

    function renderImportantTab(){
        tabTitle.innerHTML = 'Important';
        taskContainer.innerHTML = '';
        showButton.style.display = "none";
        showTasks({
            priority: 'high'
        });
    };
    
    homeButton.addEventListener('click',()=>{
      renderHomeTab();
    });    
    
    todayButton.addEventListener('click',()=>{
       renderTodayTab();
    });
    
    importantButton.addEventListener('click',()=>{
        renderImportantTab();
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
        taskForm.style.display = "block";
        projectForm.style.display = "none";
        submitButton.setAttribute('form','add-task-form');
    });

    cancelButton.addEventListener("click",(e)=>{
        e.preventDefault();
        taskForm.reset();
        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none';
    });

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
    };

    // Task Dialog
    dialogTaskButton.addEventListener('click',()=>{
        setActiveButton(dialogTaskButton);
        taskForm.style.display = "block";
        projectForm.style.display = "none";
        submitButton.setAttribute('form','add-task-form');
    });

    //Project dialog
   dialogProjectButton.addEventListener('click',(e)=>{
        setActiveButton(dialogProjectButton);
        taskForm.style.display = "none";
        projectForm.style.display = "block";
        dialogTaskButton.classList.add('dialog-button');
        dialogTaskButton.classList.remove('active-button');
        submitButton.removeAttribute('form','add-task-form');
        submitButton.setAttribute('form','add-project-form');
    });

/**Add projects function */
    function addProjectsToList(name){
        const newProject =create.createProject(name);

        const projectElement = document.createElement('li');
        projectElement.classList.add('p-list-element');
        projectElement.innerHTML = `
        <i class="fa-solid fa-clipboard"></i> 
        ${newProject.name}`

        projectsContainer.appendChild(projectElement);
        projectsContainer.innerHTML = ''
        showProjectsList();
    };

    //Function to set the selected project
    let selectedProject = null;

    function setSelectedProject(project) {
        selectedProject = project;
    };

  //Event listener for project form submission
    projectForm.addEventListener("submit",function(e){
        e.preventDefault();

        const nameInput = document.getElementById('project-name');
        const projectName = capitalizeFirstLetter(nameInput.value);

        addProjectsToList(projectName);

        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none';
    });

//Render Project Tab
    function renderProjectTab(project){
        deleteProjectButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        tabTitle.innerHTML = project.name;
        tabTitle.appendChild(deleteProjectButton);
        showButton.style.display = "block";
        dialogProjectButton.style.display = "none";
        dialogTaskButton.classList.remove('dialog-button')
        taskContainer.innerHTML = ''
        
        setSelectedProject(project);

        console.log(selectedProject)
        
        showProjectsTasks(project.name);
    };

 /**Add task function */
    function addTaskToHome(title, project, dueDate, priority){
        const newTask = create.createTodo(title, project, dueDate, priority);

       renderTasks(newTask);
    };

 // Event listener for the task form submission
    taskForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const titleInput = document.getElementById("title");
        const title = capitalizeFirstLetter(titleInput.value)
        const priority = document.getElementById("priority").value;
        const dueDate = document.getElementById("date").value;
        const project = undefined;    

        if (selectedProject) {
            addTaskToProject(title, dueDate, priority);
        } else {
            addTaskToHome(title, project, dueDate, priority);
        }

        taskForm.reset();
        formDialog.close();
        document.body.style.filter = 'none';
    });

     // Function to add task to the selected project
     function addTaskToProject(title, dueDate, priority) {
        if (selectedProject) {
            const newTask = create.createTodo(title, selectedProject.name, dueDate, priority);
            renderTasks(newTask);
        };
    };

    function renderTasks(task){
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
    };

    function showTasks(filters = {}) {
        projectList.forEach(project => {
            project.projectToDos.forEach(task => {
                const isHighPriority = filters.priority === 'high' && task.priority === 'high';
                const istaskToday = isToday(task.dueDate);

                if(Object.keys(filters).length === 0 || isHighPriority || (istaskToday && filters.dueDate === task.dueDate)){
                    renderTasks(task);
                };
            });
        });
        standAloneTasks.forEach(task => {
            const isHighPriority = filters.priority === 'high' && task.priority === 'high';
            const istaskToday = isToday(task.dueDate);
    
            if (Object.keys(filters).length === 0 || isHighPriority || (istaskToday && filters.dueDate === task.dueDate)) {
                renderTasks(task);
            };
        });
    };

    function showProjectsTasks(projectName) {
        const selectedProject = projectList.find(project => project.name === projectName);
        if (selectedProject) {
            selectedProject.projectToDos.forEach(task => {
                renderTasks(task);
            });
        };
    };


  function showProjectsList(){
    projectList.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.classList.add('p-list-element');
        projectElement.innerHTML = `
            <i class="fa-solid fa-clipboard"></i> 
            ${project.name}`;

            projectElement.addEventListener('click',()=>{
                renderProjectTab(project);
            }); 

        projectsContainer.appendChild(projectElement);
    });
  };

  function removeProject(){
    if(selectedProject){
        remove.deleteProject(selectedProject);
    }else{
        console.log('No project selected');
    };
  };

  deleteProjectButton.addEventListener('click',()=>{
    console.log('delete button clicked');
    removeProject();
    renderHomeTab();
    projectsContainer.innerHTML = '';
    showProjectsList();
  });

 // Function to remove a task
    function removeTask(taskElement) {
        const taskName = taskElement.querySelector('.task-name').textContent;

        const standAloneTaskIndex = standAloneTasks.findIndex((t) => t.title === taskName);
        if (standAloneTaskIndex !== -1) {
            const standAloneTask = standAloneTasks[standAloneTaskIndex];
            remove.deleteTodo(standAloneTask);
            standAloneTasks.splice(standAloneTaskIndex, 1);
            taskElement.remove(); 
            console.log(`removing stand-alone task: ${standAloneTask.title}`);
            return;
        }

        for (const project of projectList) {
            const projectTaskIndex = project.projectToDos.findIndex((t) => t.title === taskName);
            if (projectTaskIndex !== -1) {
                const projectTask = project.projectToDos[projectTaskIndex];
                remove.deleteTodo(projectTask);
                project.projectToDos.splice(projectTaskIndex, 1);
                taskElement.remove();
                console.log(`removing project task: ${projectTask.title}`);
                return;
            }
        }
        taskContainer.innerHTML = '';
        showTasks();
    };

    taskContainer.addEventListener('click', (e) => {
        const trashIcon = e.target.closest('.fa-trash');
        const squareIcon = e.target.closest('.fa-square');
        const squareIconChecked = e.target.closest('.fa-square-check')

        if (trashIcon) {
            const taskElement = trashIcon.closest('.task-box');
            removeTask(taskElement);
        }

        if(squareIcon){
            const taskElement = squareIcon.closest('.task-box');
            squareIcon.classList.toggle('fa-square-check');
            squareIcon.classList.toggle('fa-square');
            taskElement.classList.add('checked-task');
        }

        if(squareIconChecked){
            const taskElement = squareIconChecked.closest('.task-box');
            squareIconChecked.classList.toggle('fa-square');
            squareIconChecked.classList.toggle('fa-square-check');
            taskElement.classList.remove('checked-task');
        }
    });
    
  
   return {showTasks, showProjectsList,renderHomeTab, renderTodayTab, renderImportantTab};
};
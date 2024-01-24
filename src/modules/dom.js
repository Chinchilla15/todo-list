import { format, isToday,} from 'date-fns';
import { Create, Edit, Delete, standAloneTasks } from "./logic";
import { projectList } from './projects';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';

const create = Create();
const edit = Edit();
const remove = Delete();
//console.log(projectList);

export default function Dom(){

    const homeButton = document.getElementById('home-button');
    const todayButton = document.getElementById('today-button');
    const importantButton = document.getElementById('important-button');
    const tabTitle = document.querySelector('.tab-title');
    const taskContainer = document.getElementById('task-container');
    const projectsContainer = document.querySelector('.projects-list');
    const submitButton = document.getElementById('submit-button');

    const dialogTitle = document.getElementById('dialog-title');
    const dialogButtonsBox = document.querySelector('.buttons-box')
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
        //console.log(standAloneTasks)
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

    function showForm(){
        formDialog.showModal();
        setActiveButton(dialogTaskButton);
        document.body.style.filter = 'blur(4px)';
        taskForm.style.display = "block";
        projectForm.style.display = "none";
        submitButton.setAttribute('form','add-task-form');
        dialogTitle.innerHTML = 'Add new...' ;
        dialogButtonsBox.style.display = 'flex'    ;
    };

    function closeForm(e){
        e.preventDefault();
        taskForm.reset();
        projectForm.reset();
        formDialog.close();
        document.body.style.filter = 'none';
        editingTask = null;
    };

    showButton.addEventListener("click",() =>{
       showForm();
    });

    cancelButton.addEventListener("click",(e)=>{
        closeForm(e);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (formDialog.open) {
                closeForm(e);
            };
        };
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

    /// Function to open the dialog for editing an existing task
    let editingTask = null;
    function openEditDialog(task) {
        showForm();
        dialogTitle.innerHTML = 'Edit';
        dialogButtonsBox.style.display = 'none';   

        editingTask = task;

        const titleInput = document.getElementById("title");
        const priorityInput = document.getElementById("priority");
        const dateInput = document.getElementById("date");

        const formattedDate = format(new Date(task.dueDate), 'yyyy-MM-dd');
    
        titleInput.value = task.title;
        priorityInput.value = task.priority;
        dateInput.value = formattedDate;
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

        saveToLocalStorage();
    });

//Render Project Tab
    function renderProjectTab(project){
        deleteProjectButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        tabTitle.innerHTML = project.name;
        tabTitle.appendChild(deleteProjectButton);
        showButton.style.display = "block";
        dialogTitle.innerHTML = 'Add new...'
        dialogProjectButton.style.display = 'block';
        dialogProjectButton.style.display = "none";
        dialogTaskButton.classList.remove('dialog-button')
        taskContainer.innerHTML = ''
        
        setSelectedProject(project);

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

        if (editingTask) {
            edit.editItem(editingTask, { title, priority, dueDate });

            editingTask = null;

            taskContainer.innerHTML = '';
            saveToLocalStorage();
            
            if(selectedProject){
                showProjectsTasks(selectedProject.name);
            }else{
                showTasks();
            };
          
        } else if (selectedProject) {
            addTaskToProject(title, dueDate, priority);
            saveToLocalStorage();
        } else {
            addTaskToHome(title, project, dueDate, priority);
            saveToLocalStorage();
        };

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

    function renderTasks(task, isEdited = false){
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-box');
        let checkBox = '';
        if(task.completed === true){
            checkBox = '<i class="fa-regular fa-square-check fa-xl"></i>';
            taskElement.classList.toggle('checked-task');
        }else if(task.completed === false){
            checkBox = '<i class="fa-regular fa-square fa-xl"></i>';
        };

        taskElement.setAttribute('data-priority', task.priority);
        const formattedDate = format(new Date(task.dueDate), 'MM/dd/yyyy')
        taskElement.innerHTML = `
           ${checkBox}
            <p class="task-name">${task.title}</p>
            <p class="task-date">${formattedDate}</p>
            <i class="fa-solid fa-pen-to-square fa-lg"></i>
            <i class="fa-solid fa-trash fa-lg"></i>`;

        taskContainer.appendChild(taskElement);

        if (isEdited) {
            const previousTaskElement = taskContainer.querySelector(`[data-priority="${task.priority}"]`);
            if (previousTaskElement) {
                previousTaskElement.remove();
            };
        };
    };

    function showTasks(filters = {}) {
        projectList.forEach(project => {
            project.projectToDos.forEach(task => {
                const isHighPriority = filters.priority === 'high' && task.priority === 'high';
                const formattedDate = format(new Date(task.dueDate), 'MM/dd/yyyy');
                const istaskToday = isToday(formattedDate);

                if(Object.keys(filters).length === 0 || isHighPriority || (istaskToday && filters.dueDate === formattedDate)){
                    renderTasks(task);
                };
            });
        });
        standAloneTasks.forEach(task => {
            const isHighPriority = filters.priority === 'high' && task.priority === 'high';
            const formattedDate = format(new Date(task.dueDate), 'MM/dd/yyyy');
            const istaskToday = isToday(formattedDate);
    
            if (Object.keys(filters).length === 0 || isHighPriority || (istaskToday && filters.dueDate === formattedDate)) {
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
    };
   saveToLocalStorage()
  };

    deleteProjectButton.addEventListener('click',()=>{
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
            saveToLocalStorage();
            return;
        };

        for (const project of projectList) {
            const projectTaskIndex = project.projectToDos.findIndex((t) => t.title === taskName);
            if (projectTaskIndex !== -1) {
                const projectTask = project.projectToDos[projectTaskIndex];
                remove.deleteTodo(projectTask);
                project.projectToDos.splice(projectTaskIndex, 1);
                taskElement.remove();
                return;
            };
        };
        taskContainer.innerHTML = '';
        showTasks();
    };

    taskContainer.addEventListener('click', (e) => {
        const trashIcon = e.target.closest('.fa-trash');
        const squareIcon = e.target.closest('.fa-square');
        const editIcon = e.target.closest('.fa-pen-to-square');
        const squareIconChecked = e.target.closest('.fa-square-check');

        if (trashIcon) {
            const taskElement = trashIcon.closest('.task-box');
            removeTask(taskElement);
        };

        if (editIcon) {
            const taskElement = editIcon.closest('.task-box');
            const taskName = taskElement.querySelector('.task-name').textContent;
    
            const standAloneTask = standAloneTasks.find((t) => t.title === taskName);
            if (standAloneTask) {
                openEditDialog(standAloneTask);
            } else {
                for (const project of projectList) {
                    const projectTask = project.projectToDos.find((t) => t.title === taskName);
                    if (projectTask) {
                        openEditDialog(projectTask);
                        return;
                    };
                };
            };
        };

        if (squareIcon || squareIconChecked) {
            const taskElement = squareIcon ? squareIcon.closest('.task-box') : squareIconChecked.closest('.task-box');
            taskElement.classList.toggle('checked-task');
    
            const icon = taskElement.querySelector('.fa-regular');
            if (icon) {
                icon.classList.toggle('fa-square-check');
                icon.classList.toggle('fa-square');
            }
        
            // Update the completion state in the task object
            const taskName = taskElement.querySelector('.task-name').textContent;
            const task = standAloneTasks.find((t) => t.title === taskName) ||
                projectList.reduce((acc, project) => acc.concat(project.projectToDos), []).find((t) => t.title === taskName);
        
            if (task) {
                task.completed = !task.completed;
                saveToLocalStorage();
            };
        };
    });

   return {showTasks, showProjectsList,renderHomeTab, renderTodayTab, renderImportantTab};
};
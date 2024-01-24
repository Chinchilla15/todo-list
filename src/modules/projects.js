export default function Project(name){
    this.name = name;
    this.projectToDos = [];
};

Project.prototype.addTodo = function(todo){
    this.projectToDos.push(todo);
};

export let projectList = [];

if(localStorage.getItem('projects') === null){
    projectList = [
        {
        name: 'Coding',
        projectToDos:[
            {
                title:'Finish todo list project',
                project:'Coding', 
                dueDate: new Date(), 
                priority: 'high',
                completed: false,
            },
            ]
        },
        {
            name:'School',
            projectToDos:[
                {
                    title:'Do math homework', 
                    project:'School', 
                    dueDate:'02/5/2024', 
                    priority:'mid',
                    completed: false,
                }
            ]
        }
    ]
} else{
    const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
    projectList = projectsFromStorage
}
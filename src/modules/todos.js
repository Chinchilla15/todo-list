export default function ToDo(title, project, dueDate, priority, completed = false){
    this.title = title;
    this.project = project;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
};
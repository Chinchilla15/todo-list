import Dom from "./modules/dom";
import { Create} from "./modules/logic";

// Create factory manager
const dom = Dom();
const createManager = Create();

//Example tasks and projects
const project1 = createManager.createProject('Coding');
const task1 = createManager.createTodo('Finish todo list project', 'Coding', new Date(), 'high');
const project2 = createManager.createProject('School');
const task2 = createManager.createTodo('Do math homework', 'School', '02/5/2024', 'mid');

dom.showTasks();
dom.showProjectsList();
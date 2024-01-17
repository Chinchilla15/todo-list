import Dom from "./modules/dom";
import { Create, Edit, Delete, projectList } from "./modules/logic";
import {format} from 'date-fns'

// Create factory manager
const dom = Dom()
const createManager = Create();
const editManager = Edit();
const deleteManager = Delete();

const task1 = createManager.createTodo('Test', 'Project', new Date(), 'high', 'details')

dom.showTasks();
dom.renderHomeTab();
dom.renderTodayTab();
dom.renderImportantTab();
import Project from "./projects";
import ToDo from "./todos";
import { Create, Edit, Delete, projectList } from "./logic";



export default function Dom(){

    const mainContainer = document.querySelector('main');
    const tabs = document.querySelectorAll('button');
    const homeButton = document.getElementById('homeButton');
    const tabTitle = document.querySelector('.tab-title');

    homeButton.addEventListener('click',()=>{
        console.log('Home button clicked');
        //mainContainer.innerHTML = "";
    });
};
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

    /**
     * Dialog Funcionality
     */
    const formDialog = document.getElementById("formDialog")
    const showButton = document.getElementById("add-button")
    const closeButton = document.getElementById("closeButton")

    showButton.addEventListener("click",() =>{
        formDialog.showModal();
        document.body.style.filter = 'blur(4px)'
    })

    closeButton.addEventListener("click",(e)=>{
        e.preventDefault();
        document.getElementById('add-form').reset();
        formDialog.close();
    })
};
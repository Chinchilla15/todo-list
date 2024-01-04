/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logic */ \"./src/modules/logic.js\");\n\n\nconst schoolProject = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createProject)(\"School\");\nconst carProject = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createProject)(\"Car\")\n\nconst newTodo = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Do Homework\", \"School\", \"05-01-24\", \"low\", \"math homework\");\nconst newTodo1 = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Study for Exam\", \"School\", \"05-01-25\", \"medium\", \"history exam\");\nconst schoolTodo = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Test\",\"School\",\"05-01-25\", \"important\", \"science exam\")\n\nconst hometodo = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Do Homework\", \"Home\", \"05-01-24\", \"low\", \"math homework\")\n\nconst code = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Create a todo app\", \"Programming\", \"15-01-24\", \"Important\", \"Project from TOP\")\n\nconst none = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"No project\", \"\", \"Sometime\", \"meh\", \"test\")\n\nconst carTodo = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__.createTodo)(\"Repair car\", \"Car\", \"08-02-24\", \"High\", \"Use new oil\")\n\nconsole.log(_modules_logic__WEBPACK_IMPORTED_MODULE_0__.projectList)\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/logic.js":
/*!******************************!*\
  !*** ./src/modules/logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createProject: () => (/* binding */ createProject),\n/* harmony export */   createTodo: () => (/* binding */ createTodo),\n/* harmony export */   projectList: () => (/* binding */ projectList)\n/* harmony export */ });\n/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todos */ \"./src/modules/todos.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/modules/projects.js\");\n\n\n\nconst projectList = [];\n\nfunction createTodo(title, project, dueDate, priority, info){\n    let existingProject = projectList.find(p => p.name === project);\n\n    if(!existingProject){\n        existingProject = createProject(project);\n    }\n\n    const newTodo = new _todos__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title, project, dueDate, priority, info);\n    existingProject.addTodo(newTodo);\n\n    return newTodo;\n}\n\nfunction createProject(name){\n    const newProject =  new _projects__WEBPACK_IMPORTED_MODULE_1__[\"default\"](name)\n    projectList.push(newProject);\n    return newProject;\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/modules/logic.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nfunction Project(name){\n    this.name = name;\n    this.projectToDos = [];\n};\n\nProject.prototype.addTodo = function(todo){\n    this.projectToDos.push(todo);\n};\n\n//# sourceURL=webpack://todo-list/./src/modules/projects.js?");

/***/ }),

/***/ "./src/modules/todos.js":
/*!******************************!*\
  !*** ./src/modules/todos.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ToDo)\n/* harmony export */ });\nfunction ToDo(title, project, dueDate, priority, info){\n    this.title = title;\n    this.project = project;\n    this.dueDate = dueDate;\n    this.priority = priority;\n    this.info = info;\n};\n\n//# sourceURL=webpack://todo-list/./src/modules/todos.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
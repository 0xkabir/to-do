// all the task-list
const getLocalStorageTasks = () => {
    const allTasks = [];
    if(!!localStorage.getItem('tasks')){
        const tasksObj = JSON.parse(localStorage.getItem('tasks'));
        for(const task in tasksObj){
            allTasks.push(tasksObj[task]);
        }
    }
    return allTasks;
}

const displayTasks = () => {
    let taskId = 1;
    const allTasks = getLocalStorageTasks();
    const displayField = document.getElementById('display-field');
    displayField.innerHTML = ``;
    for(const task of allTasks){
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <p class="text-lg">${taskId}. ${task} </p>
            </div>
            <div>
                <button class="bg-green-500 px-5 py-2 rounded text-white font-medium" onclick="updateTask(${taskId})">Update</button>
                <button class="bg-red-500 px-5 py-2 rounded text-white font-medium" onclick="deleteTask(${taskId})">Delete</button>
            </div>
        </div>
        `;
        displayField.appendChild(taskDiv);
        taskId++;
    }
}

const addTask = () => {
    let taskId = 1;
    const taskObj = {};
    const allTasks = getLocalStorageTasks();
    const taskField = document.getElementById('task-item');
    const taskItem = taskField.value;
    taskField.value = '';
    if(allTasks.includes(taskItem)){
        alert('This task is already in the task list.');
    }
    else if(taskItem === '' || taskItem.replaceAll(' ','')===''){
        alert('Task cannot be empty');
    }
    else{
        allTasks.push(taskItem);
    }   
    for(const task of allTasks){
        taskObj[taskId] = task;
        taskId++;
    }
    localStorage.setItem('tasks', JSON.stringify(taskObj));
    displayTasks();
}

const updateTask = taskId => {
    const allTasks = getLocalStorageTasks();
    const taskObj = JSON.parse(localStorage.getItem('tasks'));
    const updatedTask = prompt('Update your task');
    const previousTask = taskObj.taskId;
    const previousTaskPosition = allTasks.indexOf(previousTask);
    if(allTasks.includes(updatedTask)){
        alert('This task is already added');
    }
    else if(updatedTask === '' || updatedTask.replaceAll(' ','')===''){
        alert('Task cannot be empty');
    }
    else{
        allTasks[previousTaskPosition] = updatedTask;
        taskObj[taskId] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(taskObj));
        displayTasks();
    }

}

const deleteTask = taskId => {
    let taskNum = 1;
    const allTasks = getLocalStorageTasks();
    let taskObj = JSON.parse(localStorage.getItem('tasks'));
    const taskToDelete = taskObj[taskId];
    const taskPosition = allTasks.indexOf(taskToDelete);
    allTasks.splice(taskPosition,1);
    taskObj = {};
    for(const task of allTasks){
        taskObj[taskNum] = task;
        taskNum++;
    }
    localStorage.setItem('tasks', JSON.stringify(taskObj));
    displayTasks();
}

displayTasks()

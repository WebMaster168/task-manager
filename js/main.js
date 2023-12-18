let tasks = [
/**
 

    
    {
        id: '1138465078061',
        completed: 'start',
        text: 'Покормить кота',
        deadline: ''
    },  
    {
        id: '1138465078062',
        completed: 'process',
        text: 'Выполнить ДЗ',
        deadline: ''
    },
    {
        id: '1138465078063',
        completed: 'complete',
        text: 'Сходить в университет',
        deadline: ''
    },
    */
    
]

function createTaskItem(taskId, taskText, deadline, completed){
    const itemTask = document.createElement('div')
    itemTask.className = 'task-item'
    itemTask.dataset.taskId = taskId
    itemTask.setAttribute('draggable', 'true')
    const mainContainer = document.createElement('div')
    mainContainer.className = 'task-item__main-container'
    const mainContent = document.createElement('div')
    mainContent.className = 'task-item__main-content'
    const form = document.createElement('form')
    form.className = 'checkbox-form'
    const deadlineItem = document.createElement('p')
    deadlineItem.className = 'task-item__deadline'
    deadlineItem.textContent = deadline
    const span = document.createElement('span')
    span.className = 'task-item__text'
    span.textContent = taskText
    if(completed === "start"){
        itemTask.dataset.progress = "start" 

    }else if(completed === "process"){
        itemTask.dataset.progress = "process"

    }else if(completed === "complete"){
        itemTask.dataset.progress = "complete"
    }
    const button = document.createElement('button')
    button.className = 'task-item__delete-button default-button delete-button'
    button.dataset.deleteTaskId = taskId
    button.textContent = 'Удалить'
    itemTask.addEventListener('dragstart', dragstart, {capture: false});
    itemTask.addEventListener('dragend', dragend);

    //form.append(input, label)
    
    mainContent.append(form, span, deadlineItem)
    mainContainer.append(mainContent, button)
    itemTask.append(mainContainer)
    return itemTask

}
const start = document.querySelector('.await')
const proc = document.querySelector('.process')
const complete = document.querySelector('.complete')

const tasksContainer = document.querySelector('.tasks-list')


function createTaskObject(valueTask, idTask, deadlineDate){
    const task = {
        id: `${idTask}`,
        completed: 'start',
        text: valueTask,
        deadline:`| ДО: ${deadlineDate}`
    }
    return task
}


let newTaskValue

const formBlock = document.querySelector('.create-task-block')
formBlock.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const {target} = event
    const enterNewTask = target.querySelector('.create-task-block__input')
    newTaskValue = enterNewTask.value
    newTaskValue.trim()
    const tasksTextValues = tasks.map(taskItem => taskItem.text)
    const taskHasValue = tasksTextValues.includes(newTaskValue)

    const errorMessageDOM = document.querySelector('.error-message-block')
    if(taskHasValue || !newTaskValue){
        const errorMessage = document.createElement('span')
        errorMessage.className = 'error-message-block'
        if(taskHasValue){
            errorMessage.textContent = 'Задача с таким названием уже существует'
        } else if(!newTaskValue){
            errorMessage.textContent = 'Название задачи не должно быть пустым'
        }
        if(!errorMessageDOM){
            formBlock.append(errorMessage)
        }else if(errorMessageDOM.textContent !== errorMessage.textContent){
            errorMessageDOM.remove()
            formBlock.append(errorMessage)
        }
        
    } else{
        if(errorMessageDOM){
            errorMessageDOM.remove()
        }
        
         deadlineModal()
        
            
    }

    
    
})



function tasksRendering(tasks){
    tasks.forEach(task => {
        taskItem = createTaskItem(task.id, task.text, task.deadline, task.completed)
       // tasksContainer.append(taskItem)
        if(task.completed === "start"){
            start.append(taskItem)    
        }else if(task.completed === "process"){
            proc.append(taskItem)
        }else if(task.completed === "complete"){
            complete.append(taskItem)
        }
        
    })
}
//tasksRendering(tasks)


const modal = document.querySelector('.modal-overlay')
let currentTask

tasksContainer.addEventListener('click', (event)=>{
    const {target} = event

    const deleteTaskButton = target.closest('.task-item__delete-button')
    if(deleteTaskButton){
        
        currentTask = deleteTaskButton.closest('.task-item')
        modal.classList.remove('modal-overlay_hidden')
        

    }
})

modal.addEventListener('click', (e) => {
    const {target} = e
    
    const cancel = modal.querySelector('.delete-modal__cancel-button')
    const confirm = modal.querySelector('.delete-modal__confirm-button')
    if(target === modal || target === cancel){
        modal.classList.add('modal-overlay_hidden')
        
    } else if(target === confirm){
        modal.classList.add('modal-overlay_hidden')
        const currentTaskId = currentTask.dataset.taskId
        tasks = removeFromArray(currentTaskId)
        currentTask.remove()
        console.log(tasks)
    }
    
})

function removeFromArray(idTask){
    let taskFiltered = tasks.filter(taskElement => taskElement.id !== idTask)
    return taskFiltered
}

function setTheme(bodyBackground, itemTasks, buttonBorder){
    document.body.style.background = bodyBackground
    document.querySelectorAll('.task-item').forEach(task=>{
        task.style.color = itemTasks
    })
    document.querySelectorAll('button').forEach(button=>{
        button.style.border = buttonBorder
    })
}

let isDark = false
document.addEventListener('keyup', (event)=>{
    const {key} = event
    if(key === 'Tab'){
        isDark = !isDark
        
        if(isDark){
            setTheme(
                    '#24292E',
                    '#ffffff',
                    '1px solid #ffffff'
                )
             
        }else{
            setTheme(
                    'initial',
                    'initial',
                    'none'
                )
        }
        
    }
})


const item = document.querySelectorAll('.task-item');
const placeholders = document.querySelectorAll('.placeholder');

item.forEach(el=>{
    console.log(el)
    el.addEventListener('dragstart', dragstart, {capture: false});
    el.addEventListener('dragend', dragend);
})


for(const placeholder of placeholders){
    placeholder.addEventListener('dragover', dragover);
    
    placeholder.addEventListener('drop', dragdrop);
}

let draggedItem;


function dragstart(event){
    const {target} = event;
    
    draggedItem = target.closest('.task-item');
    target.classList.add('hold');
    
    setTimeout(()=>target.classList.add('hide'), 0);    
}

function dragover(event){
    event.preventDefault();
}

function dragenter(event){
    //event.target.classList.add('hovered');
}

function dragleave(event){
    //event.target.classList.remove('hovered');
}

function dragend(){
    
}
function dragdrop(event){
    const {target} = event;
    let placeholderItem = target.closest('.placeholder'); 
    // target.dataset.progress === "start"
    //event.target.append(item);
    placeholderItem.append(draggedItem);
    console.log(draggedItem)
    if(target.closest('.await')) {
        if(target.querySelector('[data-progress = "process"]')){
            target.querySelector('[data-progress = "process"]').dataset.progress = "start"
            
        }else if(target.querySelector('[data-progress = "complete"]')){
            target.querySelector('[data-progress = "complete"]').dataset.progress = "start"
           
        }
    }else if(target.closest('.process')){
        if(target.querySelector('[data-progress = "start"]')){
            target.querySelector('[data-progress = "start"]').dataset.progress = "process"
            
        }else if(target.querySelector('[data-progress = "complete"]')){
            target.querySelector('[data-progress = "complete"]').dataset.progress = "process"
           
        }
    }else if(target.closest('.complete')){
        if(target.querySelector('[data-progress = "start"]')){
            target.querySelector('[data-progress = "start"]').dataset.progress = "complete"
            
        }else if(target.querySelector('[data-progress = "process"]')){
            target.querySelector('[data-progress = "process"]').dataset.progress = "complete"
           
        }
    }
    
    const taskId = draggedItem.dataset.taskId;
    const newProgress = draggedItem.dataset.progress;
    console.log(taskId)
    // Находим задачу с помощью ID
    const taskToUpdate = tasks.find(task => task.id === taskId);

    // Обновляем значение ключа "completed" в соответствии с выбранным прогрессом
    taskToUpdate.completed = newProgress;

    console.log(tasks); // проверяем обновленный массив задач
    draggedItem = null;

}






let modalDeadline = document.querySelector('.modal-deadline')


const cancel = document.querySelector('.modal-deadline__close')
const confirm = document.querySelector('.modal-deadline__set')
function deadlineModal(){

    modalDeadline.classList.remove('modal-overlay_hidden')

    
    
}


cancel.addEventListener('click',()=>{
    modalDeadline.classList.add('modal-overlay_hidden')
})
let newTask;
confirm.addEventListener('click', (e)=>{
    //e.preventDefault()
    modalDeadline.classList.add('modal-overlay_hidden')
        const newTaskId = Date.now()
        let daysDeadline = modalDeadline.querySelector('[name="days"]').value
        console.log(daysDeadline)
        let hoursDeadline = modalDeadline.querySelector('[name="hours"]').value
        let minutesDeadline = modalDeadline.querySelector('[name="minutes"]').value
        const deadline = resultDeadline(daysDeadline, hoursDeadline, minutesDeadline)
        newTask = createTaskObject(newTaskValue, newTaskId, deadline)
        
        tasks.push(newTask)
        newTaskItem = createTaskItem(newTask.id, newTask.text, newTask.deadline, newTask.completed)
        //tasksContainer.append(newTaskItem) 
        start.append(newTaskItem)
        if(isDark){
            setTheme(
                    '#24292E',
                    '#ffffff',
                    '1px solid #ffffff'
                )
        }
        request.open('POST', 'save-task.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('task=' + encodeURIComponent(JSON.stringify(task)));
})



function resultDeadline(days, hours, minutes){
    let millisecondsDeadline = 0;

  if (minutes === 0 && hours === 0 && days === 0) {
    return; // Если все значения равны нулю, возвращаем ноль
  }

  const minutesInMilliseconds = minutes * 60 * 1000;
  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000;

  millisecondsDeadline = minutesInMilliseconds + hoursInMilliseconds + daysInMilliseconds;

    const milliseconds = Date.now() + millisecondsDeadline; // Пример: количество миллисекунд

    const date = new Date(milliseconds);
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };

    
    const russianDate = date.toLocaleDateString('ru-RU', options);
    return russianDate
}

function addTask(task) {
    tasks.push(task);

    // Отправить задачу на сервер
    var request = new XMLHttpRequest();
    request.open('POST', 'save-task.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('task=' + encodeURIComponent(JSON.stringify(task)));
}

function loadTasks() {
    var request = new XMLHttpRequest();
    request.open('GET', 'get-tasks.php', true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            tasks = JSON.parse(request.responseText);
            // Отобразить задачи после загрузки
            tasksRendering(tasks);
        }
    };
    request.send();
}
window.onload = function() {
    confirm.addEventListener('click', function(event) {
        
        
        addTask(newTask);
    });

    loadTasks();
};











    
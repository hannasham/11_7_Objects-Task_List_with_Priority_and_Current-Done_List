// Это приложение списка задач. Здесь можно создавать задачи с установкой типа важности. Выполненные задачи попадают в скрытый список. Для того, что бы посмотреть список задач, которые уже были выполнены, необходимо кликнуть по кнопке "Показать выполненное". 

// Приложение работает корректно, но предлагаю его немного улучшить. Добавьте автоматическое отображение текстового сообщения "Задач нет", если список пуст. Такое сообщение должно отображаться, как в пустом списке текущих задач, так и в выполненных.

// Массив текущих задач
let currentTaskArray = [
  {
    title: "Купить новый телефон",
    type: "average"
  },
  {
    title: "Освоить Javascript",
    type: "important"
  },
  {
    title: "Погладить одежду",
    type: "simple"
  },
]

// Массив выполненных задач
let doneTaskArray = []

// Функция, возвращающая новую кнопку
function getButton(text) {
  let button = document.createElement("button")
  button.classList.add("btn")
  button.textContent = text
  return button
}

// Function that returns new input
function getInput(type, placeholder) {
  let input = document.createElement("input")
  input.classList.add("add-box__inp")
  input.type = type
  input.placeholder = placeholder
  return input
}

// Function that returns new select
function getSelect(optionsArr) {
  let select = document.createElement("select")
  select.classList.add("add-box__select")
  for (let i = 0; i < optionsArr.length; i++) {
    let option = document.createElement("option")
    option.textContent = optionsArr[i].text
    option.value = optionsArr[i].value
    select.append(option)
  }
  return select
}

// Функция, возвращающая элемент текущей задачи
function getCurrentTaskItem(index, task) {
  let taskItem = document.createElement("li")
  taskItem.classList.add("task-list__item")

  taskItem.textContent = task.title // Добавляем название задачи
  taskItem.classList.add(task.type)  // Добавляем класс, определяющий статус

  let actionsBox = document.createElement("div")
  actionsBox.classList.add("task-list__actions-box")

  // Done Btn
  let doneBtn = getButton("Done")
  doneBtn.onclick = function () {
    doneTaskArray.push(task)
    currentTaskArray.splice(index, 1)
    renderCurrentTaskList(currentTaskArray) // Перерисовка списка текущуих задач
    renderDoneTaskList(doneTaskArray) // Перерисовка списка выполненных задач
  }

  // Remove Btn in ACTUALL
  let removeBtn = getButton("Delete")
  removeBtn.onclick = function () {
    currentTaskArray.splice(index, 1)
    renderCurrentTaskList(currentTaskArray) // Перерисовка списка текущуих задач
    // todo renderDoneTaskList()?
  }

  actionsBox.append(doneBtn, removeBtn)

  taskItem.append(actionsBox)

  return taskItem
}

// Функция, возвращающая элемент выполненной задачи
function getDoneTaskItem(index, task) {
  let taskItem = document.createElement("li")
  taskItem.classList.add("task-list__item")

  taskItem.textContent = task.title // Добавляем название задачи
  taskItem.classList.add(task.type)  // Добавляем класс, определяющий статус

  // Remove Btn in DONE
  let removeBtn = getButton("Delete")


  removeBtn.onclick = function () {
    doneTaskArray.splice(index, 1)
    renderDoneTaskList(doneTaskArray) 
  }

  taskItem.append(removeBtn)

  return taskItem
}

// Блок для текущих задач
let currentBox = document.createElement("div")
currentBox.classList.add("current-box")

// Блок добавления
let addBox = document.createElement("div")
addBox.classList.add("add-box")

let taskTitleInp = getInput("text", "New Task") // Текстовое поле для названия задачи

// Prio Task Array
let taskTypeArr = [
  {
    text: "Low Prio",
    value: "simple"
  },
  {
    text: "Middle Prio",
    value: "average"
  },
  {
    text: "High Prio",
    value: "important"
  }
]

let taskTypeSelect = getSelect(taskTypeArr) // Dropdownlist for Task Prios 

let addTaskBtn = getButton("Add new Task") // Кнопка добавления задачи
addTaskBtn.onclick = function () {
  let taskTitleValue = taskTitleInp.value
  let taskTypeValue = taskTypeSelect.value

  let newTask = {
    title: taskTitleValue,
    type: taskTypeValue
  }
  currentTaskArray.push(newTask)

  renderCurrentTaskList(currentTaskArray) // Перерисовка списка текущих задач

  taskTitleInp.value = ""
  taskTypeSelect.value = "simple"
}

addBox.append(taskTitleInp, taskTypeSelect, addTaskBtn)

// Список текущих задач
let currentTaskList = document.createElement("ul")
currentTaskList.classList.add("task-list")

// Function to render actuall taks list
function renderCurrentTaskList(taskArray) {
  currentTaskList.innerHTML = ""
  emptyListCheck(taskArray, currentTaskList)

  for (let i = 0; i < taskArray.length; i++) {
    let taskItem = getCurrentTaskItem(i, taskArray[i])
    currentTaskList.append(taskItem)
  }
}

renderCurrentTaskList(currentTaskArray) // Отрисовка списка при запуске

currentBox.append(addBox, currentTaskList)

// Блок для выполненных задач
let doneBox = document.createElement("div")
doneBox.classList.add("done-box")

// Кнопка показа выполненных задач
let showDoneTaskListBtn = getButton("Show Done")

// Список выполненных задач
let doneTaskList = document.createElement("ul")
doneTaskList.classList.add("task-list", "task-list_done", "hide")

// Показать / скрыть список выполненных задач
showDoneTaskListBtn.onclick = function () {
  if (doneTaskList.classList.contains("hide") === true) {
    showDoneTaskListBtn.textContent = "Hide Done"
    doneTaskList.classList.remove("hide")
  } else {
    showDoneTaskListBtn.textContent = "Show Done"
    doneTaskList.classList.add("hide")
  }
}

function emptyListCheck(taskArray, taskList) {
  let emptyItem = document.createElement("li")
  emptyItem.classList.add("empty__item")

  if (taskArray.length === 0) {
    if (taskList === doneTaskList) {
      emptyItem.textContent = "No Done Tasks"
      taskList.append(emptyItem)
    }
    else {
      emptyItem.textContent = "No Current Tasks"
      taskList.append(emptyItem)
    }
  }
  return emptyItem
}

// Функция отрисовки списка выполненных задач
function renderDoneTaskList(taskArray) {
  doneTaskList.innerHTML = ""
  emptyListCheck(taskArray, doneTaskList)
  for (let i = 0; i < taskArray.length; i++) {
    let taskItem = getDoneTaskItem(i, taskArray[i])
    doneTaskList.append(taskItem)
  }
}


renderDoneTaskList(doneTaskArray) // Отрисовка списка при запуске

doneBox.append(showDoneTaskListBtn, doneTaskList)

document.body.append(currentBox, doneBox)
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));

        updateTasklist();

        updateStats();
    };
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.querySelector('.taskInput');

    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
    };

    updateTasklist();

    saveTasks();
};

const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    updateTasklist();

    updateStats();

    saveTasks();

    if (tasks[index].completed) {
        confettiHalf();
    };
};

const editTask = (index) => {
    const taskInput = document.querySelector('.taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);

    updateTasklist();

    updateStats();

    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);

    updateTasklist();

    updateStats();

    saveTasks();
};

const updateStats = () => {

    const completeTasks = tasks.filter(task => task.completed).length;

    const totalTasks = tasks.length;

    const progress = (completeTasks / totalTasks) * 100;

    const progressBar = document.getElementById('progressLine');

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if (tasks.length > 0 && completeTasks === totalTasks) {
        confettiFull();
    };
};

const updateTasklist = () => {
    const taskList = document.querySelector('.infoList');
    taskList.innerHTML = '';


    tasks.forEach((task, index) => {
        const list = document.createElement('li');
        list.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''
            } />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <span class="material-symbols-outlined edit" onclick="editTask(${index})">
                edit
                </span>
                <span class="material-symbols-outlined" onclick="deleteTask(${index})">
                delete
                </span>
            </div>
        </div>
        `;

        list.addEventListener('change', () => {
            toggleComplete(index);
        });
        taskList.appendChild(list);
    });
};

document.querySelector('.newTask').addEventListener('click', function (event) {
    event.preventDefault();
    addTask();
});

const confettiFull = () => {
    const end = Date.now() + 3 * 1000;

    // go Buckeyes!
    const colors = ["#b60000ff", "#ffffffff"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};

const confettiHalf = () => {
    const end = Date.now() + .5 * 1000;

    // go Buckeyes!
    const colors = ["#b80000ff", "#ffffffff"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};
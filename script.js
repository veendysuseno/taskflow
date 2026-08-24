// ==========================================
// TASKFLOW
// Task Manager Application
// ==========================================


// ==========================================
// STATE
// ==========================================

let tasks = JSON.parse(
    localStorage.getItem("taskflow_tasks")
) || [];

let currentFilter = "all";


// ==========================================
// DOM ELEMENTS
// ==========================================

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const modal =
    document.getElementById("modal");

const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescriptionInput =
    document.getElementById("taskDescriptionInput");

const taskPriority =
    document.getElementById("taskPriority");

const taskDate =
    document.getElementById("taskDate");

const searchInput =
    document.getElementById("searchInput");

const priorityFilter =
    document.getElementById("priorityFilter");


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showCurrentDate();

        loadTheme();

        renderTasks();

        updateStatistics();

    }
);


// ==========================================
// SAVE TASKS
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "taskflow_tasks",
        JSON.stringify(tasks)
    );

}


// ==========================================
// ADD TASK
// ==========================================

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const title =
            taskTitle.value.trim();

        const description =
            taskDescriptionInput.value.trim();

        const priority =
            taskPriority.value;

        const date =
            taskDate.value;


        if (!title) {

            alert("Nama task wajib diisi.");

            return;

        }


        const newTask = {

            id: Date.now(),

            title: title,

            description: description,

            priority: priority,

            deadline: date,

            completed: false,

            createdAt:
                new Date().toISOString()

        };


        tasks.unshift(newTask);

        saveTasks();

        renderTasks();

        updateStatistics();

        closeModal();

        taskForm.reset();

    }
);


// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    if (filteredTasks.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    filteredTasks.forEach(
        task => {

            const taskElement =
                createTaskElement(task);

            taskList.appendChild(
                taskElement
            );

        }
    );

}


// ==========================================
// FILTER TASKS
// ==========================================

function getFilteredTasks() {

    let result = [...tasks];


    // Filter status

    if (currentFilter === "active") {

        result =
            result.filter(
                task => !task.completed
            );

    }

    if (currentFilter === "completed") {

        result =
            result.filter(
                task => task.completed
            );

    }


    // Search

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (search) {

        result =
            result.filter(
                task =>
                    task.title
                        .toLowerCase()
                        .includes(search)
                    ||
                    task.description
                        .toLowerCase()
                        .includes(search)
            );

    }


    // Priority

    const priority =
        priorityFilter.value;


    if (priority !== "all") {

        result =
            result.filter(
                task =>
                    task.priority === priority
            );

    }


    return result;

}


// ==========================================
// CREATE TASK ELEMENT
// ==========================================

function createTaskElement(task) {

    const article =
        document.createElement("article");


    article.className =
        "task";


    if (task.completed) {

        article.classList.add(
            "completed"
        );

    }


    const checkbox =
        document.createElement("button");

    checkbox.className =
        "task-checkbox";

    checkbox.innerHTML =
        task.completed ? "✓" : "";


    checkbox.addEventListener(
        "click",
        () => toggleTask(task.id)
    );


    const info =
        document.createElement("div");

    info.className =
        "task-info";


    const title =
        document.createElement("div");

    title.className =
        "task-title";

    title.textContent =
        task.title;


    const description =
        document.createElement("div");

    description.className =
        "task-description";

    description.textContent =
        task.description ||
        "Tidak ada deskripsi.";


    const meta =
        document.createElement("div");

    meta.className =
        "task-meta";


    const priority =
        document.createElement("span");

    priority.className =
        `priority ${task.priority}`;

    priority.textContent =
        getPriorityLabel(
            task.priority
        );


    meta.appendChild(priority);


    if (task.deadline) {

        const deadline =
            document.createElement("span");

        deadline.className =
            "deadline";

        deadline.textContent =
            `📅 ${formatDate(
                task.deadline
            )}`;

        meta.appendChild(deadline);

    }


    info.appendChild(title);

    info.appendChild(description);

    info.appendChild(meta);


    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-task";

    deleteButton.innerHTML =
        "🗑️";

    deleteButton.title =
        "Hapus task";


    deleteButton.addEventListener(
        "click",
        () => deleteTask(task.id)
    );


    article.appendChild(checkbox);

    article.appendChild(info);

    article.appendChild(deleteButton);


    return article;

}


// ==========================================
// TOGGLE TASK
// ==========================================

function toggleTask(id) {

    tasks =
        tasks.map(
            task => {

                if (task.id === id) {

                    return {
                        ...task,
                        completed:
                            !task.completed
                    };

                }

                return task;

            }
        );


    saveTasks();

    renderTasks();

    updateStatistics();

}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(id) {

    const confirmed =
        confirm(
            "Apakah Anda yakin ingin menghapus task ini?"
        );


    if (!confirmed) {

        return;

    }


    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    renderTasks();

    updateStatistics();

}


// ==========================================
// CLEAR COMPLETED
// ==========================================

document
    .getElementById("clearCompleted")
    .addEventListener(
        "click",
        () => {

            const completed =
                tasks.filter(
                    task => task.completed
                );


            if (completed.length === 0) {

                alert(
                    "Tidak ada task yang selesai."
                );

                return;

            }


            const confirmed =
                confirm(
                    `Hapus ${completed.length} task yang selesai?`
                );


            if (!confirmed) {

                return;

            }


            tasks =
                tasks.filter(
                    task => !task.completed
                );


            saveTasks();

            renderTasks();

            updateStatistics();

        }
    );


// ==========================================
// STATISTICS
// ==========================================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const progress =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    document.getElementById(
        "totalTasks"
    ).textContent = total;


    document.getElementById(
        "pendingTasks"
    ).textContent = pending;


    document.getElementById(
        "doneTasks"
    ).textContent = completed;


    document.getElementById(
        "progressText"
    ).textContent =
        `${progress}%`;


    document.getElementById(
        "progressPercent"
    ).textContent =
        `${progress}%`;


    document.getElementById(
        "progressFill"
    ).style.width =
        `${progress}%`;


    document.getElementById(
        "allCount"
    ).textContent =
        total;


    document.getElementById(
        "activeCount"
    ).textContent =
        pending;


    document.getElementById(
        "completedCount"
    ).textContent =
        completed;

}


// ==========================================
// NAVIGATION FILTER
// ==========================================

document
    .querySelectorAll(".nav-item")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".nav-item"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter;


                    updateSectionTitle();

                    renderTasks();

                }
            );

        }
    );


// ==========================================
// SECTION TITLE
// ==========================================

function updateSectionTitle() {

    const title =
        document.getElementById(
            "sectionTitle"
        );

    const description =
        document.getElementById(
            "taskDescription"
        );


    if (currentFilter === "all") {

        title.textContent =
            "Semua Task";

        description.textContent =
            "Kelola semua pekerjaan Anda";

    }


    if (currentFilter === "active") {

        title.textContent =
            "Task Aktif";

        description.textContent =
            "Pekerjaan yang belum selesai";

    }


    if (currentFilter === "completed") {

        title.textContent =
            "Task Selesai";

        description.textContent =
            "Pekerjaan yang sudah diselesaikan";

    }

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    renderTasks
);


// ==========================================
// PRIORITY FILTER
// ==========================================

priorityFilter.addEventListener(
    "change",
    renderTasks
);


// ==========================================
// MODAL
// ==========================================

document
    .getElementById("addTaskButton")
    .addEventListener(
        "click",
        openModal
    );


document
    .getElementById("emptyAddButton")
    .addEventListener(
        "click",
        openModal
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelButton")
    .addEventListener(
        "click",
        closeModal
    );


function openModal() {

    modal.classList.add("show");

    setTimeout(
        () => taskTitle.focus(),
        100
    );

}


function closeModal() {

    modal.classList.remove(
        "show"
    );

}


// Close modal when clicking outside

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            closeModal();

        }

    }
);


// Close modal with ESC

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


// ==========================================
// DARK MODE
// ==========================================

document
    .getElementById("themeToggle")
    .addEventListener(
        "click",
        toggleTheme
    );


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "taskflow_theme",
        isDark
            ? "dark"
            : "light"
    );


    updateThemeButton();

}


function loadTheme() {

    const theme =
        localStorage.getItem(
            "taskflow_theme"
        );


    if (theme === "dark") {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeButton();

}


function updateThemeButton() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    button.innerHTML =
        isDark
            ? "☀️ <span>Light Mode</span>"
            : "🌙 <span>Dark Mode</span>";

}


// ==========================================
// DATE
// ==========================================

function showCurrentDate() {

    const element =
        document.getElementById(
            "currentDate"
        );


    const now =
        new Date();


    const formatted =
        now.toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    element.textContent =
        formatted;

}


// ==========================================
// HELPERS
// ==========================================

function getPriorityLabel(
    priority
) {

    const labels = {

        high: "High",

        medium: "Medium",

        low: "Low"

    };


    return labels[priority]
        || priority;

}


function formatDate(date) {

    const parsed =
        new Date(
            `${date}T00:00:00`
        );


    return parsed.toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}
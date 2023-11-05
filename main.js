
//sample todos array => our little in memory database
const todos = [
    {id: 1, content: "Review Subscriptions", isDone: true},
    {id: 2, content: "Send report to Frank", isDone: false},
    {id: 3, content: "Learn JS", isDone: false},
]

//HTML ul elements that will contain all of the todo's li HTML elements
const todosList = document.getElementById("todosList");

//get a reference to the form and inputText
const form = document.getElementById("form");
const inputText = document.getElementById("inputText");


//get a reference to each link on the menu tab
const allButton = document.getElementById("ex1-tab-1");
const activeButton = document.getElementById("ex1-tab-2");
const completedButton = document.getElementById("ex1-tab-3");

//method responsible of updating the DOM
const updateDOM = (selectedMenuTab) => {
    //empty the ul so that I add li elements
    todosList.innerHTML = "";

    //remove the active class from every menu tab link/button
    allButton.className = allButton.className.replace("active", "");
    activeButton.className = activeButton.className.replace("active", "");
    completedButton.className = completedButton.className.replace("active", "");


    let listfOfTodosToDisplay = [];

    //display todos based on selectedMenuTab
    if (selectedMenuTab === "all") {
        //wanna display all todos
        listfOfTodosToDisplay = todos;
        allButton.className += " active";
    } else if (selectedMenuTab === "completed") {
        //wanna display completed todos
        listfOfTodosToDisplay = todos.filter(todo => todo.isDone);
        completedButton.className += " active";
    } else if (selectedMenuTab === "active") {
        //wanna display active todos
        listfOfTodosToDisplay = todos.filter(todo => !todo.isDone);
        activeButton.className += " active";
    }


    listfOfTodosToDisplay.forEach(todo => {

        console.log(todo);

        //create the li element
        const li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center border-0 mb-2 rounded";

        if (todo.isDone) {
            li.className += " text-decoration-line-through";
        }

        li.style.backgroundColor = "#f4f6f7";

        const checkBoxChecked = todo.isDone ? "checked" : "";
        li.innerHTML = `<input class="form-check-input me-2" id="checkbox-${todo.id}" type="checkbox" value="" aria-label="..." ${checkBoxChecked} />
        ${todo.content}`;

        //append it to todosList ul element
        todosList.appendChild(li);
    })

    //attach the click handlers to checkboxes
    //get all the checkboxes based on the common attribut id that they have: checkbox-?
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="checkbox-"]');

    //add click event handlers to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            const targetCheckbox = event.target;
            const parts = targetCheckbox.id.split("-"); // => ["checkbox", "1"]
            const todoId = parseInt(parts[1]);

            //I know the todoItem that the user changed
            const t = todos.find(todo => todo.id === todoId);

            //change the status of todoItem
            t.isDone = !t.isDone;

            updateDOM(currentActiveMenuTab);
        })
    })
}

//first time we run the app, display the list of all todos on the DOM/interface
updateDOM("all");


//a global variable that will hold the current active tab
let currentActiveMenuTab = "all";

//handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); //prevent page reload which is the default form submission behavior

    const todoContent = inputText.value.trim();
    inputText.value = "";


    let id = undefined;
    if (todos.length === 0) {
        id = 0;
    } else {
        id = todos[todos.length-1].id + 1;
    }

    //add the todoItem to todos array and update DOM
    const todoItem = {
        id: id,//will be calculated
        content: todoContent,
        isDone: false
    }

    todos.push(todoItem);

    if (currentActiveMenuTab !== "completed") {
        updateDOM(currentActiveMenuTab);
    }

})



//handling click events on menu tabs
allButton.addEventListener("click", (event) => {
    currentActiveMenuTab = "all";
    updateDOM("all")
})

activeButton.addEventListener("click", (event) => {
    currentActiveMenuTab = "active";
    updateDOM("active");
})

completedButton.addEventListener("click", (event) => {
    currentActiveMenuTab = "completed";
    updateDOM("completed");
})

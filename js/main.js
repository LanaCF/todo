const doc = document;
const todoListEl = doc.querySelector('.todo-list');
const addTodoForm = doc.querySelector('.add-todo-form');

const todos = [
  { id: 1, text: 'Todo 1', completed: false },
  { id: 2, text: 'Todo 2', completed: false },
  { id: 3, text: 'Todo 3', completed: false }
];

const addText = doc.createElement('input');
const btnAdd = doc.createElement('button');

addText.className = 'add-text';
addText.placeholder = 'Add your new task';

btnAdd.className = 'btn-add';
btnAdd.innerHTML = 'Add';

addTodoForm.append(addText);
addTodoForm.append(btnAdd);

renderTodoList(todos, todoListEl);

// Functions
function renderTodoList(data, parentEl) {
  if (!checkValidArgs(data, parentEl)) {
    return;
  }

  let todoChksEls;

  let todoItems = data
    .map(function(item, index) {
      const todoItem = `
        <li class="todo-item" data-id="${ item.id }">
          <span class="todo-item__number mr-1">${ index + 1 }</span>
          <input 
            class="todo-item__completed mr-1" 
            type="checkbox" 
            ${ item.completed ? 'checked' : '' }
          >
          <p class="todo-item__text mr-1${ item.completed ? ' todo-item__text_completed' : '' }">
            ${ item.text }
          </p>
          <button class="todo-item__delBtn">del</button>
        </li>
      `;
      return todoItem })
    .join('');
    
  parentEl.innerHTML = todoItems;
  
  todoChksEls = doc.querySelectorAll('.todo-item__completed');
  if (!todoChksEls.length) {
    console.warn('Todo checks not found !!!');
    return;
  }

  todoChksEls.forEach(function(chk) {
    chk.onchange = function() {
      const id = this.parentElement.dataset.id;
      const todo = data.find(function(item) {
        return item.id == id
      });

      if (!todo) {
        return;
      }

      todo.completed = !todo.completed;
      renderTodoList(todos, todoListEl);
    }
  });

  const delBtns = doc.querySelectorAll('.todo-item__delBtn');
  delBtns.forEach(function(delBtn) {
    delBtn.onclick = function() {
      const id = this.parentElement.dataset.id;
      const indexToRemove = data.findIndex(function(item) {
        return item.id == id;
      });

      if (indexToRemove !== -1) {
        data.splice(indexToRemove, 1);
        renderTodoList(data, todoListEl);
      }
    }
  });

  btnAdd.onclick = function(elements) {
    elements.preventDefault();
    
    const valueText = addText.value;
    const arrTodoAdd = {
      id: todos.length + 1,
      text: valueText,
      completed: false
    }
  
    todos.push(arrTodoAdd);
    renderTodoList(data, todoListEl);
  }
}

function checkValidArgs(data, parentEl) {
  
  if (!parentEl) {
    console.warn('Parent Elemetn not found');
    return; 
  }
  if (!Array.isArray(data)) {
    console.warn('Arg data mast be Array');
    return;
  }

  return true;
}



// Реалізоване видалення не через масив, ще один варіант **************


// delItem();

// function delItem() {
//   const delBtns = doc.querySelectorAll('.todo-item__delBtn');

//   delBtns.forEach(function(btn) {
//     btn.onclick = function() {
//       const listItem = this.closest('.todo-item');
      
//       if (listItem) {
//         listItem.remove();
//       }
//     };
//   });
// }



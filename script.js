function addElement() {
  const inputTask = document.querySelector('#texto-tarefa').value;
  let list = document.querySelector('#lista-tarefas').innerHTML;
  list += `<li>${inputTask}</li>`;
  document.querySelector('#lista-tarefas').innerHTML = list;
  document.querySelector('#texto-tarefa').value = null;
  changeBackground();
}

// Requisito 07
function changeBackground() {
  const liElements = document.querySelectorAll('li');
  document.querySelector('#texto-tarefa').value = null;
  for (let i = 0; i < liElements.length; i += 1) {
    liElements[i].addEventListener('click', (event) => {
      clearSelected();
      event.target.classList.toggle('itemSelected');
    });
  }
}

// Requisito 08
function clearSelected() {
  const liElements = document.querySelectorAll('li');
  for (let i = 0; i < liElements.length; i += 1) {
    liElements[i].classList.remove('itemSelected');
  }
}

// Requisito 09
function textDecoration() {
  const listOl = document.querySelector('#lista-tarefas');
  listOl.addEventListener('dblclick', (event) => {
    event.target.classList.toggle('completed');
  });
}
// Requisito 10
function deleteList() {
  const listOl = document.querySelector('#lista-tarefas');
  listOl.textContent = '';
}
// Requisito 11
function removeCompleted() {
  const Ols = document.querySelector('#lista-tarefas');
  const listLi = document.querySelectorAll('.completed');
  for (let i = 0; i < listLi.length; i += 1) {
    Ols.removeChild(listLi[i]);
  }
}
// Requisito 12
function saveData() {
  const buttonSave = document.querySelector('#salvar-tarefas');
  buttonSave.addEventListener('click', () => {
    const lis = document.querySelector('#lista-tarefas').children;
    const saves = [];
    for (let i = 0; i < lis.length; i += 1) {
      const Itens = {
        task: lis[i].innerText,
        class: lis[i].className,
      };
      saves.push(Itens);
    }
    localStorage.setItem('saves', JSON.stringify(saves));
  });
}
function recharge() {
  const saves = JSON.parse(localStorage.getItem('saves'));
  const Ols = document.querySelector('#lista-tarefas');
  if (saves) {
    for (let i = 0; i < saves.length; i += 1) {
      const li = document.createElement('li');
      li.innerText = saves[i].task;
      li.className = saves[i].class;
      Ols.appendChild(li);
    }
  }
}
// Requisito 13
function moveUP() {
  const buttonUp = document.querySelector('#mover-cima');
  buttonUp.addEventListener('click', () => {
    const classLiSelected = document.querySelector('.itemSelected');
    if (classLiSelected == null) return;
    if (classLiSelected.previousElementSibling) {
      classLiSelected.previousElementSibling.insertAdjacentElement('beforebegin', classLiSelected);
    }
  });
}
function moveDown() {
  const buttonUp = document.querySelector('#mover-baixo');
  buttonUp.addEventListener('click', () => {
    const classLiSelected = document.querySelector('.itemSelected');
    if (classLiSelected == null) return;
    if (classLiSelected.nextElementSibling) {
      classLiSelected.nextElementSibling.insertAdjacentElement('afterend', classLiSelected);
    }
  });
}
// Requisito 14
function removeSelected() {
  const buttonRemove = document.querySelector('#remover-selecionado');
  buttonRemove.addEventListener('click', () => {
    const classLiSelected = document.querySelector('.itemSelected');
    if (classLiSelected == null) return;
    if (classLiSelected !== null) {
      classLiSelected.parentNode.removeChild(classLiSelected);
    }
  });
}

window.onload = () => {
  textDecoration();
  saveData();
  recharge();
  moveUP();
  moveDown();
  removeSelected();
};

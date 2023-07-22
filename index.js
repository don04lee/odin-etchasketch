// allows drawing function
let mouseDown = false;

// identifying cells early
let cells;

// default grid size of 16
let currSize = 16;
createGrid(currSize);

// help with getting input for resizing grid
let sizeDiv = document.createElement('div');
sizeDiv.classList.add('sizeDiv');
sidebar.appendChild(sizeDiv);

let sizeButton = document.createElement('input');
sizeButton.setAttribute('type', 'number');
sizeButton.setAttribute('placeholder', 'Size from 1 to 100');
sizeButton.setAttribute('min', 1);
sizeButton.setAttribute('max', 100);
sizeButton.id = 'sizeButton';
sizeDiv.appendChild(sizeButton);

let confirmSizeButton = document.createElement('button');
confirmSizeButton.textContent = '✓';
confirmSizeButton.id = 'confirmSizeButton';
sizeDiv.appendChild(confirmSizeButton);

// erase toggle
let eraseToggle = false;
let eraseButton = document.createElement('div');
eraseButton.textContent = 'Erase';
eraseButton.classList.add('eraseButton');
sidebar.appendChild(eraseButton);

eraseButton.addEventListener('click', function() {
  eraseButton.classList.toggle('active');
  if(eraseToggle) {
    eraseToggle = false;
  }
  else{
    eraseToggle = true;
  }
});

// resizing occurs when size button is clicked
confirmSizeButton.addEventListener('click', function() {
  while(grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  createGrid(sizeButton.value);
});

// stops weird dragging mechanism while drawing
grid.setAttribute("draggable", false);

// creates grid with multiple rows and cells in between
function createGrid(size) {

  for(let i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for(let j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.textContent = '';
      cell.style.height = `${600 / size + 1}px`;
      cell.style.width = `${600 / size + 1}px`; 
      cell.classList.add('cell');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  cells = document.querySelectorAll('.cell');
  color();
}

// color picker
let currColor = 'black';
let colorButton = document.createElement('input');
colorButton.setAttribute('type', 'color');  
colorButton.id = 'colorButton';
sidebar.appendChild(colorButton);

// coloring function
function color() {
  cells.forEach(cell => {
    cell.addEventListener('mouseover', function() {
      if(eraseToggle && mouseDown){
        cell.style['background-color'] = 'white';
      }
      else if(mouseDown){
        cell.style['background-color'] = currColor;
      }
    });

    cell.addEventListener('mousedown', function() {
      currColor = document.getElementById('colorButton').value;
      if(eraseToggle){
        cell.style['background-color'] = 'white';
      }
      else {
        cell.style['background-color'] = currColor;
      }
      mouseDown = true;
    });
    cell.addEventListener('mouseup', function() {
      mouseDown = false;
    });
  });
}
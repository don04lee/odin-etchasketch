// allows drawing function
let mouseDown = false;

// stops weird dragging mechanism while drawing
grid.setAttribute("draggable", false);

createGrid(16);

// creates grid with multiple rows and cells in between
function createGrid(size) {
  for(let i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for(let j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.textContent = '';
      cell.classList.add('cell');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

// color picker
let currColor = 'black';
let colorButton = document.createElement('input');
colorButton.setAttribute('type', 'color');  
colorButton.id = 'colorButton';
sidebar.appendChild(colorButton);


const cells = document.querySelectorAll('.cell');

// coloring function
cells.forEach(cell => {
  cell.addEventListener('mouseover', function() {
    if(mouseDown){
      cell.style['background-color'] = currColor;
    }
  });

  cell.addEventListener('mousedown', function() {
    currColor = document.getElementById('colorButton').value;
    cell.style['background-color'] = currColor;
    mouseDown = true;
  });
  cell.addEventListener('mouseup', function() {
    mouseDown = false;
  });
});


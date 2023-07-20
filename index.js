let mouseDown = false;

createGrid(16);

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

const cells = document.querySelectorAll('.cell');

// coloring function
cells.forEach(cell => {
  cell.addEventListener('mouseover', function() {
    if(mouseDown){
      cell.style['background-color'] = 'black';
    }
  });

  cell.addEventListener('mousedown', function() {
    cell.style['background-color'] = 'black';
    mouseDown = true;
  });
  cell.addEventListener('mouseup', function() {
    mouseDown = false;
  });
});
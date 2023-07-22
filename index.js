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

// rainbow toggle
let rainbowToggle = false;
let rainbowButton = document.createElement('div');
rainbowButton.textContent = 'Rainbow';
rainbowButton.classList.add('rainbowButton');
sidebar.appendChild(rainbowButton);

// erase button overrides rainbow and disables it
// if rainbow was still active
eraseButton.addEventListener('click', function() {
  eraseButton.classList.toggle('active');
  if(eraseToggle) {
    eraseToggle = false;
  }
  else{
    eraseToggle = true;
    if(rainbowToggle) {
      rainbowToggle = false;
      rainbowButton.classList.toggle('active');
    }
  }
});

// rainbow button overrides erase and disables it 
// if erase was still active
rainbowButton.addEventListener('click', function() {
  rainbowButton.classList.toggle('active');
  if(rainbowToggle) {
    rainbowToggle = false;
  }
  else {
    rainbowToggle = true;
    if(eraseToggle) {
      eraseToggle = false;
      eraseButton.classList.toggle('active');
    }
  }
});

// resizing occurs when size button is clicked
confirmSizeButton.addEventListener('click', function() {
  if(sizeButton.value < 1 || sizeButton.value > 100) {
    return;
  }
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
      else if(rainbowToggle && mouseDown){
        cell.style['background-color'] = "#" + Math.floor(Math.random()*16777215).toString(16);
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
      else if(rainbowToggle){
        cell.style['background-color'] = "#" + Math.floor(Math.random()*16777215).toString(16);
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
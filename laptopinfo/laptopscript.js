const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.drag');

//when file is inside drag area//


dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragText = 'Release to Upload';
});


//when file is leaves the drag area 

dragArea.addEventListener('dragleave', () => {
});


//when file is dropped in drag area

dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
});




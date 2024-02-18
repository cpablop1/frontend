const btnUpdate = document.querySelector('#btnUpdate');
const formUser = document.querySelector('#formUser');

/* btnSave.addEventListener('click', ()=>{
    console.log('You have clicked!');
}); */
formUser.addEventListener('submit', e => {
  e.preventDefault();
  var data = {};
  Array.from(document.querySelectorAll('#formUser input[type=text], input[type=email]'), value => {
    console.log(value.name, ' - ', value.value);
    data[value.name] = value.value;
  });
  fetch('http://localhost:3000/fitchAPI/user', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => console.log(data));
});

btnUpdate.addEventListener('click', () => {
  fetch('http://localhost:3000/fitchAPI/user')
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenido existente de la tabla
      document.querySelector('#tblUser tbody').innerHTML = '';
      let tag = ['userId','name','email','phoneNumber','address','isActive'];

      data.data.forEach(rowData => {
        // Crear una nueva fila para cada conjunto de datos
        let row = document.createElement('tr');
        console.log(rowData);

        for (cellData of tag) {
          console.log(rowData[cellData]);
          // Crear una celda para cada dato y agregarla a la fila
          let cell = document.createElement('td');
          if(rowData[cellData] === true){
            cell.innerText = 'Sí';
          }else if(rowData[cellData] === false){
            cell.innerText = 'No';
          }else if(rowData[cellData] === null){
            cell.innerText = '------------';
          }else{
            cell.innerText = rowData[cellData];
          }
          row.appendChild(cell);
        }
        /* rowData.forEach(cellData => {
          // Crear una celda para cada dato y agregarla a la fila
          let cell = document.createElement('td');
          cell.innerText = cellData;
          row.appendChild(cell);
        }); */

        // Agregar la fila a la tabla
        document.querySelector('#tblUser tbody').appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
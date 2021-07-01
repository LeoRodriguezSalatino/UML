function toDiagramsText(e) {
    let aux = '';

    cuadros2.forEach(clase => {
        // if(clase.abstracta) aux += '\n<<abstract>>'; 
        aux += '\n'+clase.nombre; 
        clase.propiedades.forEach(prop => {
            aux += '\n'+prop;
        }); 
        aux += '\n--'
        clase.metodos.forEach(mets => {
            aux += '\n'+mets;
        }); 
        aux += '\n';
    });

    document.querySelector('#codigoJava').innerHTML = aux;
    document.querySelector('#codigoJava').classList.remove('hide');
}
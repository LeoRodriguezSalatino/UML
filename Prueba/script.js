let cont = document.querySelector('#contenedor');

function borrarRow(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
};

document.querySelector('#agregar').addEventListener('click', function(e) {
    // e.preventDefault();
    // console.log('e');
    let aux =
        `<p class='prueba'>ee<input type="button" class='borrarRow' value="X"></p>`;
    let p = document.createElement('p');
    let boton = document.createElement('button');
    boton.append(document.createTextNode('X'));
    boton.addEventListener('click', borrarRow);
    p.append(boton)
    p.append(document.createTextNode('erar '))
    cont.appendChild(p);
    // cont.appendChild(aux);
    // let i = document.querySelectorAll('.borrarRow');
    // i[i.length-1].addEventListener('click', borrarRow);
});
//     document.querySelectorAll('.borrarRow').forEach(boton => {
//         boton.addEventListener('click', borrarRow);
//     });
// });

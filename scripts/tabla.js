document.querySelector('#nuevaTabla').addEventListener('click', nuevaTablaa);
function nuevaTablaa() {
    let tabla = document.createElement('table');
    tabla.setAttribute('id', 'tabla' + cuadros2.length);
    tabla.setAttribute('draggable', 'true');
    tabla.classList.add('dragable');

    tabla.innerHTML =
        // <table class="dragable" id="tabla${cuadros2.length}" draggable="true">
        `<tr>
        <th>
            <input class="inputSinStyle nombreTabla" type="text" name="nombreClase" id="nombreClase${cuadros2.length}" placeholder="NombreClase">
            <div>
            <label class="labels" for="interface"> 
                <input type="checkbox" name="interface" id="interface">
                    Interface</label>
                <label class="labels sinInterface" for="abstracta">      
                    <input type="checkbox" name="abstracta" id="abstracta">
                    Abstract</label>
            </div>
            <label class="labels sinInterface" for="herencia">Hereda de
                <select name="herencia" id="herencia">
                    <option value=""></option>
                </select>
            </label>
            <div class="labels sinInterface interfaces">
                <p>Interfaces</p>
                <!-- <label for="checkbox"><input type="checkbox" name="interfaces" id="interfaces">a</label> -->
            </div>
        </th>
    </tr>
    <tr>
        <td class="inputspropiedad">            
        <!-- INPUTS PROPIEDADES -->    
        </td>
    </tr>
    <tr>
        <td class="botonesMas">
            <i class="fas fa-plus-circle propiedad ${cuadros2.length}"></i>
        </td>    
    </tr>
    <tr>
        <td>
            <hr>
        </td>
    </tr>
    <tr>
        <td class="inputsmetodo">
        <!-- INPUTS METODOS -->
        </td>
    </tr>
    <tr>
        <td class="botonesMas">
            <i class="fas fa-plus-circle metodo ${cuadros2.length}"></i>
        </td>    
    </tr>`
    // </table>;

    document.querySelector('.divCuadros').appendChild(tabla);

    document.querySelectorAll('#tabla' + cuadros2.length + ' .fas.fa-plus-circle').forEach(e => {
        e.addEventListener('click', function (e) {
            e.preventDefault();
            nuevaRow(e);
        });
    });

    // document.querySelector('#tabla' + cuadros2.length).addEventListener('dragstart', e => {
    //     e.dataTransfer.setDragImage(null, 150, 100);
    // });

    
    document.querySelectorAll('#tabla' + cuadros2.length).forEach(e => e.addEventListener('drag', e => {
        e.preventDefault();
        if (e.clientX != 0) {
            e.target.style.left = (e.clientX - 179) + 'px';
            e.target.style.top = (e.clientY - 11.125) + 'px';
        }
    }));

    document.querySelector('#tabla' + cuadros2.length + ' .nombreTabla').addEventListener('keyup', function (e) {
        if (e.key === 'Delete') borrarTabla(e);
    });

    // document.querySelector('#tabla' + cuadros2.length).addEventListener('dragend', e => {
    //     e.target.style.left = (e.clientX - 179) + 'px';
    //     e.target.style.top = (e.clientY - 11.125) + 'px';
    // });

    cuadros2.push(document.querySelector('#tabla' + cuadros2.length));
}

let i = 1;
function nuevaRow(e) {
    // console.log(e);
    // let row = `
    // <div>
    //     <input type="text" name="propiedad${i}" id="propiedad${i}" class="in inputSinStyle"
    //         placeholder="- numCta:Integer">

    // </div>`;
    let nCuadro = e.target.classList[3];
    let tipo = e.target.classList[2];

    let div = document.createElement('div');
    div.classList.add('divRow');

    let row = document.createElement('input');
    row.setAttribute('type', 'text');
    row.setAttribute('name', tipo + i);
    row.setAttribute('id', tipo + i);
    row.setAttribute('placeholder', '- numCta:Integer');
    row.classList.add('inputSinStyle');

    let x = document.createElement('input');
    x.setAttribute('type', 'button');
    x.setAttribute('name', 'borrar' + tipo + i);
    x.setAttribute('id', 'borrar' + tipo + i);
    x.setAttribute('value', 'X');
    x.classList.add('borrarInput');
    x.addEventListener('click', borrarRow);

    div.appendChild(row);
    div.appendChild(x);

    document.querySelector('#tabla' + nCuadro + ' .inputs' + tipo).append(div);
    i++;
}

function borrarRow(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
};

function borrarTabla(e) {
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
}
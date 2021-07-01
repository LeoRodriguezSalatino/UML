// try{
// document.querySelector('.abc').addEventListener('submit', e => e.preventDefault());
function borrarRow(e) {
    // console.log(e);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    document.querySelector('textarea').value = ej;
};

function modificarRow(e) {
    // e.preventDefault();

    document.querySelector('#' + e.target.parentNode.classList[0]).value = e.target.innerText;
    e.target.parentNode.removeChild(e.target);
};

function agregar(e) {
    if (e.key === "Enter") {
        let linea = e.target.value.trim();
        // console.log(linea);
        //comprobacion errores
        if (linea[1] != ' ') linea = linea[0] + ' ' + linea.substring(1);

        while (linea.includes(' :') || linea.includes(': ')) {
            if (linea.includes(' :')) {
                linea = linea.substring(0, linea.search(' :')) + linea.substring(linea.search(' :') + 1);
            }
            if (linea.includes(': ')) {
                linea = linea.substring(0, linea.search(': ') + 1) + linea.substring(linea.search(': ') + 2, linea.length);
            }
        }

        if (linea.includes(' (')) {
            linea = linea.substring(0, linea.indexOf(' (')) + linea.substring(linea.indexOf('('));
        }
        //

        let donde = e.target.id;

        let padre = document.querySelector('.' + donde);

        padre.innerHTML +=
            `<p class='${(donde === 'metodo') ? 'metodos' : 'propiedades'}'>${linea}<input type="button" class='borrarRow ${donde}' value="X"></p>`;

        document.getElementById(donde).addEventListener('keypress', (e) => {
            agregar(e);
        })
        // listeners();
        document.querySelectorAll('.borrarRow.' + donde).forEach(boton => {
            boton.addEventListener('click', borrarRow);
        });
        document.querySelectorAll('td.' + donde + ' p').forEach(p => {
            p.addEventListener('dblclick', modificarRow);
        });
    }
};

function listeners() {
    let ins = document.querySelectorAll('.in');
    // console.log(ins);
    ins.forEach((in1) => {
        in1.addEventListener('keypress', (e) => {
            agregar(e);
        })
    })
}


let datosDivCuadros = '';
listeners();
let cuadros2 = [];
let interfaces = [];

function agregarClase(e) {
    // e.preventDefault();

    cuadros2.push(new Object());
    let n = cuadros2.length - 1;
    cuadros2[n].nombre = document.querySelector('#nombreClase').value;
    cuadros2[n].interface = document.querySelector('#interface').checked;
    cuadros2[n].abstracta = document.querySelector('#abstracta').checked;
    cuadros2[n].padre = document.querySelector('#herencia').value;
    //cambiar
    let inter = document.querySelectorAll('#interfaces')
    // console.log(inter);

    if (inter.length > 0) {
        let bool = false;
        inter.forEach(e => { if (e.checked) bool = true });
        if (bool) {
            cuadros2[n].implementa = [];
            inter.forEach(check => {
                if (check.checked)
                    cuadros2[n].implementa.push(cuadros2[check.value].nombre);
            });
            inter.forEach(e => e.checked = false);
        }
    }

    cuadros2[n].propiedades = [];
    cuadros2[n].metodos = [];

    // let metodos = [];
    let padre = document.querySelector('.propiedad');
    document.querySelectorAll('.propiedades').forEach(prop => {
        cuadros2[n].propiedades.push(prop.innerText);
        padre.removeChild(prop);
    });

    padre = document.querySelector('.metodo');
    document.querySelectorAll('.metodos').forEach(prop => {
        cuadros2[n].metodos.push(prop.innerText);
        padre.removeChild(prop);
    });

    let aux = nuevaTabla(cuadros2[n]);

    document.querySelector('.divCuadros').innerHTML += aux;

    //si no es interface, lo agrego al select de herencia, sino al checkbox de interfaces
    if (!cuadros2[n].interface) {
        document.querySelector('select').innerHTML += `<option value="${cuadros2[n].nombre}">${cuadros2[n].nombre}</option>`;
    }
    else {
        document.querySelector('.interfaces').innerHTML +=
            `<label for="checkbox"><input type="checkbox" name="interfaces" id="interfaces" value="${n}" >${cuadros2[n].nombre}</label>`;
        let m = document.querySelectorAll('#interfaces');
        m.forEach(e => e.addEventListener('click', e => { implementarInterface(e) }));
        // interfaces.push(new Object());
        // interfaces[interfaces.length].nombre = cuadros2[n].nombr;
        // interfaces[interfaces.length].id = n;
    }
    let t = document.querySelectorAll('.dragable');
    // console.log(t[t.length-1]);

    // datosDivCuadros = document.querySelector('.divCuadros').getBoundingClientRect();
    document.querySelectorAll('.dragable').forEach(e => e.addEventListener('dragstart', e => {
        e.target.style.left = (e.clientX - 179) + 'px';
        e.target.style.top = (e.clientY - 11.125) + 'px';
    }));

    document.querySelectorAll('.dragable').forEach(e => e.addEventListener('dragend', e => {
        e.target.style.left = (e.clientX - 179) + 'px';
        e.target.style.top = (e.clientY - 11.125) + 'px';
    }));

    //cambiar a func
    document.querySelectorAll('.sinInterface').forEach(nodo => nodo.classList.remove('hide'));

    document.querySelector('#interface').checked = false;
    document.querySelector('#abstracta').checked = false;
    document.querySelector('#nombreClase').value = '';
    document.querySelector('#herencia').value = '';

    //relistenear -.-
    // listeners();
    // document.querySelector('.agregarClase').addEventListener('click', agregarClase);
}

// document.querySelector('.agregarClase').addEventListener('click', agregarClase);

// document.querySelector('.codear').addEventListener('click', codear);

function codear(e) {
    // e.preventDefault();
    document.querySelector('#codigoJava').innerHTML = '';
    cuadros2.forEach(c => codearClase(c));
    document.querySelector('#codigoJava').classList.remove('hide');
}

function codearClase(c) {
    let implementa = '';
    if (c.implementa) {
        c.implementa.forEach(element => {
            implementa += element + ', ';
        });
        implementa = implementa.substring(0, implementa.length - 2);
    }
    let aux = `public ${(c.abstracta) ? 'abstract ' : ''}${(c.interface) ? 'interface' : 'class'} ${c.nombre}${(c.padre != '') ? ' extends ' + c.padre : ''}${(c.implementa) ? ` implements ${implementa}` : ''}{`;
    let aux2 = '';
    let aux3 = '';
    let aux4 = '';

    for (const p of c.propiedades) {
        // traer func aca?
        [a, a2, a3, a4] = codearPropiedad(p, c.interface);
        aux += a;
        aux2 += a2;
        aux3 += a3;
        aux4 += a4;
    }

    let codigo = document.querySelector('#codigoJava');

    //si no es interface, hago constructora
    if (!c.interface) {
        let auxPadre = '';
        let auxPadreSuper = '';
        //tiene padre? si tiene busco los parametros de su cosntructora
        if (c.padre) {
            auxPadre = codigo.innerHTML.substring(codigo.innerHTML.search('public ' + c.padre), codigo.innerHTML.length);
            auxPadre = auxPadre.substring(auxPadre.indexOf('(')+1, auxPadre.indexOf(')'));
            auxPadreSuper = '\n\t\tsuper('+auxPadre+');';
            auxPadre += ', ';
        }
        aux += '\n\tpublic ' + c.nombre + '('+auxPadre + aux2.substring(0, aux2.length - 2) + '){' + auxPadreSuper + aux3 + '\n\t}';
    }
    //setters y getters
    aux += aux4;

    for (const m of c.metodos) {
        aux += codearMetodo(m);
    }
    // aux += c.propiedades.reduce((p, acum) => acum + codearPropiedad(p));
    // aux += c.metodos.reduce((m, acum) => acum + codearPropiedad(m));
    aux += '\n}\n\n';
    // console.log(aux);

    codigo.innerHTML += aux;
}

function codearPropiedad(p, inter) {
    let nombre = p.substring(p.search(' ') + 1, p.search(':'));
    //declaracion propiedades
    let aux = `\n\t${(p[0] === '-') ? 'private' : 'public'} ${p.substring(p.search(':') + 1, p.length) + ' ' + nombre};\n`

    let aux2 = '';
    let aux3 = '';

    //si no es interface, hago constructora
    if (!inter) {
        //parametros constructora
        aux2 = p.substring(p.search(':') + 1, p.length) + ' ' + nombre + ', ';
        //definicion constructora
        aux3 = '\n\t\tthis.' + nombre + ' = ' + nombre + ';';
    }

    let aux4 = `\n\tpublic void set${nombre[0].toUpperCase() + nombre.slice(1)}(${p.substring(p.search(':') + 1, p.length) + ' ' + nombre + '){'}`;

    if (!inter) {
        aux4 += `\n\t\tthis.${nombre} = ${nombre};\n\t}`;
    }
    else aux4 += '}';

    aux4 += `\n\tpublic ${p.substring(p.search(':') + 1, p.length)} get${nombre[0].toUpperCase() + nombre.slice(1)}(){`;
    if (!inter) {
        aux4 += `\n\t\treturn ${nombre};\n\t}`;
    }
    else aux4 += '}';

    return [aux, aux2, aux3, aux4]
}

function codearMetodo(m) {
    let aux = m.substring(m.indexOf('(') + 1, m.indexOf(')'));//+', s:a';
    aux = aux.split(',');

    let aux2 = '';
    for (let s of aux) {
        s = s.trim().split(':');
        aux2 += s[1] + ' ' + s[0] + ', ';
    }
    aux2 = aux2.substring(0, aux2.length - 2);

    return `\n\t${(m[0] === '-') ? 'private' : 'public'} ${m.substring(m.indexOf(')') + 2, m.length)} ${m.substring(m.search(' ') + 1, m.indexOf('('))}(${aux2}){\n\t}`
}

document.querySelector('#interface').addEventListener('click', e => {
    document.querySelectorAll('.sinInterface').forEach(nodo => nodo.classList.toggle('hide'));
    // document.querySelector('td.propiedad').classList.toggle('hide');
});

function implementarInterface(e) {
    // e.preventDefault();
    // console.log(e);
    if (!e.target.checked) return
    let n = e.target.value;
    document.querySelector('#propiedad').value = cuadros2[n].propiedades;
    agregar({ target: document.querySelector('#propiedad'), key: 'Enter' });

    document.querySelector('#metodo').value = cuadros2[n].metodos;
    agregar({ target: document.querySelector('#metodo'), key: 'Enter' });

    e.target.addEventListener()
}

// document.querySelector('.ejUml').addEventListener('click', ejUml);
function ejUml(e) {
    // e.preventDefault();
    document.querySelector('#nombreClase').value = 'Cuenta';

    document.querySelector('#propiedad').value = '- numCta:Integer';
    agregar({ target: document.querySelector('#propiedad'), key: 'Enter' });

    document.querySelector('#metodo').value = '+ depositar(monto:Double):void';
    agregar({ target: document.querySelector('#metodo'), key: 'Enter' });

    // document.querySelector('.ejUml').addEventListener('click', ejUml);
};

function borrar(e) {
    cuadros2 = [];
    interfaces = [];
    document.querySelector('#codigoJava').innerHTML = '';
    document.querySelector('#codigoJava').classList.add('hide');
    document.querySelector('.divCuadros').innerHTML = '';
    document.querySelector('select').innerHTML = '<option value=""></option>';
    document.querySelector('.interfaces').innerHTML = '';
}

    // }catch (error) {console.error(error);}
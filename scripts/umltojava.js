// try{
function borrarRow(e) {
    // e.preventDefault();

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    document.querySelector('textarea').value = ej;
};

function modificarRow(e) {
    // e.preventDefault();
    // console.log(e);
    // console.log(e.target.parentNode.firstChild);
    // document.querySelector('textarea').value = ej;
};

document.querySelector('.in').addEventListener('keypress', (e) =>{
    agregar(e);
});

function agregar(e) {
    if(e.key === "Enter"){
        let donde = e.target.id;

        let padre = document.querySelector('.'+donde);

        padre.innerHTML += 
        `<p class='${(donde === 'metodo') ? 'metodos' : 'propiedades'}' ondblclick="modificarRow()">${e.target.value}<input type="button" class='borrarRow ${donde}' value="X"></p>`; 

        // listeners();
        // document.querySelectorAll('.borrarRow.'+donde).forEach(boton => {
            // boton.addEventListener('click', borrarRow);
        // });
        // document.querySelectorAll('td.'+donde+' p').forEach(p => {
        // 	p.addEventListener('dblclick', modificarRow);
        // });
    }
};

function listeners() {
    let ins = document.querySelectorAll('.in');
    // console.log(ins);
    ins.forEach((in1) => {
        // in1.addEventListener('keypress', agregar());		
    })
}

// listeners();
let cuadros2 = [];

// console.log(document.querySelectorAll('.in'));

function agregarClase(e) {
    // e.preventDefault();
    let aux = `<article>
            <table>
            <tr>
                <th>${(document.querySelector('#abstracta').checked) ? `<p class='abstract'>«abstract»</p>` : ''}
                ${((document.querySelector('#herencia').value != '') ? `<p class='padre'>extends:${document.querySelector('#herencia').value}</p>` : '')}
                <p>${document.querySelector('#nombreClase').value}</p>
            </tr>`;
    cuadros2.push(new Object());
    let n = cuadros2.length - 1;
    cuadros2[n].nombre = document.querySelector('#nombreClase').value;
    cuadros2[n].abstracta = document.querySelector('#abstracta').checked;
    cuadros2[n].padre = document.querySelector('#herencia').value;

    cuadros2[n].propiedades = [];
    cuadros2[n].metodos = [];

    document.querySelector('#abstracta').checked = false;
    document.querySelector('#nombreClase').value = '';
    document.querySelector('#herencia').value = '';

    let padre = document.querySelector('.propiedad');
    document.querySelectorAll('.propiedades').forEach(prop => {
        aux += `<tr>
                        <td>${prop.innerText}</td>
                    </tr>`;
        cuadros2[n].propiedades.push(prop.innerText);
        padre.removeChild(prop);
    });

    aux += `<tr>
                    <td><hr></td>
                </tr>`;

    padre = document.querySelector('.metodo');
    document.querySelectorAll('.metodos').forEach(prop => {
        aux += `<tr>
                        <td>${prop.innerText}</td>
                    </tr>`;
        cuadros2[n].metodos.push(prop.innerText);
        padre.removeChild(prop);
    });
    // console.log(cuadros2);
    aux += `</article>`;

    document.querySelector('.divCuadros').innerHTML += aux;

    document.querySelector('select').innerHTML += `<option value="${cuadros2[n].nombre}">${cuadros2[n].nombre}</option>`
    //relistenear -.-
    // listeners();
    // document.querySelector('.agregarClase').addEventListener('click', agregarClase);
}

// document.querySelector('.agregarClase').addEventListener('click', agregarClase);

// document.querySelector('.codear').addEventListener('click', codear);

function codear(e) {
    // e.preventDefault();

    cuadros2.forEach(c => codearClase(c));
}

function codearClase(c) {
    let aux = `public ${(c.abstracta) ? 'abstract ' : ''}class ${c.nombre}${(c.padre != '') ? ' extends '+c.padre : ''}{`;
    let aux2 = '';
    let aux3 = '';
    let aux4 = '';

    for (const p of c.propiedades) {
        // traer func aca?
        [a, a2, a3, a4] = codearPropiedad(p) ; 
        aux += a;
        aux2 += a2;
        aux3 += a3;  
        aux4 += a4; 
    }

    //constructora
    aux += '\n\n\tpublic '+c.nombre+'('+aux2.substring(0, aux2.length-2)+'){'+aux3+'\n\t}';

    //setters y getters
    aux += aux4;
    for (const m of c.metodos) {
        aux += codearMetodo(m) ;   
    }
    // aux += c.propiedades.reduce((p, acum) => acum + codearPropiedad(p));
    // aux += c.metodos.reduce((m, acum) => acum + codearPropiedad(m));
    aux += '\n}';
    // console.log(aux);
    let codigo = document.querySelector('#codigoJava');
    codigo.innerHTML = aux;
}

function codearPropiedad(p) {
    let nombre = p.substring(p.search(' ') + 1, p.search(':'));
    //declaracion propiedades
    let aux = `\n\t${(p[0] === '-') ? 'private' : 'public'} ${p.substring(p.search(':') + 1, p.length)+' '+nombre};`

    //parametros constructora
    let aux2 = p.substring(p.search(':') + 1, p.length)+' '+nombre+', ';
    //definicion constructora
    let aux3 = '\n\t\tthis.'+nombre+' = '+nombre+';';

    let aux4 = `\n\tpublic void set${nombre[0].toUpperCase()+nombre.slice(1)}(${nombre+':'+p.substring(p.search(':') + 1, p.length)+'){'}
        \tthis.${nombre} = ${nombre};\n\t}
        public ${p.substring(p.search(':') + 1, p.length)} get${nombre[0].toUpperCase()+nombre.slice(1)}(){
        \treturn ${nombre} = ${nombre};\n\t}`;
    return [aux, aux2, aux3, aux4]
}

function codearMetodo(m) {
    return `\n\t${(m[0] === '-') ? 'private' : 'public'} ${m.substring(m.indexOf(')') + 2, m.length)} ${m.substring(m.search(' ') + 1, m.indexOf(')')+1)}{\n\t}`
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

    // }catch (error) {console.error(error);}
    // function clase(linea) {
    // 	cuadros2.push([]);

    // 	let n = cuadros2.length-1;

    // 	cuadros2[n].push(new Object());
    // 	cuadros2[n].push([]);

    // 	cuadros[n].push([]);

    // 	cuadros[n][0].p = linea.substring(0, linea.search(' '));
    // 	cuadros[n][0].abstracto = linea.includes('abstract');

    // 	linea = linea.substring(linea.search('class') + 6, linea.length);
    // 	cuadros[n][0].nombre = linea.substring(0, ((linea.search(' ') > 0) ? linea.search(' ')+1 : linea.search('{')));

    // 	if (linea.includes('extends')){
    // 		cuadros[n][0].padre = linea.substring(linea.search('extends') +	7, linea.search('{'));
    // 	}
    // }

    // function propiedad(linea, m) {	
    // 	if (m === 2){
    // 		if (linea.includes('{') && !linea.includes('}')) ignorar = true;
    // 		if (linea.includes('Main')) return;
    // 		if (linea.includes('get') || linea.includes('set')) return;
    // 	}
    // 	let n = cuadros.length-1;

    // 	cuadros[n][m].push(new Object());

    // 	b = cuadros[n][m].length - 1;

    // 	linea = linea.substring(linea.search('p'), linea.length)
    // 	cuadros[n][m][b].p = linea.substring(linea, linea.search(' '));

    // 	if (m === 2 && linea.includes('abstract')){
    // 		cuadros[n][m][b].abstracto = true;
    // 		linea = linea.substring(0, linea.search('abstract')-1)+linea.substring(linea.search('abstract') + 'abstract'.length, linea.length);
    // 	}
    // 	// console.log(linea.substring(linea.search(' ')+1, linea.length));
    // 	//constructor
    // 	if ((b > 0 && m === 2) || m === 1) {
    // 		linea = linea.substring(linea.search(' ')+1, linea.length);		
    // 		cuadros[n][m][b].tipo = linea.substring(0, linea.search(' '));

    // 	}

    // 	// cuadros[n][m][b].tipo = linea.substring(0, linea.search(' '));
    // 	if (m === 1 || linea.includes('()'))
    // 		cuadros[n][m][b].nombre = linea.substring(linea.search(' ')+1, linea.length-1);
    // 	else {
    // 		linea = linea.substring(linea.search(' ')+1, linea.length-1);
    // 		cuadros[n][m][b].nombre = linea.substring(0, ((m === 1) ? linea.length : linea.indexOf('(')));

    // 		linea = linea.substring(linea.indexOf('(')+1, linea.length-1);
    // 		let aux = linea.replace(/,/g, '').split(' ');
    // 		let aux2 = '';

    // 		for(let i = 0; i < aux.length; i += 2){
    // 			aux2 += `${aux[i+1]}:${aux[i]}, `;
    // 		}

    // 		cuadros[n][m][b].parametros = aux2.substring(0, aux2.length-2);
    // 	}


    // }
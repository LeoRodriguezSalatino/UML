clases = {
	p: '',
	abstract: false,
	nombre: ''
}
variable = {
	p: '',
	tipo: '',
	nombre: ''	
}

let cuadros = [];
let codigo = `public class Objeto{
	private int posx;
	private int posy;
	private char direccion;

	public Objeto(int x, int y, char direccion){
		posx = x;
		posy = y;
		this.direccion = direccion;
	}

	public void setPosx(int x){
		posx = x;
	}
	public void setPosy(int y){
		posy = y;
	}
	public void setDireccion(int direccion){
		this.direccion = direccion;
	}

	public int getPosx(){
		return posx;
	}
	public int getPosy(){
		return posy;
	}
	public char getDireccion(){
		return direccion;
	}

	public void irA(int x, int y, char direccion){
		posx = x;
		posy = y;
		this.direccion = direccion;
	}
}

public class Nave extends Objeto{
	private Double velocidad;
	private int vida;
	
	public Nave(int x, int y, char direccion, Double 	velocidad){
		super(x, y, direccion);
		this.velocidad = velocidad;
	}
	
	public void setVida(int vida){
		this.vida = vida;
	}
	public int getVida(){
		return vida;
	}
	@Overrride
	//no se si van this en los set y get
	public void irA(int x, int y, char direccion){
		if (getDireccion() != direccion) girar(direccion);
		setPosx(x);
		setPosy(y);
	}
	public void girar(char direccion){
		setDireccion(direccion);
	}
	public void restaVida(int valor){
		setVida(GetVida() - valor);
	}
}

public class Asteroide{
	private int lesion;

	public Asteroide(int x, int y, char direccion, int lesion){
		super(x, y, direccion);
		this.lesion = lesion;	
	}
	// al pedo este mepa????
	@Overrride
	public void irA(int x, int y, char direccion){
		setPosx(x);
		setPosy(y);
		setDireccion(direccion);
	}
}`;

function cargar(params) {
	
cuadros = [];
codigo = '';
codigo = document.querySelector('#codigo').value;

let lineas = codigo.split('\n');

let ignorar = false;
lineas.forEach(linea => {
	if (ignorar){
		if (linea.includes('}')) {
			ignorar = false;
			return null;
		}
	}else if (!ignorar){
		// linea = borrarT(linea);
    	if (linea.includes('class')) clase(linea);
    	else if ((linea.includes('private'))||linea.includes('public')){
			if (linea.includes('(')) propiedad(linea, 2);
			else propiedad(linea, 1);		 
		}
	}  
	// console.table(cuadros);
})
}

function clase(linea) {
	cuadros.push([]);

	let n = cuadros.length-1;

	cuadros[n].push(new Object());
	cuadros[n].push([]);
	
	// cuadros[n][1].push(new Array());
	// console.log(cuadros[0][1]);
	cuadros[n].push([])
	// cuadros[n][2].push([]);

	cuadros[n][0].p = linea.substring(0, linea.search(' '));
	cuadros[n][0].abstracto = linea.includes('abstract');

	linea = linea.substring(linea.search('class') + 6, linea.length);
	cuadros[n][0].nombre = linea.substring(0, ((linea.search(' ') > 0) ? linea.search(' ')+1 : linea.search('{')));
	// console.log(cuadros[n][0]);
	// return linea;
}

function propiedad(linea, m) {
	// if (m === 2) console.log(linea);
	if (m === 2 && linea.includes('{')) ignorar = true;
	let n = cuadros.length-1;
	
	cuadros[n][m].push(new Object());

	b = cuadros[n][m].length - 1;
	
	linea = linea.substring(linea.search('p'), linea.length)
	cuadros[n][m][b].p = linea.substring(linea, linea.search(' '));

	if (b > 0) {
	linea = linea.substring(linea.search(' ')+1, linea.length);
	cuadros[n][m][b].tipo = linea.substring(0, linea.search(' '));
	}

	cuadros[n][m][b].nombre = linea.substring(linea.search(' ')+1, linea.length-1);
	// console.log(cuadros[n][m]);	
}

// console.log(cuadros[0][1]);
function dibujarCuadro(objeto) {
	let aux = `
	<table class="default" >
		<tr>
    		<th>${objeto[0].nombre}</th>
 		</tr>`;  
	objeto[1].forEach((linea) => aux += `<tr><td>${(linea.p === 'private') ? '-' : '+'} ${linea.nombre}:${linea.tipo}</td></tr>`);
	aux +=	`<tr><td><hr></td></tr>`
	objeto[2].forEach((linea) => aux += `<tr><td>${(linea.p === 'private') ? '-' : '+'} ${linea.nombre}${(linea.tipo) ? ':'+linea.tipo : ''}</td></tr>`);
	aux +=`</table>`;
	document.querySelector('.tablas').innerHTML += aux;
}

function uml(parms) {
	cargar();
	cuadros.forEach(cuadro => dibujarCuadro(cuadro));	
}

function borrarT(linea) {
	while (linea.search('\t') > 0){
		linea = linea.substring(2, linea.length);
		// console.log('1111');
	}
	// console.log(linea);
	return linea;
}


document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
});

document.querySelector('#modelar').addEventListener('click', e => {
	e.preventDefault();
	// console.log(cuadros[0][1]);
	if (document.querySelector('textarea').value === '') alert('Sin códigoooo');
	else uml();	
});

document.querySelector('#reset').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('textarea').value = '';	
})

document.querySelector('#borrarUML').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('textarea').value = '';
	document.querySelector('.tablas').innerHTML = '';	
})
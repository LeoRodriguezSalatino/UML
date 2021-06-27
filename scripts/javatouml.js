function openTab(event, tab) {
	if (document.querySelector('.tab'+tab).classList.contains('hide')){
		document.querySelector('.tabJava').classList.toggle('hide');
		document.querySelector('.tabUml').classList.toggle('hide');

		document.querySelectorAll('.tablinks').forEach(boton => boton.classList.toggle('active'));
	}
}

document.querySelectorAll('textarea').forEach(area => area.addEventListener('focus', e => e.target.select()));
// console.log('1');
clases = {
	p: '',
	abstract: false,
	nombre: '',
	padre: ''
}
variable = {
	p: '',
	tipo: '',
	nombre: ''	
}

let cuadros = [];
let codigo = '';

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
})
}

function clase(linea) {
	cuadros.push([]);

	let n = cuadros.length-1;

	cuadros[n].push(new Object());
	cuadros[n].push([]);
	
	cuadros[n].push([]);

	cuadros[n][0].p = linea.substring(0, linea.search(' '));
	cuadros[n][0].abstracto = linea.includes('abstract');

	linea = linea.substring(linea.search('class') + 6, linea.length);
	cuadros[n][0].nombre = linea.substring(0, ((linea.search(' ') > 0) ? linea.search(' ')+1 : linea.search('{')));

	if (linea.includes('extends')){
		cuadros[n][0].padre = linea.substring(linea.search('extends') +	7, linea.search('{'));
	}
}

function propiedad(linea, m) {	
	if (m === 2){
		if (linea.includes('{') && !linea.includes('}')) ignorar = true;
		if (linea.includes('Main')) return;
		if (linea.includes('get') || linea.includes('set')) return;
	}
	let n = cuadros.length-1;
	
	cuadros[n][m].push(new Object());

	b = cuadros[n][m].length - 1;
	
	linea = linea.substring(linea.search('p'), linea.length)
	cuadros[n][m][b].p = linea.substring(linea, linea.search(' '));

	if (m === 2 && linea.includes('abstract')){
		cuadros[n][m][b].abstracto = true;
		linea = linea.substring(0, linea.search('abstract')-1)+linea.substring(linea.search('abstract') + 'abstract'.length, linea.length);
	}
	// console.log(linea.substring(linea.search(' ')+1, linea.length));
	//constructor
	if ((b > 0 && m === 2) || m === 1) {
		linea = linea.substring(linea.search(' ')+1, linea.length);		
		cuadros[n][m][b].tipo = linea.substring(0, linea.search(' '));
		
	}
	
	// cuadros[n][m][b].tipo = linea.substring(0, linea.search(' '));
	if (m === 1 || linea.includes('()'))
		cuadros[n][m][b].nombre = linea.substring(linea.search(' ')+1, linea.length-1);
	else {
		linea = linea.substring(linea.search(' ')+1, linea.length-1);
		cuadros[n][m][b].nombre = linea.substring(0, ((m === 1) ? linea.length : linea.indexOf('(')));
		
		linea = linea.substring(linea.indexOf('(')+1, linea.length-1);
		let aux = linea.replace(/,/g, '').split(' ');
		let aux2 = '';

		for(let i = 0; i < aux.length; i += 2){
			aux2 += `${aux[i+1]}:${aux[i]}, `;
		}

		cuadros[n][m][b].parametros = aux2.substring(0, aux2.length-2);
	}
	
	
}

function dibujarCuadro(objeto) {
	let aux = `
	<table class="default" >
		<tr>
			<th>${(objeto[0].abstracto) ? `<p class='abstract'>«abstract»</p>` : ''}
			${((objeto[0].padre) ? `<p class='padre'>extends:${objeto[0].padre}</p>` : '')}
			<p>${objeto[0].nombre}</p>
			</th>
 		</tr>`;  
	objeto[1].forEach((linea) => aux += `<tr><td>${(linea.p === 'private') ? '-' : '+'} ${linea.nombre}:${linea.tipo}</td></tr>`);
	aux +=	`<tr><td><hr></td></tr>`
	objeto[2].forEach((linea) => aux += `<tr><td>${(linea.p === 'private') ? '-' : '+'} ${(linea.abstracto) ? 'abstract ' : ''}${linea.nombre}${(linea.parametros) ? `(${linea.parametros})` : ''}${(linea.tipo) ? ':'+linea.tipo : ''}</td></tr>`);
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


// document.querySelectorAll('form').forEach(form .addEventListener('submit', e => {
// 	e.preventDefault();
// });

document.querySelector('#modelar').addEventListener('click', e => {
	e.preventDefault();

	if (document.querySelector('textarea').value === '') alert('Sin códigoooo');
	else uml();	
});

document.querySelector('#reset').addEventListener('click', e => {
	e.preventDefault();

	document.querySelector('textarea').value = '';	
});

document.querySelector('#borrarUML').addEventListener('click', e => {
	e.preventDefault();
	
	document.querySelector('textarea').value = '';
	document.querySelector('.tablas').innerHTML = '';	
});

document.querySelector('#ej').addEventListener('click', e => {
	e.preventDefault();
	
	document.querySelector('textarea').value = ej;
});

document.querySelectorAll('form').forEach(form => {
	form.addEventListener('submit', (e) => e.preventDefault());
});
/////////////////////////uml a java


let ej = `
public class Cliente{
	private Integer numCliente;
	private String apellido;
	private Integer DNI;
	private Integer CUIT;

	public Cliente(Integer numCliente, String apellido, Integer DNI, Integer CUIT){
		
		this.numCliente = numCliente;
		this.apellido = apellido;
		this.DNI = DNI;
		this.CUIT = CUIT;
	}
}

public abstract class Cuenta{
	private Integer numCta;
	private Double saldo;

	public Cuenta(Integer numCta, Double saldo){
		this.numCta = numCta;
		this.saldo = saldo;
	}

	public void depositar(Double monto){
		saldo += monto;
	}
	public abstract void extraerEfectivo(Double monto){
		if ((saldo - monto)>=0) saldo -= monto;
	}
	public Double informarSaldo(){
		return saldo;
	}
}

public class CajaAhorro extends Cuenta{
	private Double tasaInteres;

	public CajaAhorro(Integer numCta, Double saldo, Double tasaInteres){
		super(numCta, saldo);
		this.tasaInteres = tasaInteres;
	}
	public void cobrarInteres(){
		saldo += tasaInteres*saldo;
	}
}

public class CtaCte extends Cuenta{
	private Double descubierto;

	public CtaCte(Integer numCta, Double saldo, Double descubierto){
		super(numCta, saldo);
		this.descubierto = descubierto;
	}
	@override
	public void extraerEfectivo(Double monto){
		if (((saldo+descubierto) - monto)>=0) saldo -= monto;
	}
}
`;

/*
`public class Objeto{
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
}`*/
// CONSTRUCTOR OBJECT
function Persoon(name) {
	this.name = name;

	this.speak = function() {
		console.log('yo im ' + this.name);
	}
}

// PROTOTYPE
Persoon.prototype.walk = function() {
	console.log(this.name + ' is walking')
}

Persoon.prototype.eat = function() {
	console.log(this.name + ' is eating')
}

var bob = new Persoon('bob');
var paul = new Persoon ('paul');

bob.speak();
bob.walk();
paul.eat();

// OBJECT LITERAL
var persoonObject = {
	name: 'Robert Rock',

	speak: function () {
		console.log('yo im ' + this.name);
	},

	walk: function () {
		console.log(this.name + ' is walking')
	},

	eat: function () {
		console.log(this.name + ' is eating')
	}
}

persoonObject.speak();
persoonObject.walk();
persoonObject.eat();


// LOCAL SCOPE
function localScope(){
	var iretator = 1;
	var max = 10;
	var min = 0;
}

var iretator = 1;
var max = 10;
var min = 0;

// CLOSURE IS EIGENLIJK EEN FUNCTION IN EEN FUNCTION
// DE INNERFUNCTION KAN BIJ DE VARIABELE EN REGELS CODE UIT DE OUTERFUNCTION
// DE INNERFUNCTION KAN NOG CODE UITVOEREN NADAT DE OUTERFUNCTION AL ZIJN CODE HEEFT UITGEVOERD
function outerFunction() {
	var outerVar = 'string';

	function innerFunction() {
		var innerVar = outerVar;
		console.log(outerVar);
	}

	innerFunction();
}

outerFunction();

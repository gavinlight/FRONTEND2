function Persoon(name) {
	this.name = name;

	this.speak = function() {
		console.log('yo im' + this.name);
	}
}

var bob = persoon('bob');

bob();
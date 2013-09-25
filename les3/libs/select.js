var select = select || {};
(function(w){
	select.getData = function (data) {
		return document.querySelectorAll(data);
	};

	select.getID = function (ID) {
		return document.getElementById(ID);
	};

	select.getClass = function (classname) {
		return document.getElementsByClassName(classname);
	};
})(window);
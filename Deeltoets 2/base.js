// CREATE A NAMESPACE
var FRISBEEAPP = FRISBEEAPP || {};
// CREATE AN ANONYMOUS FUNCTION
(function(){
	// USE JAVASCRIPT 'STRICT'
	'use strict';

	// CONTROLLER TO CONTROL WHAT THE APP NEEDS TO DO WHEN IT FIRST LAUNCHES
	FRISBEEAPP.controller = {
		init: function () {
			FRISBEEAPP.router.init();
		}
	}

	// ROUTER
	FRISBEEAPP.router = {
		init: function () {
			// USE ROUTIE TO DO CERTAIN STUFF WHEN A PAGE IS ACTIVE IN THE URL
	  		routie({
			    '/schedule': function() {
			    	FRISBEEAPP.page.schedule();
				},
			    '/ranking': function() {
			    	FRISBEEAPP.page.ranking();
			    },
			    '/game': function() {
			    	FRISBEEAPP.page.game();
			    },
			    '/movies': function() {
			    	FRISBEEAPP.page.movies();
			    },
			    // THE DEFAULT PAGE
			    '*': function() {
			    	FRISBEEAPP.page.schedule();
			    }
			});
		},

		change: function () {
			// GET THE ROUTE FROM THE URL
            var route = window.location.hash.slice(2),
                articles = select.dataX('article[data-route]');
            // CHECK IF ROUTE IS NOT DEFINED IN THE URL
            if (!route || route == null || route == undefined || route == '') {
            	// DEFAULT DATA-ROUTE
            	var article = select.dataX('[data-route=schedule]')[0]; 
            	// ADD CLASS 'ACTIVE' TO FIRST ARTICLE DATA-ROUTE
            	articles[0].classList.add('active');
            // CHECK IF ROUTE IS DEFINED IN THE URL
            } else {
            	// DATA-ROUTE ACCORDING TO THE URL
            	var article = select.dataX('[data-route=' + route + ']')[0];
            	// HIDE ALL ARTICLES
        		for (var i=0; i < articles.length; i++){
        			articles[i].classList.remove('active');
        		}
        		// CHECK IF ARTICLE IS NOT DEFINED
        		if (!article || article == null || article == undefined || article == '') {
        			// ADD CLASS 'ACTIVE' TO THE FIRST ARTICLE
        			articles[0].classList.add('active');
        		} else {
        			// ADD CLASS 'ACTIVE' TO THE ARTICLE DEFINED IN THE URL
        			article.classList.add('active');
        		}
            }
		}
	};

	// PAGES
	FRISBEEAPP.page = {
		schedule: function () {
			// MANIPULATE THE JSON OBJECT TO CREATE NEW VALUES
			var directives = {
				items: {
					team1: {
						class: function(params) {
							// GIVE CLASS 'WINNER' TO THE WINNING TEAM
							if (parseInt(this.team1Score) > parseInt(this.team2Score)) {
								return('winner');
							}
						}
					},
					team2: {
						class: function(params) {
							// GIVE CLASS 'WINNER' TO THE WINNING TEAM
							if (parseInt(this.team1Score) < parseInt(this.team2Score)) {
								return('winner');
							}
						}
					}
				}
			}
			// USE TRANSPARENCY TO ADD THE JSON DATA TO THE MATCHING HTML ELEMENTS
			Transparency.render(select.dataX('[data-route=schedule]')[0], FRISBEEAPP.schedule, directives);
			// CALL THE CHANGE FUNCTION TO CHANGE PAGES
			FRISBEEAPP.router.change();
		},

		ranking: function () {
			var pools = new XMLHttpRequest();
			pools.onreadystatechange = function (response) {
				if (pools.readyState != 4 || pools.status != 200) return;
				var json = JSON.parse(pools.responseText);
				// var directives = {
				// 	objects: {
				// 		pools: {
				// 			id: function (params) {
				// 				return this.id;
				// 			}
				// 		},
				// 		poolGames: {
				// 			id: function (params) {
				// 				return this.id;
				// 			}
				// 		}
				// 	}
				// }
				console.log(select.dataX('[data-route=ranking]')[0]);
				Transparency.render(select.dataX('[data-route=ranking]')[0], json);
				console.log(json);
				
			}
			pools.open("GET", "https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=5b98cd1c1b", true);
			pools.send();

			
			// CALL THE CHANGE FUNCTION TO CHANGE PAGES
			FRISBEEAPP.router.change();			
		},

		game: function () {
			// MANIPULATE THE JSON OBJECT TO CREATE NEW VALUES ACCORDING TO THE PAGE
			// PUT THE OBJECT OF THE ARRAY IN A VAR TO NOT REPEAT YOURSELF
			var	lastItem = FRISBEEAPP.game['items'][FRISBEEAPP.game['items'].length - 1],
   				directives = {
				team1Head: {
					text: function(params) {
						return lastItem['team1'];
					},
					class: function(params) {
						// CHECK WHAT TEAM IS THE WINNER
						if (parseInt(lastItem['team1Score']) > parseInt(lastItem['team2Score'])) {
							return('winner');
						}
					}
				},
				finalScore1: {
					text: function(params) {
						return lastItem['team1Score'];
					}
				},
				finalScore2: {
					text: function(params) {
						return lastItem['team2Score'];
					}
				},
				team2Head: {
					text: function(params) {
						return lastItem['team2'];
					},
					class: function(params) {
						// CHECK WHAT TEAM IS THE WINNER
						if (parseInt(lastItem['team1Score']) < parseInt(lastItem['team2Score'])) {
							return('winner');
						}
					}
				},
			}
			// USE TRANSPARENCY TO ADD THE JSON DATA TO THE MATCHING HTML ELEMENTS
			Transparency.render(select.dataX('[data-route=game]')[0], FRISBEEAPP.game, directives);
			// CALL THE CHANGE FUNCTION TO CHANGE PAGES
			FRISBEEAPP.router.change();
		},
	}

	
	// CHECK IF THE DOM IS READY
	domready(function () {
		// INITIALIZE CONTROLLER
		FRISBEEAPP.controller.init();
	});
// MAKE THE FUNCTION GET CALLED BY ITSELF
})();
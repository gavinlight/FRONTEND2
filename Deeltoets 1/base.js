// CREATE A NAMESPACE
var FRISBEEAPP = FRISBEEAPP || {};
// CREATE AN ANONYMOUS FUNCTION
(function(){
	// USE JAVASCRIPT 'STRICT'
	'use strict';

	// JSON DATA OBJECT
	FRISBEEAPP.schedule = {
		items: [
		    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
	    ]
	};
	// JSON DATA OBJECT
	FRISBEEAPP.ranking = {
		items: [
		    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
		    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
		    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
		    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
		    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
	    ]
	};
	// JSON DATA OBJECT
	FRISBEEAPP.game = {
		items: [
			{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
			{ score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
			{ score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
			{ score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
			{ score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
			{ score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
			{ score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
			{ score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
			{ score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
			{ score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
			{ score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
			{ score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
			{ score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
			{ score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
			{ score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
			{ score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
			{ score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
			{ score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
			{ score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
			{ score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
			{ score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
			{ score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
			{ score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	    ]
	};

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
			// MANIPULATE THE JSON OBJECT TO CREATE A NEW VALUE
   			var directives = {
				items: {
					ScoreDiff: {
						text: function(params) {
							// CALCULATE THE GOAL DIFFERENCE OF A TEAM
							return (this.Pw - this.Pl);
						}
					}
				}
			}
			// USE TRANSPARENCY TO ADD THE JSON DATA TO THE MATCHING HTML ELEMENTS
			Transparency.render(select.dataX('[data-route=ranking]')[0], FRISBEEAPP.ranking, directives);
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

		movies: function() {
			majaX({url:'http://www.dennistel.nl/movies', method:'get'}, function(json) {
				var output = json;
				console.log(output);
				Transparency.render(select.dataX('[data-route=movies]')[0], output);
			});	
		}
	}

	
	// CHECK IF THE DOM IS READY
	domready(function () {
		// INITIALIZE CONTROLLER
		FRISBEEAPP.controller.init();
	});
// MAKE THE FUNCTION GET CALLED BY ITSELF
})();
// Create a namespace
var FRISBEEAPP = FRISBEEAPP || {};
// Create an anonymous function
(function(){
	// Use javascript strict mode
	'use strict';

	// Control what happens when the app first launches 
	FRISBEEAPP.controller = {
		init: function () {
			// Call the router to check the url
			FRISBEEAPP.router.init();

			// Check if the url changes
			window.onhashchange = function() {
				FRISBEEAPP.router.init();
			}

			FRISBEEAPP.interaction.init();
		}
	}

	// Router
	FRISBEEAPP.router = {
		init: function () {
			// Check for the current page and call functions according to that
			var router = window.location.hash.split( '/' )[1];
			console.log(router);
			// Put the current page variable in a switch and check the values
			switch (router) {
				case 'schedule':
					FRISBEEAPP.page.schedule();
				break;
				case 'pools':
					FRISBEEAPP.page.pools();
				break;
				case 'games':
					FRISBEEAPP.page.game();
				break;
				// Set the default value if router doesnt equal any of the above
				default:
					FRISBEEAPP.page.pools();
			}
		},

		change: function () {
			// Turn the error message off
			select.ID('error').style.display = 'none';
			// Turn the loader on
            select.className('main')[0].classList.add('active');
            // Turn the articles off
            var articles = select.dataX('article[data-route]');
            for (var i=0; i < articles.length; i++){
    			articles[i].classList.remove('active');
    		}
    		var poolGamesList = select.className('poolGames');
    		for (var i=0; i < poolGamesList.length; i++){
    			poolGamesList[i].classList.remove('active');
    		}
		},

		finishAjax: function() {
			// Check if the route in the url is set
			var route = window.location.hash.split( '/' )[1];
			console.log(route);
			// Turn the proper articles on
			if (!route || route == null || route == undefined || route == '') {
				var article = select.dataX('[data-route=pools]')[0]; 
			} else {
				var article = select.dataX('[data-route=' + route + ']')[0];
			}
			article.classList.add('active');
			// Turn the loader off
			select.className('main')[0].classList.remove('active');
		}
	};

	// User interaction with buttons
	FRISBEEAPP.interaction = {
		init: function () {
			FRISBEEAPP.interaction.menuToggle();
			FRISBEEAPP.interaction.swipeUpRefresh();
			FRISBEEAPP.interaction.cancelUpdateGames();
			FRISBEEAPP.interaction.alertButton();
			FRISBEEAPP.interaction.updateGames();
			FRISBEEAPP.interaction.swipeUpdateScore();
		},

		menuToggle: function () {
			// jQuery's toggle function. Toggle between display block and none
			var button = select.className('navbar-toggle')[0];
			button.onclick = function() {
				console.log(select.className('navbar-collapse')[0].style);
				var menu = select.className('navbar-collapse')[0];
				if (menu.style.length == 0) {
					anim(menu, {height:  93}, 0.5, "ease-in");
				} else if (menu.style.height == "1px") {
					anim(menu, {height:  93}, 0.5, "ease-in");
				} else {
					anim(menu, {height:  1}, 0.5, "ease-in");
				}
			}
		},

		poolGames: function() {
			var buttons = select.className('poolGameButton');
			// Loop through all the buttons
			for (var i=0;i < buttons.length; i++) {
				// Check if someone clicked on the button
				buttons[i].onclick = function() {
					var thisId = this.id,
						// http://stackoverflow.com/questions/13831974/return-only-text-after-last-underscore-in-javascript-string
						// Get the id from the clicked button. Then split that id in two and get everything after the "_"
						poolId = thisId.substr(thisId.lastIndexOf("_") + 1);
						console.log(poolId);
					// Turn the loader on
					select.nested('article#pools'+poolId+' i.loader').classList.add('active');
					var	poolGames = new XMLHttpRequest();
					poolGames.onreadystatechange = function () {
						if (poolGames.readyState != 4 || poolGames.status != 200) return;
						var jsonGames = JSON.parse(poolGames.responseText);
						var directives = {
							objects: {
								date: {
									text: function(params){
										var startTime = new Date(this.start_time);
										var date = startTime.getFullYear() + "/" + startTime.getMonth() + "/" + startTime.getDate();
										return date;
									}
								},
								update: {
									href: function(params){
										// Use the gameId to create a unique url for all the games
										return window.location.pathname + "#/games/" + this.id;
									}
								}
							}
						}
						Transparency.render(select.ID("poolGames" + poolId), jsonGames, directives);
						// Turn the loader off and turn the table on
						select.nested('article#pools'+poolId+' i.loader').classList.remove('active');
						select.ID("poolGames" + poolId).classList.add('active');
					};
					poolGames.open("GET", "https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id="+poolId+"&limit=200&fields=%5Bid%2Cstart_time%2Cteam_1%2Cteam_1_score%2Cteam_2%2Cteam_2_score%2Cpool%5D&access_token=c936024490", true);
					poolGames.send(null);		
				}
			}	
		},

		updateGames: function() {
			var submitButton = select.ID('submit');
			select.ID('error').style.display = 'none';
			submitButton.onclick = function() {
				FRISBEEAPP.router.change();
				var	updateGames = new XMLHttpRequest(),
					// Get all the values from the fields and the game id from the url
					gameId = window.location.hash.split( '/' )[2],
					team1Score = select.ID('team1Score').value,
					team2Score = select.ID('team2Score').value,
					finalScore = select.ID('finalScore').checked,
					// Stringify the values from the field
					postData = JSON.stringify({
                        game_id: gameId,
                        team_1_score: team1Score,
                        team_2_score: team2Score,
                        is_final: finalScore,
                        // Extra field to give good feedback
                        what_happened: "Score succesfully updated!"
                    });
                    console.log(postData);
				updateGames.open("POST", "https://api.leaguevine.com/v1/game_scores/", true);
				updateGames.onreadystatechange = function () {
					if (updateGames.readyState == 4 || updateGames.status == 200) {
						var jsonUpdate = JSON.parse(updateGames.responseText);
						console.log(jsonUpdate);
						// Check if Leaguevine gives an error back
						if (jsonUpdate.errors == undefined) {
							select.className('succes')[0].style.display = 'block';
							select.className('errors')[0].style.display = 'none';
							// Display the the proper winner. If ther isn't one, display "Even"
							if (jsonUpdate.team_1_score > jsonUpdate.team_2_score) {
								var winnerCheck = function(params) { return "Winner: " + this.team_1.name;};
							} else if (jsonUpdate.team_1_score < jsonUpdate.team_2_score) {
								var winnerCheck = function(params) { return "Winner: " + this.team_2.name;};
							} else if (jsonUpdate.team_1_score == jsonUpdate.team_2_score) {
								var winnerCheck = function(params) { return "Winner: Even"};
							}
							var directives = {
								score: {
									html: function(params){
										var score = this.team_1.name + " <span class='bold'>" + this.team_1_score + " - " + this.team_2_score + "</span> " + this.team_2.name;
										return score;
									}
								},
								date: {
									text: function(params){
										var startTime = new Date(this.time);
										var date = startTime.getFullYear() + "/" + startTime.getMonth() + "/" + startTime.getDate();
										return date;
									}
								},
								winnerName: {
									text: winnerCheck
								}
							}
							Transparency.render(select.dataX('[data-route=updateGames]')[0], jsonUpdate, directives);
						} else {
							select.className('succes')[0].style.display = 'none';
							select.className('errors')[0].style.display = 'block'
							var directives = {
								// Display the proper error for the proper field
								errors: {
									team1Error: {
										text: function(params){
											if (this.team_1_score == undefined) {
												return "Succes";
											} else {
												return this.team_1_score[0];
											}
										}
									},
									team2Error: {
										text: function(params){
											if (this.team_2_score == undefined) {
												return "Succes";
											} else {
												return this.team_2_score[0];
											}
										}
									}
								}
							}
							Transparency.render(select.ID('error'), jsonUpdate, directives);
						}
						select.ID('error').style.display = 'block';
						
						FRISBEEAPP.router.finishAjax();
					};
				};
				// Set the request headers	
				updateGames.setRequestHeader('Content-type','application/json');
                updateGames.setRequestHeader('Authorization','bearer ab3ae3ba06');
                // Send the post data to the leaguevine API
				updateGames.send(postData);
			}	
		},

		cancelUpdateGames: function() {
			// Reset all the values if the cancelbutton is clicked
			var cancelButton = select.ID('cancel');
			cancelButton.onclick = function() {
				select.ID('team1Score').value = "";
				select.ID('team2Score').value = "";
				select.ID('finalScore').checked = false;
			}
		},

		alertButton: function() {
			// Close the error message if the X button is clicked
			var alertButton = select.dataX('[data-dismiss="alert"]')[0];
			alertButton.onclick = function() {
				select.ID('error').style.display = 'none';
			}
		},

		swipeUpRefresh: function() {
			window.onscroll = function() {
				//console.log(scrollY);
				if (window.scrollY == 0) {
					console.log(1);
					var body = document.body;
					Hammer(body).on("swipeup", function(event) {
						FRISBEEAPP.interaction.router();
		   			});
				} else if (window.scrollY != 0) {
					//window.scrollY = window.scrollY;
					console.log(2);
					var body = document.body;
					Hammer(body).on("swipeup", function(event) {
						FRISBEEAPP.interaction.router();
		   			});
				}
			}

			var body = document.body;
			Hammer(body).on("swipeup", function(event) {
				FRISBEEAPP.router.init();
   			});	
		},

		swipeUpdateScore: function() {
			var body = select.nested('section.update_score');
			var hammertime = Hammer(body).on("swipeleft", function(event) {
				event.preventDefault();
				console.log('swipel');
				var field = select.ID('team1Score');
       			field.value++;
       			return false;
   			}, false);
   			var hammertime = Hammer(body).on("swiperight", function(event) {
  				event.preventDefault();
   				console.log('swiper');
   				var field = select.ID('team2Score');
       			field.value++;
       			return false;
   			}, false);
		}
	};

	// Pages
	FRISBEEAPP.page = {
		schedule: function () {
			// Change pages function
			FRISBEEAPP.router.change();
			// Start Ajax call		
			var schedule = new XMLHttpRequest();
			// Check if the values in the ajax call change
			schedule.onreadystatechange = function () {
				// Check if something has been returned by the leaguevine API
				if (schedule.readyState != 4 || schedule.status != 200) return;
				// Parse the returned JSON object
				var jsonSchedule = JSON.parse(schedule.responseText);
				// Use directives to manipulate the json object
				var directives = {
					objects: {
						date: {
							text: function(params){
								var startTime = new Date(this.start_time);
								var date = startTime.getFullYear() + "/" + startTime.getMonth() + "/" + startTime.getDate();
								return date;
							}
						},
						update: {
							href: function(params){
								// Create a unique game page for all the games
								return window.location.pathname + "#/games/" + this.id;
							}
						}
					}
				}
				// Render the returned JSON object and the directives
				Transparency.render(select.dataX('[data-route=schedule]')[0], jsonSchedule, directives);
				// Get rid of the loader
				FRISBEEAPP.router.finishAjax();
			}
			// Open the AJAX Call. Parameters: Type, url and ajax = true or false
			schedule.open("GET", "https://api.leaguevine.com/v1/games/?tournament_id=19389&limit=200&fields=%5Bid%2Cstart_time%2Cteam_1%2Cteam_1_score%2Cteam_2%2Cteam_2_score%2Cpool%5D&access_token=c936024490", true);
			// Send something back to the server (Has to be done otherwise you don't get anything back)
			schedule.send(null);
		},

		game: function() {
			// Load the proper functions
			FRISBEEAPP.router.change();

			// Get the game id from the url
			var gameId = window.location.hash.split( '/' )[2];
			console.log(gameId);
			var game = new XMLHttpRequest();
			game.onreadystatechange = function () {
				if (game.readyState != 4 || game.status != 200) return;
				var jsonGame = JSON.parse(game.responseText);
				// Check if the returned JSON object contains 'winner'
				console.log(jsonGame.objects[0].winner);
				if (jsonGame.objects[0].winner == null) {
					// Return even if the score is tied
					var winnerCheck = function(params) { return "Winner: Even";};
				} else if (jsonGame.objects[0].winner != null) {
					// Return the name of the winner if there is one
					var winnerCheck = function(params) { return "Winner: " + this.winner.name;};
				}
				var directives = {
					objects: {
						winnerName: {
							text: winnerCheck
						},
						score: {
							html: function(params){
								var score = this.team_1.name + " <span class='bold'>" + this.team_1_score + " - " + this.team_2_score + "</span> " + this.team_2.name;
								return score;
							}
						},
						date: {
							text: function(params){
								// Display date properly
								var startTime = new Date(this.start_time);
								var date = startTime.getFullYear() + "/" + startTime.getMonth() + "/" + startTime.getDate();
								return date;
							}
						}
					}
				};
				Transparency.render(select.dataX('[data-route=games]')[0], jsonGame, directives);
				FRISBEEAPP.router.finishAjax();
			}
			// Use the game id to load the proper game from the API
			game.open("GET", "https://api.leaguevine.com/v1/games/?game_ids=%5B"+gameId+"%5D&fields=%5Bwinner%2C%20team_1%2C%20team_1_score%2C%20team_2%2C%20team_2_score%2C%20start_time%2C%20id%5D&access_token=304eb564c7", true);
			game.send(null);
		},

		pools: function () {
			// Change pages function
			FRISBEEAPP.router.change();

			var poolIds = new XMLHttpRequest();
			poolIds.onreadystatechange = function () {
				if (poolIds.readyState != 4 || poolIds.status != 200) return;
				var jsonIds = JSON.parse(poolIds.responseText);
				// Get all the ids from the pools and put them in an array
				var poolIdArray = [];
				for (var i=0;i < jsonIds['objects'].length; i++) {
					poolIdArray.push(jsonIds['objects'][i]['id']);
				}
				
				// Use directives to create the html we can later render
				var directives = {
					objects: {
						pools: {
							id: function(params){
								return "pools" + this.id;
							},
						},
						poolGames: {
							id: function(params){
								return "poolGames" + this.id ;
							}
						},
						button: {
							id: function(params){
								return "btn_" + this.id;
							},
							class: function(params) {
								return 'poolGameButton btn btn-small';
							}
						}
					}
				}
				Transparency.render(select.dataX('[data-route=pools]')[0], jsonIds, directives);	

				// Loop through all the pools
				for (var i=0; i < poolIdArray.length; i++) {
					var pools = new XMLHttpRequest(); 
					pools.onreadystatechange = function () {	
						if (pools.readyState != 4 || pools.status != 200) return;
						var jsonPools = JSON.parse(pools.responseText);
						// Use the current array position to render the JSON in the proper HTML
						Transparency.render(select.ID("pools" + poolIdArray[i]), jsonPools);
					}
					FRISBEEAPP.router.finishAjax();
					// Use the current array position to make the proper call
					// AJAX is false. You can't do asynchronous calls when you need to loop through an array synchronous
					pools.open("GET", "https://api.leaguevine.com/v1/pools/"+poolIdArray[i]+"/?fields=%5Bid%2C%20name%2C%20standings%5D&limit=200&access_token=d7987fba58", false);
					pools.send(null);
				}
				// Load the poolGames function
				FRISBEEAPP.interaction.poolGames();
			}
			poolIds.open("GET", "https://api.leaguevine.com/v1/pools/?tournament_id=19389&fields=%5Bid%5D&access_token=5096b416b0", true);
			poolIds.send(null);		
		}
	};
	
	// Check if the dom is ready
	domready(function () {
		// Initialize controller
		FRISBEEAPP.controller.init();
	});
// Make the function call itself
})();
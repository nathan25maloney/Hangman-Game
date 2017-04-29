



	




var game = {
	choices: ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran","nidorina","nidoqueen","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machamp","machoke","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew" ],
	guess: "",
	isGoodGuess: false,
	isRepeatGuess: false,
	badGuess: "",
	word: [],
	wins: 0,
	loses: 0,
	computerChoice: "",
	isStillOn: true,
	isALetter: true,
	
// creates the computers choice 
	randomChoice: function() {
		var choice = Math.floor(Math.random()* game.choices.length);
		game.computerChoice = game.choices[choice];

	},


// the main function
	run: function(){
		game.randomChoice();
		game.wordHolder();
		var jesse = document.getElementById('jesse');
		if (jesse && jesse.style) {
			jesse.style.height= '15px';
			jesse.style.width = '9px'
		}
		var james = document.getElementById('james');
		if (james && james.style) {
			james.style.height= '15px';
			james.style.width = '9px'
		}

		document.onkeyup = function(event){

			game.guess = String.fromCharCode(event.keyCode).toLowerCase();
			game.guessChecker(game.guess);
			game.letterChecker(game.guess);

			if (game.isGoodGuess) {
				game.correctGuess();
				console.log("success!");
				for (var i = 0; i < game.word.length; i++) {
					if (game.word[i] === " _ "){
						game.isStillOn = true;
						break;
					}  else {
						game.isStillOn = false;
					}
				}

				if (game.isStillOn){

				} else {
					game.wins = game.wins +1;
					document.getElementById("Wins").innerHTML = game.wins;
					document.getElementById("userChoice").innerHTML = "You caught it!  Press r to try and catch them all!";
					game.guess= "";
					game.isGoodGuess= false;
					game.isRepeatGuess= false;
					game.badGuess= "";
					game.word= [];
					game.computerChoice= "";
					game.isStillOn= true;
					document.onkeyup = function(newgame) {
					      var letter = String.fromCharCode(newgame.keyCode).toLowerCase();

					      if (letter === "r"){
					        game.run();
					        document.getElementById("userChoice").innerHTML = "______________";
					      }
					      
					    }

				}

			} else if(game.isRepeatGuess) {
				console.log("You already guessed that");
			} else if(!game.isALetter){
				console.log("You didn't click an acceptable character!");

			} else {


				//add call to function that shows more of the hangman with each bad guess
				game.badGuess = (game.badGuess+" "+game.guess);
				document.getElementById("userChoice").innerHTML = game.badGuess;
				var height = 15 * game.badGuess.length;
				var width = 9 * game.badGuess.length;
				if (james && james.style) {

					james.style.height= height +'px';
					james.style.width = width +'px';
				}
				if (jesse && jesse.style) {
					jesse.style.height= height +'px';
					jesse.style.width = width +'px';
				}
			};


			if (game.badGuess.length > 19) {
				game.loses = game.loses +1;
				document.getElementById("Loses").innerHTML = game.loses;
				document.getElementById("userChoice").innerHTML = "The pokemon was "+game.computerChoice+ "!  Alas, it was caught by team rocket.  Press r to try again";
				game.guess= "";
				game.isGoodGuess= false;
				game.isRepeatGuess= false;
				game.badGuess= "";
				game.word= [];
				game.computerChoice= "";
				game.isStillOn= true;
				document.onkeyup = function(newgame) {
				      var letter = String.fromCharCode(newgame.keyCode).toLowerCase();

				      if (letter === "r"){
				        game.run();
				        document.getElementById("userChoice").innerHTML = "______________";
				      }
				      
				    }
			}


			
		}
		
	},

	letterChecker: function(strValue) {
		game.isALetter = true;
		var objRegExp  = /^[a-z]+$/;
		if(objRegExp.test(strValue)){
			game.isALetter = true;
		} else {
			game.isALetter = false;
		}
		console.log(game.isALetter);
		return game.isALetter;
	},
		


		

	wordHolder: function() {
		for (var i = 0; i < game.computerChoice.length; i++) {
			game.word[i] = " _ ";
		}

		document.getElementById("computerChoice").innerHTML = game.word.join("");
	},


//takes correct guess and reaveals it. 
	correctGuess: function() {
		for (var i = 0; i <= game.computerChoice.length; i++) {
				if (game.computerChoice.charAt(i) == game.guess) {
					game.word[i] = game.guess;
					if (i === 0){
						game.word[i] = game.guess.toUpperCase();
					}
				} 
				document.getElementById("computerChoice").innerHTML = game.word.join("");
				
			};

	},


//checks if guess is good
	guessChecker: function(guess){
		for (var i = 0; i <= game.computerChoice.length; i++) {
				var char = game.computerChoice.charAt(i);
				if (guess == char) {
					game.isGoodGuess = true;
					break;
				} else {
					game.isGoodGuess = false;
					
				}
			}
		for (var i = 0; i < game.badGuess.length; i++) {
				var char = game.badGuess.charAt(i);

				if (guess == char) {
					game.isRepeatGuess = true;
					break;
				} else {
					game.isRepeatGuess = false;
					
				}
			}	
		return game.isGoodGuess;
		return game.isRepeatGuess;
	},

	

}



//starts the game

document.onkeyup = function(event) {
      var letter = String.fromCharCode(event.keyCode).toLowerCase();

      if (letter === "r"){
        game.run();
      }
      
    }

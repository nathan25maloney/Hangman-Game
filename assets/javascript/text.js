//Get the computers choice
	var computerChoice = Math.random();
	if (computerChoice <= 0.2) {
	    computerChoice = "rock";
	} else if (computerChoice <= 0.4) {
	    computerChoice = "paper";
	} else if (computerChoice <= 0.6) {
	    computerChoice = "scissors";
	} else if (computerChoice <= 0.8) {
	    computerChoice = "lizard";
	} else {
	    computerChoice = "spock";
	}

	
	//Get the users choice, normalising to lower case    
	document.onkeyup = function(event) {
	  var stringChoice = "trying ";
	  var arrayChoice = [];
	  var userChoice = String.fromCharCode(event.keyCode).toLowerCase();
	  arrayChoice.push(userChoice);
	  for (var i = 0; i < arrayChoice.length; i++) {

	  	stringChoice = stringChoice.concat(" ", arrayChoice[i]);
	  }
	   	document.getElementById("userChoice").innerHTML = stringChoice;
     }

      
    

	//Check for a tie
	if(computerChoice == userChoice){
	    
	    ties += 1;
	    
	//Check for a valid choice
	}else if(choices[userChoice] === undefined){
	    alert("Invalid Choice");
	}else{
	    //Get the chosen one as an object
	    console.log(choices[userChoice]);
	    userChoice = choices[userChoice];
	    console.log(userChoice);
	    console.log(userChoice.defeats.indexOf(computerChoice));
	    //Improved check, inspired by Mke Spa Guy
	    var victory = userChoice.defeats.indexOf(computerChoice) > -1;


	    //Display result
	    if(victory) {
	        
	        wins += 1;
	        

	    }else{
	        
	        loses += 1;
	        
	    }   
	}


document.getElementById("Wins").innerHTML = wins;
document.getElementById("Loses").innerHTML = loses;
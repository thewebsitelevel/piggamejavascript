/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gameplaying;

function newgame(){
    scores =[0,0];
    roundScore= 0;
    activePlayer =0;

    // console.log(dice);
    document.getElementById("score-0").textContent ="0";
    document.getElementById("score-1").textContent ="0";
    document.getElementById("current-0").textContent ="0";
    document.getElementById("current-1").textContent ="0";

    document.querySelector('.dice').style.display = "none";
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
    gameplaying=true;

}

newgame();

document.querySelector(".btn-roll").addEventListener('click', function(){
    // 1. caluclate the dice value
        if(gameplaying){
            dice = Math.floor(Math.random()*6)+1;

        //2. Display the dice image
        var diceDOM =document.querySelector(".dice");
        diceDOM.style.display= "block";
        diceDOM.src = "dice-"+dice +".png";

        //3. Update the scores respectively
        if(dice !== 1){
            roundScore += dice;
            document.querySelector("#current-"+ activePlayer).textContent =roundScore;
        }else{
            nextPlayer();
        }
    }

})


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gameplaying){
            //update current core to global score
        scores[activePlayer] += roundScore;

        //update the ui of global score
        document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];

        //check if the user won
        if(scores[activePlayer] >=100 ){
            document.querySelector('#name-'+activePlayer).textContent = "WINNER";
            document.querySelector('.dice').style.display = "none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            gameplaying=false;

        }else{
            nextPlayer();
        }
    }
    
})


function nextPlayer(){
        activePlayer=== 0 ? activePlayer =1 : activePlayer=0;
        roundScore=0;

        document.getElementById("current-0").textContent ="0";
        document.getElementById("current-1").textContent ="0";

        document.querySelector('.dice').style.display = "none";

        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
}

// document.querySelector("#current-"+ activePlayer).textContent= dice;
// document.querySelector("#current-"+ activePlayer).innerHTML= "<em>"+ dice+ "<em/>";

document.querySelector(".btn-new").addEventListener("click", function(){
    newgame();
})


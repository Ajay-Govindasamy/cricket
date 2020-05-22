/*** loads the timer initially ***/
document.getElementById("hit2").disabled = true;
var starTimer = function () {
    var timeleft = 60;
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("hit1").disabled = true;
            document.getElementById("hit2").disabled = false;
            clearInterval(downloadTimer);
        }
        document.getElementById("timer").innerHTML = timeleft.toString();
        timeleft -= 1;
    }, 1000);
};
window.onload = starTimer;
//Players class
var Player = /** @class */ (function () {
    function Player(name) {
        var _this = this;
        this.innings = [];
        //each ball score
        this.ballScore = function (ball) {
            _this.innings.push(ball);
        };
        //adds the score for each ball
        this.inningScore = function () {
            return _this.innings.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
        };
        this.name = name;
    }
    return Player;
}());
//Teams Class
var Teams = /** @class */ (function () {
    function Teams(name) {
        var _this = this;
        this.teamScore = [];
        this.allowPlayer = function (n) {
            _this.teamScore.push(n);
        };
        //total team score
        this.totalScore = function () {
            var player_Score = [];
            _this.teamScore.forEach(function (playerInnings) {
                player_Score.push(playerInnings.inningScore());
            });
            return player_Score.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
        };
        /*** returns the highest score ***/
        this.highestScore = function () {
            return _this.teamScore.sort(function (a, b) { return b.inningScore() - a.inningScore(); })[0];
        };
        this.name = name;
    }
    return Teams;
}());
//Intialting objects for each team
var india = new Teams('india');
var pakistan = new Teams('pakistan');
//India Batting
var cellNumber = 0;
var list_of_players = [];
for (var i = 1; i < 11; i++) {
    list_of_players.push(new Player("player" + i));
}
list_of_players.forEach(function (player) { return india.allowPlayer(player); });
var currentPlayer = 0;
var colVal = Math.ceil(cellNumber / 6);
var india_Total_Score = "";
var sec1 = 0;
/*** PLAYERS STRIKING LOGIC ***/
var hit1 = function () {
    if (cellNumber < 60) {
        var randomNumber = Math.floor(Math.random() * 7); //randomScore
        list_of_players[currentPlayer].ballScore(randomNumber);
        colVal = Math.ceil(++cellNumber / 6);
        var player_Score = document.getElementById("b" + cellNumber);
        player_Score.innerHTML += randomNumber;
        if (randomNumber == 0) {
            player_Score.innerHTML = "OUT";
            player_Score.style.color = "red";
        }
        var totalScore = document.getElementById("p" + colVal + "tot");
        totalScore.innerHTML = list_of_players[currentPlayer].inningScore();
        if (cellNumber % 6 === 0) {
            currentPlayer++;
        }
        else if (randomNumber === 0) { //if the player is out, move the cell of the current player to last and next player comes in
            cellNumber += 6 - (cellNumber % 6);
            currentPlayer++;
        }
        document.getElementById("team1Score").innerHTML = india.totalScore().toString();
        india_Total_Score = india.totalScore().toString();
    }
    else {
        document.getElementById("hit2").disabled = false;
        document.getElementById("hit1").disabled = true;
        return;
    }
};
//Pakistan Batting
var cellNumberP2 = 0;
var current_pak_player = 0;
var pak_Players_list = [];
for (var i = 1; i < 11; i++) {
    pak_Players_list.push(new Player("player" + i));
}
pak_Players_list.forEach(function (i) { return pakistan.allowPlayer(i); });
var pakTotalScore = "";
var sec2 = 0;
var hit2 = function () {
    if (cellNumberP2 < 60) {
        var ranNum = Math.floor(Math.random() * 7);
        pak_Players_list[current_pak_player].ballScore(ranNum);
        var colValP2 = Math.ceil(++cellNumberP2 / 6);
        var pak_Player_Score = document.getElementById("bc" + cellNumberP2);
        pak_Player_Score.innerHTML += ranNum;
        if (ranNum == 0) {
            pak_Player_Score.innerHTML = "OUT";
            pak_Player_Score.style.color = "red";
        }
        var pak_Total_Score = document.getElementById("p" + colValP2 + "ctot");
        pak_Total_Score.innerHTML = pak_Players_list[current_pak_player].inningScore();
        if (cellNumberP2 % 6 === 0) {
            current_pak_player++;
        }
        else if (ranNum === 0) {
            cellNumberP2 += 6 - (cellNumberP2 % 6);
            current_pak_player++;
        }
        document.getElementById("team2Score").innerHTML = pakistan.totalScore().toString();
        pakTotalScore = pakistan.totalScore().toString();
    }
    else {
        // Declaring the result and the best player
        var bestPlayer = 0;
        var teamWon = "";
        var manOfTheMatch = "";
        india_Total_Score > pakTotalScore ? ((teamWon = 'INDIA has won the match', bestPlayer = 1)) : ((teamWon = 'PAKISTAN has won the match', bestPlayer = 2));
        bestPlayer == 1 ? manOfTheMatch = india.highestScore().name : manOfTheMatch = pakistan.highestScore().name;
        document.getElementById("hit2").disabled = true;
        alert(teamWon + "\n" + "MAN OF THE MATCH: " + manOfTheMatch);
    }
};
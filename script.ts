
/*** loads the timer initially ***/
( < HTMLInputElement > document.getElementById("hit2")).disabled = true;
let starTimer = () => {
    let timeleft = 60;
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            ( < HTMLInputElement > document.getElementById("hit1")).disabled = true;
            ( < HTMLInputElement > document.getElementById("hit2")).disabled = false;
            clearInterval(downloadTimer);
        }
        document.getElementById("timer").innerHTML = timeleft.toString();
        timeleft -= 1;
    }, 1000);
}

window.onload = starTimer;


//Players class
class Player {
    name: string;
    innings: number[] = [];

    constructor(name: string) {
        this.name = name;
    }
    //each ball score
    ballScore = (ball: number) => {
        this.innings.push(ball);

    }
    //adds the score for each ball
    inningScore = () => {
        return this.innings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

}

//Teams Class
class Teams {
    name: string;
    teamScore: Player[] = [];

    constructor(name: string) {
        this.name = name;
    }

    allowPlayer = (n: Player) => {
        this.teamScore.push(n);
    }

    //total team score
    totalScore = () => {
        let player_Score: number[] = [];
        this.teamScore.forEach((playerInnings) => {
            player_Score.push(playerInnings.inningScore());
        })
        return player_Score.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    }

    /*** returns the highest score ***/
    highestScore = () => {
        return this.teamScore.sort((a, b) => b.inningScore() - a.inningScore())[0]
    }
}

//Intialting objects for each team
let india = new Teams('india');
let pakistan = new Teams('pakistan');


//India Batting
let cellNumber = 0;
let list_of_players = [];
for (let i = 1; i < 11; i++) {
    list_of_players.push(new Player(`player${i}`));
}
list_of_players.forEach((player) => india.allowPlayer(player));
let currentPlayer = 0;
let colVal = Math.ceil(cellNumber / 6);
let india_Total_Score = "";
let sec1 = 0;

/*** PLAYERS STRIKING LOGIC ***/
let hit1 = () => {

    if (cellNumber < 60) {
        let randomNumber: number = Math.floor(Math.random() * 7); //randomScore
        list_of_players[currentPlayer].ballScore(randomNumber);
        colVal = Math.ceil(++cellNumber / 6)
        let player_Score: HTMLElement = document.getElementById(`b${cellNumber}`);
        player_Score.innerHTML += randomNumber;
        if (randomNumber == 0) {
            player_Score.innerHTML = "OUT";
            player_Score.style.color = "red";
        }

        let totalScore: HTMLElement = document.getElementById(`p${colVal}tot`);
        totalScore.innerHTML = list_of_players[currentPlayer].inningScore();


        if (cellNumber % 6 === 0) {
            currentPlayer++;
        } else if (randomNumber === 0) { //if the player is out, move the cell of the current player to last and next player comes in
            cellNumber += 6 - (cellNumber % 6);
            currentPlayer++;
        }

        ( < HTMLElement > document.getElementById("team1Score")).innerHTML = india.totalScore().toString();
        india_Total_Score = india.totalScore().toString();
    } else {
        ( < HTMLInputElement > document.getElementById("hit2")).disabled = false;
        ( < HTMLInputElement > document.getElementById("hit1")).disabled = true;
        return;
    }

}

//Pakistan Batting
let cellNumberP2 = 0;
let current_pak_player = 0;
let pak_Players_list = [];
for (let i = 1; i < 11; i++) {
    pak_Players_list.push(new Player(`player${i}`));
}
pak_Players_list.forEach((i) => pakistan.allowPlayer(i));
let pakTotalScore = "";
let sec2 = 0;
let hit2 = () => {

    if (cellNumberP2 < 60) {
        let ranNum: number = Math.floor(Math.random() * 7);
        pak_Players_list[current_pak_player].ballScore(ranNum);
        let colValP2 = Math.ceil(++cellNumberP2 / 6);

        let pak_Player_Score: HTMLElement = document.getElementById(`bc${cellNumberP2}`);
        pak_Player_Score.innerHTML += ranNum;

        if (ranNum == 0) {
            pak_Player_Score.innerHTML = "OUT";
            pak_Player_Score.style.color = "red";
        }

        let pak_Total_Score: HTMLElement = document.getElementById(`p${colValP2}ctot`);
        pak_Total_Score.innerHTML = pak_Players_list[current_pak_player].inningScore();

        if (cellNumberP2 % 6 === 0) {
            current_pak_player++;
        } else if (ranNum === 0) {
            cellNumberP2 += 6 - (cellNumberP2 % 6);
            current_pak_player++;
        }
        ( < HTMLElement > document.getElementById("team2Score")).innerHTML = pakistan.totalScore().toString();
        pakTotalScore = pakistan.totalScore().toString();

    } else {
        // Declaring the result and the best player
        let bestPlayer = 0;
        let teamWon = "";
        let manOfTheMatch = "";
        india_Total_Score > pakTotalScore ? ((teamWon = 'INDIA has won the match', bestPlayer = 1)) : ((teamWon = 'PAKISTAN has won the match', bestPlayer = 2))
        bestPlayer == 1 ? manOfTheMatch = india.highestScore().name : manOfTheMatch = pakistan.highestScore().name;
        ( < HTMLInputElement > document.getElementById("hit2")).disabled = true;
        alert(teamWon + "\n" + "MAN OF THE MATCH: " + manOfTheMatch);
    }
}
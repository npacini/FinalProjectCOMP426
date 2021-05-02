let clickedSquares = 0;
let potentialPrize = 0;
let wonPrize = 0;

function setUpLottery(){
    document.getElementById("login").innerHTML = `
    <div id="heading" class = "userTitle">
        <img src="Images/us-dollar-coin-color.png" class="coins"> 
        <p id="coincount" class="coincount">${numCoins}</p>
        <p id="welcome" class="welcome">Scratch Off</p>
        <img src="Images/home-button.png" class="home" onclick="loadPage()"> 
    </div>

    <div class="slotRules">
        <h1>Scratch Off Rules</h1>
        <h2>
            - $100 to play!<br><br>
            - Click on the Prize square to reveal potential prize!<br><br>
            - Get three 🍌 and win prize shown!<br><br>
            - Get three 🍏 and win 2x prize shown!<br><br>
            - Get three 🍎 and win 5x prize shown!<br><br>

        </h2>
    </div>

    <div class = "ticket">
        <div id="ticketHeader" class="ticketHeader">
            <div id="luckyNum" class="prize" onclick="revealPrize()">Prize</div>
        </div>
        
        <div class="square" id="square1" onclick="square1Clicked()"></div>
        <div class="square" id="square2" onclick="square2Clicked()"></div>
        <div class="square" id="square3" onclick="square3Clicked()"></div>
        <div class="square" id="square4" onclick="square4Clicked()"></div>

        <div class="square" id="square5" onclick="square5Clicked()"></div>
        <div class="square" id="square6" onclick="square6Clicked()"></div>
        <div class="square" id="square7" onclick="square7Clicked()"></div>
        <div class="square" id="square8" onclick="square8Clicked()"></div>

        <div class="square" id="square9" onclick="square9Clicked()"></div>
        <div class="square" id="square10" onclick="square10Clicked()"></div>
        <div class="square" id="square11" onclick="square11Clicked()"></div>
        <div class="square" id="square12" onclick="square12Clicked()"></div>

        <div class="square" id="square13" onclick="square13Clicked()"></div>
        <div class="square" id="square14" onclick="square14Clicked()"></div>
        <div class="square" id="square15" onclick="square15Clicked()"></div>
        <div class="square" id="square16" onclick="square16Clicked()"></div>
    </div>

    <div id="ticketButtonDiv">
        <div id="ticketButton">
            <button class="ticketButton" onclick="buyTicket()"> Buy Scratch Off </button>
        </div>
    </div>

    <div id="topFooter">
    </div>
    `;
    document.getElementById("luckyNum").style.backgroundColor='white';
}

function revealPrize(){
    let prizeSquare = document.getElementById("luckyNum");

    if(prizeSquare.style.backgroundColor!='white'){
        let prize = (Math.floor(Math.random()/.1)+1)*100;

        prizeSquare.style.backgroundColor='white';
        prizeSquare.innerHTML=`$${potentialPrize}`;
    }

}

function colorSquares(){
    document.getElementById("ticketHeader").style.backgroundColor='rgb(138, 215, 152)';
    for(let i = 1; i <= 16; i++){
        
            document.getElementById(`square${i}`).style.backgroundColor='rgb(199, 255, 209)';
        
        
    document.getElementById(`square${i}`).innerHTML='';
    }
    clickedSquares = 0;
}

function square1Clicked(){populateSquare(document.getElementById("square1"));}
function square2Clicked(){populateSquare(document.getElementById("square2"));}
function square3Clicked(){populateSquare(document.getElementById("square3"));}
function square4Clicked(){populateSquare(document.getElementById("square4"));}
function square5Clicked(){populateSquare(document.getElementById("square5"));}
function square6Clicked(){populateSquare(document.getElementById("square6"));}
function square7Clicked(){populateSquare(document.getElementById("square7"));}
function square8Clicked(){populateSquare(document.getElementById("square8"));}
function square9Clicked(){populateSquare(document.getElementById("square9"));}
function square10Clicked(){populateSquare(document.getElementById("square10"));}
function square11Clicked(){populateSquare(document.getElementById("square11"));}
function square12Clicked(){populateSquare(document.getElementById("square12"));}
function square13Clicked(){populateSquare(document.getElementById("square13"));}
function square14Clicked(){populateSquare(document.getElementById("square14"));}
function square15Clicked(){populateSquare(document.getElementById("square15"));}
function square16Clicked(){populateSquare(document.getElementById("square16"));}

function populateSquare(square){

    if(square.style.backgroundColor=='rgb(199, 255, 209)'){
        square.style.backgroundColor='white';

        let num = (Math.floor(Math.random() * 25));
        console.log(num)
        if(num == 9){
            square.innerHTML='🍎';
        }
        else if(num == 8 || num == 7){
            square.innerHTML='🍏';
        }
        else if(num == 6 || num == 5 || num == 4){
            square.innerHTML='🍌';
        }
        else{
            square.innerHTML='🥔';
        }
        clickedSquares++;
    }
    if(clickedSquares == 16){
        endGame();
    }
}

function buyTicket(){
    numCoins-= 100;
    firebase.database().ref('coins/'+loggedInUser.uid).set({
        Coins: numCoins
    });
    document.getElementById("coincount").innerHTML = numCoins;
    document.getElementById("luckyNum").style.backgroundColor='rgb(216, 216, 216)';
    document.getElementById("luckyNum").innerHTML='Prize';
    document.getElementById("ticketButton").innerHTML = "";
    potentialPrize = (Math.floor(Math.random()/.1)+1)*100;
    colorSquares();
}

function endGame(){
    let redApples = 0;
    let greenApples = 0;
    let bananas = 0;
    let winner = false;

    for(let i = 1; i <= 16; i++){
        let square = document.getElementById(`square${i}`);
        if(square.innerHTML == '🍎'){
            redApples++;
        }
        else if(square.innerHTML == '🍏'){
            greenApples++;
        }
        else if(square.innerHTML == '🍌'){
            bananas++;
        }
    }

    if(redApples >= 3){
        winner = true;
        wonPrize = potentialPrize*5;
    }
    else if(greenApples >= 3){
        winner = true;
        wonPrize = potentialPrize*2;
    }
    else if(bananas >= 3){
        winner = true;
        wonPrize = potentialPrize;
    }

    if(winner){
        document.getElementById("ticketButton").innerHTML = `
            <button id="but" class="ticketButton" onclick="claimPrize()"> Claim Prize! </button>
            `;
        document.getElementById("but").style.backgroundColor='lightgreen';
    }
    else{
        document.getElementById("ticketButton").innerHTML = `
            <button class="ticketButton" onclick="buyTicket()"> Buy Scratch Off </button>
        `;
    }
}

function claimPrize(){
    numCoins+= wonPrize;
    document.getElementById("coincount").innerHTML = numCoins;

    document.getElementById("ticketButton").innerHTML = `
            <button id="but" class="ticketButton" onclick="buyTicket()"> Buy Scratch Off </button>
        `;


    for(let i = 1; i <= 16; i++){
        document.getElementById(`square${i}`).innerHTML='';
        document.getElementById(`square${i}`).style.backgroundColor='white';
    }
    document.getElementById("luckyNum").innerHTML='Prize';
    document.getElementById("luckyNum").style.backgroundColor = 'white';
    document.getElementById("ticketHeader").style.backgroundColor = 'white';

    firebase.database().ref('coins/'+loggedInUser.uid).set({
        Coins: numCoins
    });
}
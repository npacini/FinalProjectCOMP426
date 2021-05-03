
let deckID;
let cardCount = 0;
let dealerCardCount = 0;
let userValue = 0;
let dealerValue = 0;
let dealersFirstCard = "";
let dAce = 0;
let uAce = 0;

function setUpBlackjack(){
    document.getElementById("login").innerHTML = `
    <div id="heading" class = "userTitle">
        <img src="Images/us-dollar-coin-color.png" class="coins"> 
        <p id="coincount" class="coincount">${numCoins}</p>
        <p id="welcome" class="welcome">Blackjack</p>
        <img src="Images/home-button.png" class="home" onclick="loadPage()"> 
    </div>

    <div class="slotRules">
        <h1>Blackjack Rules</h1>
        <h2>
            - $50 buy in!<br><br>
            - Get the value of your cards as close to 21 without going over.<br><br>
            - Face cards worth 10.<br><br>
            - Aces worth 1 or 11.<br><br>
            - Beat the dealer and win $100!<br><br>
            - Get Blackjack and win $150!<br><br>
        </h2>
    </div>

    <div class = "dealerHand">
        <div class="dealer1" id="d1"></div>
        <div class="dealer2" id="d2"></div>
        <div class="dealer3" id="d3"></div>
        <div class="dealer4" id="d4"></div>
        <div class="dealer5" id="d5"></div>
        <div class="dealer6" id="d6"></div>
        <div class="dealer7" id="d7"></div>
        <div class="dealer8" id="d8"></div>
    </div>

    <div class = "userHand">
        <div class="card1" id="c1"></div>
        <div class="card2" id="c2"></div>
        <div class="card3" id="c3"></div>
        <div class="card4" id="c4"></div>
        <div class="card5" id="c5"></div>
        <div class="card6" id="c6"></div>
        <div class="card7" id="c7"></div>
        <div class="card8" id="c8"></div>
    </div>

    <div id="bjButtons">
        <button class="deal" onclick="deal2()"> Deal! </button>
    </div>

    `;
    
    shuffleNewHand();
}

function shuffleNewHand(){
    let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
        deckID = data.deck_id;
        cardCount=0;
        dealerCardCount=0;
        userValue=0;
        dealerValue=0;
        uAce=0;
    });

}

function deal2(){

    if(numCoins >= 50){
        // reset
        for(let i = 1; i <= 8; i++){
            document.getElementById(`c${i}`).innerHTML=``;
            document.getElementById(`d${i}`).innerHTML=``;
        }

        let url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`;

        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            // pay
            numCoins-=50;
            document.getElementById("coincount").innerHTML = numCoins;
            firebase.database().ref('coins/'+loggedInUser.uid).set({
                Coins: numCoins
            });

            let card1 = data.cards[0];
            document.getElementById("c1").innerHTML=`
                <img src=${card1.image}>
            `

            let card2 = data.cards[1];
            document.getElementById("c2").innerHTML=`
                <img src=${card2.image}>
            `
            cardCount+=2;

            document.getElementById("bjButtons").innerHTML=`
                <button class="stand" onclick="stand()"> Stand </button>
                <button class="hit" onclick="deal()"> Hit! </button>
            `
            userValue += returnValue(card1);
            userValue += returnValue(card2);

            let card3 = data.cards[2];
            dealersFirstCard=card3.image;
            document.getElementById("d1").innerHTML=`
                <img src='Images/card-backing.jpeg'>
            `
            let card4 = data.cards[3];
            document.getElementById("d2").innerHTML=`
            <img src=${card4.image}>
            `
            dealerValue += returnValueD(card3);
            dealerValue += returnValueD(card4);
            dealerCardCount+=2;
            checkCards();

        });
    }else{
        alert("Not enough coins!");
    }
}

function deal(){
    let url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
        cardCount++;
        let card = data.cards[0];
        document.getElementById(`c${cardCount}`).innerHTML=`
            <img src=${card.image}>
        `
        userValue += returnValue(card);
        checkCards();
    });
    
}

function stand(){

    if(dealerValue < 17){
        let url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            dealerCardCount++;
            let card = data.cards[0];
            document.getElementById(`d${dealerCardCount}`).innerHTML=`
                <img src=${card.image}>
            `
            dealerValue += returnValueD(card);
            document.getElementById("d1").innerHTML=`
                <img style="width:5.2vw" src='${dealersFirstCard}'>
            `
            document.getElementById("d1").innerHTML=`
            <img style="width:5.2vw" src='${dealersFirstCard}'>
            `
            if(userValue > dealerValue){
                document.getElementById("bjButtons").innerHTML=`
                    <button class="busted" style="background-color:lightgreen" onclick="deal2()"> You win!<br>Play Again? </button>
                `
                numCoins+=100;
                document.getElementById("coincount").innerHTML = numCoins;
                firebase.database().ref('coins/'+loggedInUser.uid).set({
                    Coins: numCoins
                });
            }
            else if(dealerValue > 21){
                document.getElementById("bjButtons").innerHTML=`
                    <button class="busted" style="background-color:lightgreen" onclick="deal2()"> Dealer went over!<br>Play Again? </button>
                `
                numCoins+=100;
                document.getElementById("coincount").innerHTML = numCoins;
                firebase.database().ref('coins/'+loggedInUser.uid).set({
                    Coins: numCoins
                });
            }
            else if(userValue == dealerValue){
                document.getElementById("bjButtons").innerHTML=`
                    <button class="busted" style="background-color:lightred" onclick="deal2()"> Tie goes to the dealer.<br>Play Again? </button>
                `
            }
            else{
                document.getElementById("bjButtons").innerHTML=`
                    <button class="busted" style="background-color:lightred" onclick="deal2()"> Dealer wins.<br>Play Again? </button>
                `
            }
            shuffleNewHand()
        });
    }else{
        document.getElementById("d1").innerHTML=`
            <img style="width:5.2vw" src='${dealersFirstCard}'>
        `
        if(userValue > dealerValue){
            document.getElementById("bjButtons").innerHTML=`
                <button class="busted" style="background-color:lightgreen" onclick="deal2()"> You win!<br>Play Again? </button>
            `
            numCoins+=100;
            document.getElementById("coincount").innerHTML = numCoins;
            firebase.database().ref('coins/'+loggedInUser.uid).set({
                Coins: numCoins
            });
        }
        else if(dealerValue > 21){
            document.getElementById("bjButtons").innerHTML=`
                <button class="busted" style="background-color:lightgreen" onclick="deal2()"> Dealer went over!<br>Play Again? </button>
            `
            numCoins+=100;
            document.getElementById("coincount").innerHTML = numCoins;
            firebase.database().ref('coins/'+loggedInUser.uid).set({
                Coins: numCoins
            });
        }
        else if(userValue == dealerValue){
            document.getElementById("bjButtons").innerHTML=`
                <button class="busted" style="background-color:lightred" onclick="deal2()"> Tie goes to the dealer.<br>Play Again? </button>
            `
        }
        else{
            document.getElementById("bjButtons").innerHTML=`
                <button class="busted" style="background-color:lightred" onclick="deal2()"> Dealer wins.<br>Play Again? </button>
            `
        }
        shuffleNewHand()
    }
       
}

function returnValue (c){
    if(c.value == "2"){return 2;}
    if(c.value == "3"){return 3;}
    if(c.value == "4"){return 4;}
    if(c.value == "5"){return 5;}
    if(c.value == "6"){return 6;}
    if(c.value == "7"){return 7;}
    if(c.value == "8"){return 8;}
    if(c.value == "9"){return 9;}
    if(c.value == "10"){return 10;}
    if(c.value == "KING"){return 10;}
    if(c.value == "QUEEN"){return 10;}
    if(c.value == "JACK"){return 10;}
    if(c.value == "ACE"){
        uAce++;
        return 11;
    }
}

function returnValueD (c){
    if(c.value == "2"){return 2;}
    if(c.value == "3"){return 3;}
    if(c.value == "4"){return 4;}
    if(c.value == "5"){return 5;}
    if(c.value == "6"){return 6;}
    if(c.value == "7"){return 7;}
    if(c.value == "8"){return 8;}
    if(c.value == "9"){return 9;}
    if(c.value == "10"){return 10;}
    if(c.value == "KING"){return 10;}
    if(c.value == "QUEEN"){return 10;}
    if(c.value == "JACK"){return 10;}
    if(c.value == "ACE"){return 11;}
}

function checkCards(){
    if(userValue>21 && uAce == 0){
        shuffleNewHand();
        document.getElementById("bjButtons").innerHTML=`
            <button class="busted" onclick="deal2()"> Busted!<br>Play Again? </button>
        `
    }
    if(userValue>21 && uAce >= 0){
        uAce--;
        userValue-=10;
    }
    if(userValue==21){
        shuffleNewHand();
        document.getElementById("bjButtons").innerHTML=`
            <button class="busted" style="background-color:lightgreen" onclick="deal2()"> Blackjack!<br>Play Again? </button>
        `
        numCoins+=150;
        document.getElementById("coincount").innerHTML = numCoins;
        firebase.database().ref('coins/'+loggedInUser.uid).set({
            Coins: numCoins
        });
    }
}
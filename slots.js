function setUpSlots(){
    document.getElementById("login").innerHTML = `
    <div id="heading" class = "userTitle">
        <img src="Images/us-dollar-coin-color.png" class="coins"> 
        <p id="coincount" class="coincount">${numCoins}</p>
        <p id="welcome" class="welcome">Slots</p>
        <img src="Images/home-button.png" class="home" onclick="loadPage()"> 
    </div>

    <div class="slotRules">
        <h1>Slots Rules</h1>
        <h2 style="font-size: 1.25vw">
            - $15 to play!<br><br>
            - Get two of the same number and win 10x that amount!<br><br>
            -Get three of the same number and win 75x that amount!<br>
        </h2>
    </div>

    <div class = "slots">
        <div class="slot" id="slot1">9</div>
        <div class="slot" id="slot2">8</div>
        <div class="slot" id="slot3">7</div>
    </div>

    <button class="spin" onclick="spin()">Spin!</button>

    <div id="topFooter">
    </div>
    `;}

function spin(){
    if(numCoins >= 15){
        numCoins -= 15;
        document.getElementById("coincount").innerHTML = numCoins;
        document.getElementById("topFooter").innerHTML=``;

        let num1 = Math.floor((Math.random() * 10))
        let num2 = Math.floor((Math.random() * 10))
        let num3 = Math.floor((Math.random() * 10))

        document.getElementById("slot1").innerHTML = num1;
        document.getElementById("slot2").innerHTML = num2;
        document.getElementById("slot3").innerHTML = num3;

        if(num1==num2 && num1==num3){
            numCoins += num1*75;
            document.getElementById("topFooter").innerHTML=`
            <div id="footer" class = "footer">
                <p id="gainz" class="gains">$${num1*75}</p>
            </div>
            `;
        }
        else if(num1==num2){
            numCoins += num1*10;
            document.getElementById("topFooter").innerHTML=`
            <div id="footer" class = "footer">
                <p id="gainz" class="gains">$${num1*10}</p>
            </div>
            `;
        }
        else if(num1==num3){
            numCoins += num1*10;
            document.getElementById("topFooter").innerHTML=`
            <div id="footer" class = "footer">
                <p id="gainz" class="gains">$${num1*10}</p>
            </div>
            `;
        }
        else if(num3==num2){
            numCoins += num2*10;
            document.getElementById("topFooter").innerHTML=`
            <div id="footer" class = "footer">
                <p id="gainz" class="gains">$${num2*10}</p>
            </div>
            `;
        }
        document.getElementById("coincount").innerHTML = numCoins;
        firebase.database().ref('coins/'+loggedInUser.uid).set({
            Coins: numCoins
        });
    }else{
        alert("Not enough coins!");
    }
}


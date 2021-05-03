
function loadPage(){
    document.getElementById("login").innerHTML = `
    <div id="heading" class = "userTitle">
        <img src="Images/us-dollar-coin-color.png" class="coins"> 
        <p id="coincount" class="coincount">${numCoins}</p>
        <p id="welcome" class="welcome"></p>
        <img src="Images/logout-line.png" class="exit" onclick="logout()"> 
    </div>

    <div class="chat">
        <h1>Recent News</h1>
        <div class="newsArticles">
            <div id="i1"></div><p class="news" id="n1">-</p><hr>
            <div id="i2"></div><p class="news" id="n2">-</p><hr>
            <div id="i3"></div><p class="news" id="n3">-</p><hr>
            <div id="i4"></div><p class="news" id="n4">-</p><hr>
        </div>
        <select id="topics" name="topics" class="topics">
            <option value="Lottery">Lottery</option>
            <option value="Casino">Casino</option>
            <option value="Blackjack">Blackjack</option>
            <option value="Slot Machine">Slot Machine</option>
            <option value="Gambling">Gambling</option>
            <option value="Cards">Cards</option>
            <option value="Lucky">Lucky</option>
            <option value="Ticket">Ticket</option>
            <option value="Prize">Prize</option>
            <option value="Game">Game</option>
        </select>
        <button onclick="search()" class="search"> Search! </button>
    </div>

    <div class = "tiles">
        <div class="tile" style="background-color: lightgrey" onclick="setUpBlackjack()">
            <img src="Images/cards.png" class="icon" onclick=""> 
        </div>
        <div class="tile" style="background-color: turquoise" onclick="setUpLottery()">
            <img src="Images/scratch-off.png" class="tileScratchOff" onclick=""> 
        </div>
        <div class="tile" style="background-color: lavender" onclick="setUpSlots()">
            <img src="Images/slot-machine.png" class="tileSlots" onclick=""> 
        </div>
    </div>

    <div class="leaderboard">
        <h1><br>Buy More Coins!</h1>
            <img src="Images/us-dollar-coin-color.png" class="coins2"> 
            <p class="thousand">1000 </p><br>
            <p class="cents99">$0.99 </p>
        </h2>
        <div onclick="buy()" id="buy" class="paypal1"></div>
    </div>

    <div id="redBackground">
        <img class="themeRed" src="Images/Background_04.jpeg" onclick="redSelected()"> 
    </div>
    <div id="whiteBackground">
        <img class="themeWhite" src="Images/Background_03.jpg" onclick="whiteSelected()"> 
    </div>
    `;
    document.getElementById("welcome").innerHTML = `Welcome, ${loggedInUser.displayName}!`;
    if(background == "white"){
        document.getElementById("background").innerHTML = `
            <img class="backgroundIMG" src="Images/Background_03.jpg">    
        `;
    }else if(background == "red"){
        document.getElementById("background").innerHTML = `
            <img class="backgroundIMG" src="Images/Background_04.jpeg">    
        `;
    }

    firebase.database().ref('coins/'+loggedInUser.uid).on('value', function(snapshot){
        numCoins=snapshot.val().Coins;
        document.getElementById("coincount").innerHTML = numCoins;
    });

    paypal.Buttons({
        style:{
            shape:'pill'
        },
        createOrder:function(d, actions){
            return actions.order.create({
                purchase_units: [{
                    amount:{
                        value:'0.99'
                    }
                }]
            })
        }, 
        onApprove: function(d, actions){
            return actions.order.capture().then(function(details){
                numCoins += 1000;
                document.getElementById("coincount").innerHTML = numCoins;
        
                alert("Thank you for your purchase! You've been credited 1000 coins.");

                firebase.database().ref('coins/'+loggedInUser.uid).set({
                    Coins: numCoins
                });
            })
        }
    }).render(document.getElementById("buy"));
    search();
}

function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        document.getElementById("login").innerHTML=`
        <div class="login-card" id="login-card">
                <div class="card-title" id="cardTitleLabel">
                    Login
                </div>

                <br>

                <div class="content">
                    <input id="email" placeholder="Email" class="inputLine" type="email"/>
                    <input id="password" placeholder="Password" class="inputLine" type="password"/>

                    <br>
                    <br>
                    <button class="SignUp-Button" onclick="signup()" id="go">Sign Up</button>
                    <button class="Go-Button" onclick="login()" id="signup">Go</button>

                    <br>
                    <br>
                    <br>
                    <p id="message" class="errorMessage"></p>
                </div>
            </div>
        `;
        document.getElementById("background").innerHTML = `
            <img src="Images/Homescreen.jpeg" class="backgroundIMG"> `;

      }).catch((error) => {
        // An error happened.
        alert(error.message);
      });    
}

function redSelected(){
    document.getElementById("background").innerHTML = `
        <img class="backgroundIMG" src="Images/Background_04.jpeg">    
    `;
    firebase.database().ref('background/'+loggedInUser.uid).set({
        Background: "red"
    });}

function whiteSelected(){
    document.getElementById("background").innerHTML = `
        <img class="backgroundIMG" src="Images/Background_03.jpg">    
    `;
    firebase.database().ref('background/'+loggedInUser.uid).set({
        Background: "white"
    });
}

function search(){
    let news1 = document.getElementById("n1");
    let news2 = document.getElementById("n2");
    let news3 = document.getElementById("n3");
    let news4 = document.getElementById("n4");
    
    let img1 = document.getElementById("i1");
    let img2 = document.getElementById("i2");
    let img3 = document.getElementById("i3");
    let img4 = document.getElementById("i4");

    let topic = document.getElementById("topics").value;
    let api = "Kmc7ewxjY3DBzLgkmPD4GQSuK0njXjUY";
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=${api}`;

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        if(data.status=="OK"){
            let articles = data.response.docs;
            console.log(data)

            if(articles[0].multimedia.length > 0){
                img1.innerHTML = `<img class="photo" src=https://www.nytimes.com/${articles[0].multimedia[0].url}>`
            }else{
                img1.innerHTML = `<div class="ph">No<br>Image</div>`
            }
            if(articles[1].multimedia.length > 0){
                img2.innerHTML = `<img class="photo" src=https://www.nytimes.com/${articles[1].multimedia[0].url}>`
            }else{
                img2.innerHTML = `<div class="ph">No<br>Image</div>`
            }
            if(articles[2].multimedia.length > 0){
                img3.innerHTML = `<img class="photo" src=https://www.nytimes.com/${articles[2].multimedia[0].url}>`
            }else{
                img3.innerHTML = `<div class="ph">No<br>Image</div>`
            }
            if(articles[3].multimedia.length > 0){
                img4.innerHTML = `<img class="photo" src=https://www.nytimes.com/${articles[3].multimedia[0].url}>`
            }else{
                img4.innerHTML = `<div class="ph">No<br>Image</div>`
            }

            news1.innerHTML = `<a href=${articles[0].web_url} target="_blank">${articles[0].headline.main} </a>`
            news2.innerHTML = `<a href=${articles[1].web_url} target="_blank">${articles[1].headline.main} </a>`
            news3.innerHTML = `<a href=${articles[2].web_url} target="_blank">${articles[2].headline.main} </a>`
            news4.innerHTML = `<a href=${articles[3].web_url} target="_blank">${articles[3].headline.main} </a>`
        }else{
            alert("Sorry, the free New York Times API only allows for 10 searches per minute!");
        }
    })
}

function buy(){
    let buyButton = document.getElementById("buy");
    console.log(paypal.Buttons().render(buyButton));

}

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
            <option value="Casino">Casino</option>
            <option value="Blackjack">Blackjack</option>
            <option value="Slot Machine">Slot Machine</option>
            <option value="Lottery">Lottery</option>
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
        <h1>Leaderboard</h1>
        <h2>
            <p id="p1">Player1</p>
            <p id="p2">Player2</p>
            <p id="p3">Player3</p>
            <p id="p4">Player4</p>
            <p id="p5">Player5</p>
        </h2>
        <button onclick="update()"> update </button>
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
    let api = "962f27b37f754cd8be6d370d4006f819";
    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${api}`;



    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        let articles = data.articles;
        console.log(data)
        
        img1.innerHTML = `<img class="photo" src=${articles[0].urlToImage}>`
        img2.innerHTML = `<img class="photo" src=${articles[1].urlToImage}>`
        img3.innerHTML = `<img class="photo" src=${articles[2].urlToImage}>`
        img4.innerHTML = `<img class="photo" src=${articles[3].urlToImage}>`

        news1.innerHTML = `<a href=${articles[0].url} target="_blank">${articles[0].title} </a>`
        news2.innerHTML = `<a href=${articles[1].url} target="_blank">${articles[1].title} </a>`
        news3.innerHTML = `<a href=${articles[2].url} target="_blank">${articles[2].title} </a>`
        news4.innerHTML = `<a href=${articles[3].url} target="_blank">${articles[3].title} </a>`

    })
}


function update(){
    const http = require('http').createServer();

    const io = require('socket.io')(http, {
        cors: { origin: "*" }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('message', (message) =>     {
            console.log(message);
            io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
        });
    });

    http.listen(8080, () => console.log('listening on http://localhost:8080') );

}
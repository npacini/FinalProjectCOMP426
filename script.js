

$(function() {
  const $form = $('#login-form');
  const $message = $('#message');

  $form.submit(function(e) {
    e.preventDefault();

    $message.html('');

    const data = $form.serializeArray().reduce((o, x) => {
      o[x.name] = x.value;
      return o;
    }, {});
    
    $.ajax({
      url: 'https://comp426-1fa20.cs.unc.edu/sessions/login',
      type: 'POST',
      data,
      xhrFields: {
          withCredentials: true,
      },
    }).then(() => {
      $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
      setUpScene();
    }).catch(() => {
      $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    });
  });
});

let tweetsGlobal;

let bodyDiv = document.getElementById("body");
let nextButton = document.getElementById("next");
let backButton = document.getElementById("back");

let box1;
let box2;
let box3;
let box4;

let likeButton1;
let likeButton2;
let likeButton3;
let likeButton4;

let retweet1;
let retweet2;
let retweet3;
let retweet4;

let reply1;
let reply2;
let reply3;
let reply4;

let tweetID1 = -1;
let tweetID2 = -1;
let tweetID3 = -1;
let tweetID4 = -1;

let tweetButton;
let cancelButton;
let submitButton;

let numTweeters = 0;

async function setUpScene(){
  tweetsGlobal=await getTweets();
  let htmlstr = `<div id="root" class="root">
    <div id  = "title" class="title">
        <h1 style="padding-top: 1%;">COMP 426 Twitter</h1>
    </div>
    <div id="left" class="left">
      <img src="Images/LeftArrowGrey.png" id="back" class="back">
    </div>
    <div id="right" class="right">
        <img src="Images/RightArrowGrey.png" id="next" class="next">
    </div>
    
    <div id="tweetBoxOne" class="tweetBox">
        <div id="tweetBodyOne" class="tweetBody">
          <p id="tweetIDOne" class="tweetID">#</p>
          <p id="tweetTextOne">Author</p>
          <div id="trash1"></div>
          <div id="edit1"></div>
        </div>
        <div id="tweetBottomOne" class="tweetBottom">
        <img src="Images/ReplyLightBlue.png" onmouseover="this.src='Images/ReplyDarkGreen.png'" onmouseout="this.src='Images/ReplyLightBlue.png'" id="reply1" class="reply">
        <img src="Images/HeartBorder.png" id="like1" class="like">
        <img src="Images/RefreshGrey.png" onmouseover="this.src='Images/RefreshDarkBlue.png'" onmouseout="this.src='Images/RefreshGrey.png'" id="rt1" class="rt">
        <br>
        <p id="tweet1Reply" class="replyCount">0</p>
        <p id="tweet1Retweet" class="retweetCount">0</p>
        <p id="tweet1Like" class="likeCount">0</p>
        </div>
    </div>
    <div id="tweetBoxTwo" class="tweetBox">
        <div id="tweetBodyTwo" class="tweetBody">
          <p id="tweetIDTwo" class="tweetID">#</p>
          <p id="tweetTextTwo">Author</p>
          <div id="trash2"></div>
          <div id="edit2"></div>
        </div>
        <div id="tweetBottomTwo" class="tweetBottom">
        <img src="Images/ReplyLightBlue.png" onmouseover="this.src='Images/ReplyDarkGreen.png'" onmouseout="this.src='Images/ReplyLightBlue.png'" id="reply2" class="reply">
        <img src="Images/HeartBorder.png" id="like2" class="like">
        <img src="Images/RefreshGrey.png" onmouseover="this.src='Images/RefreshDarkBlue.png'" onmouseout="this.src='Images/RefreshGrey.png'" id="rt2" class="rt">
        <br>
        <p id="tweet2Reply" class="replyCount">0</p>
        <p id="tweet2Retweet" class="retweetCount">0</p>
        <p id="tweet2Like" class="likeCount">0</p>
        </div>
    </div>
    <div id="tweetBoxThree" class="tweetBox">
        <div id="tweetBodyThree" class="tweetBody">
          <p id="tweetIDThree" class="tweetID">#</p>
          <p id="tweetTextThree">Author</p>
          <div id="trash3"></div>
          <div id="edit3"></div>
        </div>
        <div id="tweetBottomThree" class="tweetBottom">
          <img src="Images/ReplyLightBlue.png" onmouseover="this.src='Images/ReplyDarkGreen.png'" onmouseout="this.src='Images/ReplyLightBlue.png'" id="reply3" class="reply">
          <img src="Images/HeartBorder.png" id="like3" class="like">
          <img src="Images/RefreshGrey.png" onmouseover="this.src='Images/RefreshDarkBlue.png'" onmouseout="this.src='Images/RefreshGrey.png'" id="rt3" class="rt">
          <br>
          <p id="tweet3Reply" class="replyCount">0</p>
          <p id="tweet3Retweet" class="retweetCount">0</p>
          <p id="tweet3Like" class="likeCount">0</p>
        </div>
    </div>
    <div id="tweetBoxFour" class="tweetBox">
        <div id="tweetBodyFour" class="tweetBody">
          <p id="tweetIDFour" class="tweetID">#</p>
          <p id="tweetTextFour">Author</p>
          <div id="trash4"></div>
          <div id="edit4"></div>
        </div>
        <div id="tweetBottomFour" class="tweetBottom">
          <img src="Images/ReplyLightBlue.png" onmouseover="this.src='Images/ReplyDarkGreen.png'" onmouseout="this.src='Images/ReplyLightBlue.png'" id="reply4" class="reply">
          <img src="Images/HeartBorder.png" id="like4" class="like">
          <img src="Images/RefreshGrey.png" onmouseover="this.src='Images/RefreshDarkBlue.png'" onmouseout="this.src='Images/RefreshGrey.png'" id="rt4" class="rt">
          <br>
          <p id="tweet4Reply" class="replyCount">0</p>
          <p id="tweet4Retweet" class="retweetCount">0</p>
          <p id="tweet4Like" class="likeCount">0</p>
          </div>
    </div>

    <img src="Images/speech-bubble-line.png" class="post" id = "writeTweet">

    <div id="postTweet"></div>
  </div>`
// <img src="Images/HeartBorder.png" onmouseover="this.src='Images/HeartBorderDark.png'" onmouseout="this.src='Images/HeartBorder.png'" id="like4" class="like">


  bodyDiv.innerHTML = htmlstr;

  bodyDiv = document.getElementById("body");
  nextButton = document.getElementById("right");
  backButton = document.getElementById("left");
  backButton.style.opacity = "0";
  like1 = document.getElementById("like1");
  like2 = document.getElementById("like2");
  like3 = document.getElementById("like3");
  like4 = document.getElementById("like4");
  reply1 = document.getElementById("reply1");
  reply2 = document.getElementById("reply2");
  reply3 = document.getElementById("reply3");
  reply4 = document.getElementById("reply4");
  retweet1 = document.getElementById("rt1");
  retweet2 = document.getElementById("rt2");
  retweet3 = document.getElementById("rt3");
  retweet4 = document.getElementById("rt4");
  box1 = document.getElementById("tweetBoxOne");
  box2 = document.getElementById("tweetBoxTwo");
  box3 = document.getElementById("tweetBoxThree");
  box4 = document.getElementById("tweetBoxFour");
  tweetButton = document.getElementById("writeTweet");

  nextButton.addEventListener("click", nextPressed);
  backButton.addEventListener("click", backPressed);
  like1.addEventListener("click", function(){likePressed(like1, tweetID1);}, false);
  like2.addEventListener("click", function(){likePressed(like2, tweetID2);}, false);
  like3.addEventListener("click", function(){likePressed(like3, tweetID3);}, false);
  like4.addEventListener("click", function(){likePressed(like4, tweetID4);}, false);
  retweet1.addEventListener("click", function(){retweetClicked(tweetID1);}, false);
  retweet2.addEventListener("click", function(){retweetClicked(tweetID2);}, false);
  retweet3.addEventListener("click", function(){retweetClicked(tweetID3);}, false);
  retweet4.addEventListener("click", function(){retweetClicked(tweetID4);}, false);
  reply1.addEventListener("click", function(){replyClicked(tweetID1);}, false);
  reply2.addEventListener("click", function(){replyClicked(tweetID2);}, false);
  reply3.addEventListener("click", function(){replyClicked(tweetID3);}, false);
  reply4.addEventListener("click", function(){replyClicked(tweetID4);}, false);

  trash1.innerHTML=`<img src="Images/recycle-bin-line.png" class="trash">`
  trash1.addEventListener("click", function(){deleteTweet(1);}, false);
  edit1.innerHTML=`<img src="Images/edit-round-line.png" class="edit">`
  edit1.addEventListener("click", function(){editTweet(1);}, false);
  trash2.innerHTML=`<img src="Images/recycle-bin-line.png" class="trash">`
  trash2.addEventListener("click", function(){deleteTweet(2);}, false);
  edit2.innerHTML=`<img src="Images/edit-round-line.png" class="edit">`
  edit2.addEventListener("click", function(){editTweet(2);}, false);
  trash3.innerHTML=`<img src="Images/recycle-bin-line.png" class="trash">`
  trash3.addEventListener("click", function(){deleteTweet(3);}, false);
  edit3.innerHTML=`<img src="Images/edit-round-line.png" class="edit">`
  edit3.addEventListener("click", function(){editTweet(3);}, false);
  trash4.innerHTML=`<img src="Images/recycle-bin-line.png" class="trash">`
  trash4.addEventListener("click", function(){deleteTweet(4);}, false);
  edit4.innerHTML=`<img src="Images/edit-round-line.png" class="edit">`
  edit4.addEventListener("click", function(){editTweet(4);}, false);
  trash1.hidden = true; edit1.hidden = true;
  trash2.hidden = true; edit2.hidden = true;
  trash3.hidden = true; edit3.hidden = true;
  trash4.hidden = true; edit4.hidden = true;

  tweetButton.addEventListener("click", postTweet);

  document.getElementById("tabTitle").innerHTML = "COMP 426 Twitter";

  updateTweets();
}
function nextPressed(){
  if(tweetID4 - 1 >= 0){
    tweetID1--;
    tweetID2--;
    tweetID3--;
    tweetID4--;
    updateTweets();
  }

  if(tweetID4 == 0){
    nextButton.style.opacity = "0";
  }
  backButton.style.opacity = "1";
}
function backPressed(){
    tweetID1++;
    tweetID2++;
    tweetID3++;
    tweetID4++;

  updateTweets();
  
  if(tweetID4 == numTweeters){
    backButton.style.opacity = "0";
  }
  nextButton.style.opacity = "1";
}

async function likePressed(likeButton, tID){  
  let tweets = await getTweets();
  tweetsGlobal = tweets;
  let likedTweet = tweets.data[tID];

  if(likedTweet.isLiked){
    const result = await axios({
      method: 'put',
      url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${likedTweet.id}/unlike`,
      withCredentials: true,
    });
    likeButton.src="Images/HeartBorder.png";
  }
  else{
    const putResult = await axios({
      method: 'put',
      url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${likedTweet.id}/like`,
      withCredentials: true,
    });
    likeButton.src="Images/HeartFilled.png";
  }

  let result = await getTweets();
  tweetsGlobal = result;
  if(tID == tweetID1){document.getElementById(`tweet1Like`).innerHTML = result.data[tweetID1].likeCount;}
  if(tID == tweetID2){document.getElementById(`tweet2Like`).innerHTML = result.data[tweetID2].likeCount;}
  if(tID == tweetID3){document.getElementById(`tweet3Like`).innerHTML = result.data[tweetID3].likeCount;}
  if(tID == tweetID4){document.getElementById(`tweet4Like`).innerHTML = result.data[tweetID4].likeCount;}
}

async function getTweets(){
  const result = await axios({
    method: 'get',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });

  console.log(result);
  return result;
}

async function updateTweets(){
  if(tweetID1 == -1){
    tweetID1 = tweetsGlobal.data.length-1;
    tweetID2 = tweetsGlobal.data.length-2;
    tweetID3 = tweetsGlobal.data.length-3;
    tweetID4 = tweetsGlobal.data.length-4;
    numTweeters = tweetsGlobal.data.length - 1;
  }

  document.getElementById("tweetTextOne").innerHTML=`
    <p class="author">${tweetsGlobal.data[tweetID1].author}</p>
    <br>
    <p class="tweetText">${tweetsGlobal.data[tweetID1].body}</p>
  `
  document.getElementById("tweetTextTwo").innerHTML=`
    <p class="author">${tweetsGlobal.data[tweetID2].author}</p>
    <br>
    <p class="tweetText">${tweetsGlobal.data[tweetID2].body}</p>
  `
  document.getElementById("tweetTextThree").innerHTML=`
    <p class="author">${tweetsGlobal.data[tweetID3].author}</p>
    <br>
    <p class="tweetText">${tweetsGlobal.data[tweetID3].body}</p>
  `
  document.getElementById("tweetTextFour").innerHTML=`
    <p class="author">${tweetsGlobal.data[tweetID4].author}</p>
    <br>
    <p class="tweetText">${tweetsGlobal.data[tweetID4].body}</p>
  `
  document.getElementById(`tweet1Like`).innerHTML = tweetsGlobal.data[tweetID1].likeCount;
  document.getElementById(`tweet1Retweet`).innerHTML = tweetsGlobal.data[tweetID1].retweetCount;
  document.getElementById(`tweet1Reply`).innerHTML = tweetsGlobal.data[tweetID1].replyCount;
  document.getElementById(`tweetIDOne`).innerHTML = `#${tweetsGlobal.data[tweetID1].id}`;

  document.getElementById(`tweet2Like`).innerHTML = tweetsGlobal.data[tweetID2].likeCount;
  document.getElementById(`tweet2Retweet`).innerHTML = tweetsGlobal.data[tweetID2].retweetCount;
  document.getElementById(`tweet2Reply`).innerHTML = tweetsGlobal.data[tweetID2].replyCount;
  document.getElementById(`tweetIDTwo`).innerHTML = `#${tweetsGlobal.data[tweetID2].id}`;

  document.getElementById(`tweet3Like`).innerHTML = tweetsGlobal.data[tweetID3].likeCount;
  document.getElementById(`tweet3Retweet`).innerHTML = tweetsGlobal.data[tweetID3].retweetCount;
  document.getElementById(`tweet3Reply`).innerHTML = tweetsGlobal.data[tweetID3].replyCount;
  document.getElementById(`tweetIDThree`).innerHTML = `#${tweetsGlobal.data[tweetID3].id}`;

  document.getElementById(`tweet4Like`).innerHTML = tweetsGlobal.data[tweetID4].likeCount;
  document.getElementById(`tweet4Retweet`).innerHTML = tweetsGlobal.data[tweetID4].retweetCount;
  document.getElementById(`tweet4Reply`).innerHTML = tweetsGlobal.data[tweetID4].replyCount;
  document.getElementById(`tweetIDFour`).innerHTML = `#${tweetsGlobal.data[tweetID4].id}`;

  getBackgroundColor(document.getElementById("tweetBodyOne"), tweetsGlobal.data[tweetID1].id);
  getBackgroundColor(document.getElementById("tweetBodyTwo"), tweetsGlobal.data[tweetID2].id);
  getBackgroundColor(document.getElementById("tweetBodyThree"), tweetsGlobal.data[tweetID3].id);
  getBackgroundColor(document.getElementById("tweetBodyFour"), tweetsGlobal.data[tweetID4].id);

  if(tweetsGlobal.data[tweetID1].isLiked == true){like1.src="Images/HeartFilled.png";}
    else{like1.src="Images/HeartBorder.png"}
  if(tweetsGlobal.data[tweetID2].isLiked == true){like2.src="Images/HeartFilled.png";}
    else{like2.src="Images/HeartBorder.png"}
  if(tweetsGlobal.data[tweetID3].isLiked == true){like3.src="Images/HeartFilled.png";}
    else{like3.src="Images/HeartBorder.png"}
  if(tweetsGlobal.data[tweetID4].isLiked == true){like4.src="Images/HeartFilled.png";}
    else{like4.src="Images/HeartBorder.png"}

    let trash1 = document.getElementById("trash1");
    let trash2 = document.getElementById("trash2");
    let trash3 = document.getElementById("trash3");
    let trash4 = document.getElementById("trash4");
    let edit1 = document.getElementById("edit1");
    let edit2 = document.getElementById("edit2");
    let edit3 = document.getElementById("edit3");
    let edit4 = document.getElementById("edit4");


    if(tweetsGlobal.data[tweetID1].isMine){
     trash1.hidden = false;
     edit1.hidden = false;
    }else{
      trash1.hidden = true;
      edit1.hidden = true;
    }
    if(tweetsGlobal.data[tweetID2].isMine){
      trash2.hidden = false;
      edit2.hidden = false;
    }else{
      trash2.hidden = true;
      edit2.hidden = true;
    }
    if(tweetsGlobal.data[tweetID3].isMine){
      trash3.hidden = false;
      edit3.hidden = false;
    }else{
      trash3.hidden = true;
      edit3.hidden = true;
    }
    if(tweetsGlobal.data[tweetID4].isMine){
      trash4.hidden = false;
      edit4.hidden = false;
    }else{
      trash4.hidden = true;
      edit4.hidden = true;
    }
}

function getBackgroundColor(tweetBody, tweetID){
  if(tweetID%10 == 0){ // orange (ish)
    tweetBody.style.backgroundColor = "#FFDAC1";
  }
  else if(tweetID%10 == 1){ // teal
    tweetBody.style.backgroundColor = "#C3E9F8";
  }
  else if(tweetID%10 == 2){ // pink
    tweetBody.style.backgroundColor = "#F8CBEE";
  }
  else if(tweetID%10 == 3){ // blue
    tweetBody.style.backgroundColor = "#cce0ff";
  }
  else if(tweetID%10 == 4){ // yellow
    tweetBody.style.backgroundColor = "#FDF6C3";
  }
  else if(tweetID%10 == 5){ // purple
    tweetBody.style.backgroundColor = "#CAC3F7";
  }
  else if(tweetID%10 == 6){ // green
    tweetBody.style.backgroundColor = "	#C7E3A4";
  }
  else if(tweetID%10 == 7){ // baby blue
    tweetBody.style.backgroundColor = "#DCF1F2";
  }
  else if(tweetID%10 == 8){ // gum
    tweetBody.style.backgroundColor = "#FFC5D1";
  }
  else if(tweetID%10 == 9){ // mint
    tweetBody.style.backgroundColor = "#B5EAD7";
  }
  else{
    tweetBody.style.backgroundColor = "#ffffff";
  }
}

function postTweet(){
  let htmlstr = `
    <div class = "postBackground">
    </div>
    <div class = "formBackground">
      <h2>Send a Tweet</h2>
      <h3>What's happenin!?</h3> <br>
      <textarea id= "tweetBodyTextArea" class="tweetBodyTextArea" rows="15">Type here...</textarea><br>
      <button id="cancelButton" class="cancel">Cancel</button>
      <button id="submitButton" class="submit">Submit</button>
    </div>
  `
  document.getElementById("postTweet").innerHTML = htmlstr;
  document.getElementById("cancelButton").addEventListener("click", cancelClicked);
  document.getElementById("submitButton").addEventListener("click", submitClicked);
}

function cancelClicked(){
  document.getElementById("postTweet").innerHTML = "";
}

async function submitClicked(){
  let tweetString = document.getElementById("tweetBodyTextArea").value;
  
  const result = await axios({
    method: 'post',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      body: tweetString,
    },
  });
  
  document.getElementById("postTweet").innerHTML = "";
  tweetsGlobal = await getTweets();
  updateTweets();
}

async function deleteTweet(num){
  let availableTweets = await getTweets();
  tweetsGlobal = availableTweets;
  let tweetToDelete;
  if(num == 4){
    tweetToDelete = availableTweets.data[tweetID4].id;
  }
  if(num == 3){
    tweetToDelete = availableTweets.data[tweetID3].id;
  }
  if(num == 2){
    tweetToDelete = availableTweets.data[tweetID2].id;
  }
  if(num == 1){
    tweetToDelete = availableTweets.data[tweetID1].id;
  }
  const result = await axios({
    method: 'delete',
    url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${tweetToDelete}`,
    withCredentials: true,
  });

  tweetsGlobal = await getTweets();
  updateTweets();
}

async function editTweet(num){
  let availableTweets = await getTweets();
  tweetsGlobal = availableTweets;
  let tweetToDelete;
  if(num == 4){
    tweetToDelete = availableTweets.data[tweetID4];
  }
  if(num == 3){
    tweetToDelete = availableTweets.data[tweetID3];
  }
  if(num == 2){
    tweetToDelete = availableTweets.data[tweetID2];
  }
  if(num == 1){
    tweetToDelete = availableTweets.data[tweetID1];
  }

  let htmlstr = `
    <div class = "postBackground">
    </div>
    <div class = "formBackground">
      <h2>Edit Tweet</h2>
      <h3>Typo?</h3> <br>
      <textarea id= "tweetBodyTextArea" class="tweetBodyTextArea" rows="15">Type here...</textarea><br>
      <button id="cancelButton" class="cancel">Cancel</button>
      <button id="submitButton" class="submit">Submit</button>
    </div>
  `
  document.getElementById("postTweet").innerHTML = htmlstr;
  document.getElementById("cancelButton").addEventListener("click", cancelClicked);
  document.getElementById("submitButton").addEventListener("click", function(){submitEdits(tweetToDelete.id);}, false);
  document.getElementById("tweetBodyTextArea").innerHTML = tweetToDelete.body;
}

async function submitEdits(tweetID){
  let editedTweet = document.getElementById("tweetBodyTextArea").value;

  const result = await axios({
    method: 'put',
    url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${tweetID}`,
    withCredentials: true,
    data: {
      body: editedTweet,
    },
  });

  document.getElementById("postTweet").innerHTML = "";
  tweetsGlobal = await getTweets();
  updateTweets();
}
async function retweetClicked(tweetID){
  let htmlstr = `
    <div class = "postBackground">
    </div>
    <div class = "formBackground">
      <h2>Retweet</h2>
      <h3>Any other thoughts?</h3> <br>
      <textarea id= "tweetBodyTextArea" class="tweetBodyTextArea" rows="15">Type here...</textarea><br>
      <button id="cancelButton" class="cancel">Cancel</button>
      <button id="submitButton" class="submit">Submit</button>
    </div>
  `
  const results = await getTweets();
  tweetsGlobal = results;
  document.getElementById("postTweet").innerHTML = htmlstr;
  document.getElementById("cancelButton").addEventListener("click", cancelClicked);
  document.getElementById("submitButton").addEventListener("click", function(){submitRetweet(results.data[tweetID].id);}, false);
  document.getElementById("tweetBodyTextArea").innerHTML = results.data[tweetID].body;
}

async function submitRetweet(tweetID){
  let editedTweet = document.getElementById("tweetBodyTextArea").value;

  const result = await axios({
    method: 'post',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "type": "retweet",
      "parent": tweetID,
      "body": editedTweet,
    },
  });

  document.getElementById("postTweet").innerHTML = "";
  tweetsGlobal = await getTweets();
  updateTweets();
}

async function replyClicked(tweetID){
  let htmlstr = `
    <div class = "postBackground">
    </div>
    <div class = "formBackground">
      <h2>Reply</h2>
      <h3>Continue the conversation!</h3> <br>
      <h4>Original Tweet:</h4>
      <h5 id="originalTweet"></h5>
      <textarea id= "tweetBodyTextArea" class="tweetBodyTextArea" rows="15">Reply here...</textarea><br>
      <button id="cancelButton" class="cancel">Cancel</button>
      <button id="submitButton" class="submit">Submit</button>
    </div>
  `
  const results = await getTweets();
  tweetsGlobal = results;
  document.getElementById("postTweet").innerHTML = htmlstr;
  document.getElementById("cancelButton").addEventListener("click", cancelClicked);
  document.getElementById("submitButton").addEventListener("click", function(){submitReply(results.data[tweetID].id);}, false);
  document.getElementById("originalTweet").innerHTML = results.data[tweetID].body;
}

async function submitReply(tweetID){
  let editedTweet = document.getElementById("tweetBodyTextArea").value;

  const result = await axios({
    method: 'post',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "type": "reply",
      "parent": tweetID,
      "body": editedTweet,
    },
  });

  document.getElementById("postTweet").innerHTML = "";
  tweetsGlobal = await getTweets();
  updateTweets();
}
var config = {
    apiKey: "461464883125-7deqo2vaup3fib0rc41ms4kfk4t54ti1.apps.googleusercontent.com",
    authDomain: "finalyearprojectdata-6a610.firebaseapp.com",
    databaseURL: "https://finalyearprojectdata-6a610.firebaseio.com/",
    storageBucket: "finalyearprojectdata-6a610.appspot.com"
};
var audioToPlay;

firebase.initializeApp(config);
unique_id = Math.floor(Math.random() * 100001);

function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
    });
}

function writeWavData(data, question){
    var storageRef = firebase.storage().ref().child(question+'/'+ unique_id +'.wav');
    storageRef.put(data)
}

function getContent(number){
    return firebase.database().ref('content/'+number).once("value");
}

function getExample(number){
    var examplesRef = firebase.storage().ref().child('Examples/'+number +'.mp3')
    examplesRef.getDownloadURL().then(function(url){
        audioToPlay = new Audio(url);
    });
}

function noExample(){
    audioToPlay = false;
}

function playAudio(){
    if(audioToPlay)audioToPlay.play();
}

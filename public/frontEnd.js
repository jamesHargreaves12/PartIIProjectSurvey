var viewerCount = 1;
var finalTest = false;
var totalPages = 17;

function buttonClick() {
    stopRecordingAndUpload()
    if(!finalTest) {
        getContent(viewerCount).then(function (snap) {
            viewerCount++
            finalTest = snap.final
            updateContent(snap.val())
        })
    }
}

function updateContent(data) {

    console.log(data)
    if(viewerCount<=totalPages)document.getElementById("progress-display").innerText = viewerCount + "/" + totalPages
    if(data.recording) startRecording();
    document.getElementById("restart-recording-button").style.visibility = data.recording? "visible" : "hidden"
    document.getElementById("pannel-title").innerText = data.title;
    document.getElementById("pannel-content").innerHTML =  data.intro_text
    if(!data.final){
        document.getElementById("code-div").style.visibility = "visible"
        document.getElementById("code-div").innerHTML = data.python? prettyPrintPython(data.code):data.code
        document.getElementById("progress-button").innerText = data.next_button_title;
    }
    else{
        document.getElementById("code-div").style.visibility = "hidden"
        document.getElementById("progress-button").style.visibility = "hidden"
    }
    if (!data.play_button)
        document.getElementById("play-button").style.visibility = "hidden";
    else {
        document.getElementById("play-button").style.visibility = "visible";
        if(!data.example) {
            console.log("No Example Field")
        }
        else{
            getExample(data.example)
        }
    }
}

function restartButtonClicked(){
    restartRecording()
}

function setSyntaxBody() {
    readTextFile("pythonSyntax.txt", setHelpText)
}

function setHelpText(text) {
    // var highlightedText = highlightKeywords(text)
    document.getElementById("syntax-help-content").innerHTML = text;
}

function playButtonClick(){
    playAudio();
}

function readTextFile(file, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}

function startRestart(){
    document.getElementById("restart-recording-button").innerText = "Restarting..."
}

function endRestart(){
    document.getElementById("restart-recording-button").innerText = "Restart Recording"
}
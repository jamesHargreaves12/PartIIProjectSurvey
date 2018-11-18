var mediaRecorder;
var isRecording = false;
const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => audio.play();
                        resolve({ audioBlob, audioUrl, play });
                    });

                    mediaRecorder.stop();
            });

            resolve({ start, stop });
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
var recorder;
function startRecording(){
    (async () => {
        if(!isRecording) {
            recorder = await recordAudio();
            await recorder.start();
            isRecording = true;
        }
    })();
}

function stopRecordingAndUpload(){
    if(isRecording) {
        (async () => {
            const audio = await recorder.stop();
            // writeWavData(audio.audioBlob, viewerCount)
            isRecording = false;
        })();
    }
}

function restartRecording(){
    startRestart()
    if(isRecording) {
        (async () => {
            console.log("restarting")
            await recorder.stop();
            recorder = await recordAudio();
            await recorder.start()
            endRestart()
        })();
    }
}
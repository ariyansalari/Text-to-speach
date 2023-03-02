//init speech
const synth=window.speechSynthesis;

//Dom  Elements
const textForm=document.querySelector("form")
const textInput=document.querySelector("#text-input");
const voiceSelect=document.querySelector("#voice-select");
const range=document.querySelector("#rate");
const Pitch=document.querySelector("#pitch");
const rangevalue=document.querySelector("#rate-value")
const pitchvalue=document.querySelector("#pitch-value");
const body=document.querySelector("body")


//init voices

let voices=[];

const getvoices=()=>{

    //get Elements
voices=synth.getVoices();

//create element
    voices.forEach(voice=>{
        const option=document.createElement("option")
option.innerText=voice.name+"("+voice.lang+")";

//set attribute
        option.setAttribute("data-lang",voice.lang)
        option.setAttribute("data-name",voice.name);
        voiceSelect.appendChild(option)
    })
};

getvoices();
if(synth.onvoiceschanged!==undefined)
{
    synth.onvoiceschanged=getvoices;
}

//speak
const speak=()=>{


    // cheak if speaking
    if(synth.speaking)
    {
        console.error("Already speaking....");
        return;
    }
    if(textInput.value!=="")
    {
        body.style.background="#141414 url(/photo/wave.gif)"
body.style.backgroundRepeat="repeat-x"
body.style.backgroundSize="100% 100%"
        //get speak text
        const speakText=new SpeechSynthesisUtterance(textInput.value)
   //speak end 
        speakText.onend=e=>{
            console.log("Done speaking...")
            body.style.background="#141414"
        }

        speakText.onerror=e=>{
            console.error("something went wrong")
        }

        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute("data-name")

        voices.forEach(voice=>{
            if(voice.name===selectedVoice)
            {
                speakText.voice=voice;
            }
        })

        //set pitch and range
        speakText.rate=range.value;
        speakText.pitch=Pitch.value;

        //speak
synth.speak(speakText)
    }
 

}

textForm.addEventListener("submit",e=>{
    e.preventDefault()
    speak();
    textInput.blur();
})


range.addEventListener("change",e=>{
rangevalue.textContent=range.value
})

pitch.addEventListener("change",e=>{
    pitchvalue.textContent=pitch.value
    })

voiceSelect.addEventListener("change",e=>{
    speak();
})

export function textToSpeechEnglish(text) {
  console.log("speaking english");
 if (window.speechSynthesis) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find(voice => voice.lang === 'en-US');
      utterance.rate = 0.6;
      synth.speak(utterance);
  } else {
      window.responsiveVoice.speak(text, "US Female", {rate: 0.6});
  }
}

export function textToSpeechThai(text) {
  try {
      /*var audio = new Audio();
      audio.src = tts + "tl=th&q=" + text;
      audio.play();*/
      if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis;
          const voices = synth.getVoices();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.voice = voices.find(voice => voice.lang === 'th-TH');
          utterance.rate = 0.8;
          if (utterance.voice) {
              synth.speak(utterance);
              return
          }
      } else {
          window.responsiveVoice.speak(text, "Thai Female", { rate: 0.8 });
      }

  } catch (error) {
      console.log(error);
      return false;
  }
}
import fetch from "node-fetch";

import lan_english from './en.translations';
import lan_thai from './th.translations';
import api_en from './en.api';
import api_th from './th.api';
import settings from '../config/settings';
import { htmlDecode } from './helpers';

const API = settings.firstLanguage === 'en' ? api_en : api_th;
const english = settings.firstLanguage === 'en';

//const tts = "https://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&";

//helpers
export function getLanguage() {
    const language = settings.firstLanguage === 'th' ? lan_thai : lan_english;
    return language;
}

async function fetchJSON(url) {
    try {
        const response  = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          throw Error(response.statusText);
        }
    } catch(error) {
        console.log(error);
        return [];
    }
}

async function post(url, data) {
    try {
        const searchParams = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
          }).join('&');

        
         const response = await fetch(url, {
             method: 'POST',
             mode: 'cors',
             headers: {
                 'Accept': 'application/json',
                 //'Content-Type': 'application/json',
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                 //"Content-Type": "application/x-www-form-urlencoded",
             },
             //body: JSON.stringify(data), 
             body: searchParams
         });
         if (!response.ok) {
             throw Error(response.statusText);
         }
         const json = response.json();
         return json;
     } catch (error) {
        alert(error);
        return null;
     }
}

//** api **/
export async function getLessons() {
    const lessonData = await fetchJSON(API.LESSONS);
    return lessonData;
}

export async function getLesson(id) {
    const lesson = await fetchJSON(API.LESSON + "?id=" + id.toString());
    return lesson;
}

export async function getSlideAndMedia(slideId) {
    const slide = await fetchJSON(API.SLIDE_AND_MEDIA + "?slideId=" + slideId.toString())
    return slide;
}

export async function getSongs() {
    const songData = await fetchJSON(API.SONGS);
    return songData;
}

export async function getSong(id) {
    const data = await fetchJSON(API.SONG + "?lessonId=" + id);
    return data;
}


export async function detectLanguage(text) {
    try {
        const result = await post(
            API.DETECT_LANGUAGE, { 
                q: [text], 
            }
        );
        console.log(result);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function translate(text, code) {
    try {
        const result = await post(
            API.TRANSLATE, { 
                q: [text],
                target: code
            }
        );
        if (result.data) {
            return htmlDecode(result.data.translations[0].translatedText);
        } 
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function textToSpeechEnglish(text) {
    console.log("speaking english");
   if (window.speechSynthesis) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices.find(voice => voice.lang === 'en-US');
        synth.speak(utterance);
    } else {
        window.responsiveVoice.speak(text, "US Female", {rate: 0.5});
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
            utterance.rate = 0.9;
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

export async function getQuestions() {
    const result = await fetchJSON(API.GET_QUESTIONS);
    return result;
}

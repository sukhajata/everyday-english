import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Router from 'next/router';
import { useRouter } from 'next/router';

import MultipleChoiceImage1 from "../../components/MultipleChoiceImage1";
import MultipleChoiceText2 from "../../components/MultipleChoiceText2";
import MissingWord3 from "../../components/MissingWord3";
import Teaching4 from "../../components/Teaching4";
import MatchingPairsText6 from "../../components/MatchingPairsText6";
import Translate9 from "../../components/Translate9";
import MatchingPairsImage11 from "../../components/MatchingPairsImage11";
import Writing14 from "../../components/Writing14";
import Bingo15 from "../../components/Bingo15";
import Conversation16 from "../../components/Conversation16";
import Question17 from "../../components/Question17";
import Listening18 from "../../components/Listening18";
import LessonProgress from "../../components/LessonProgress";

import {
  getSlideAndMedia,
  textToSpeechEnglish,
  textToSpeechThai
} from "../../services/dbAccess";
import { getLessonSlides, getAllLessons, getSlide, getSlideMedia } from "../../services/supabaseClient";
import { scoreContext } from "../../context/ScoreContext";
import { setScore, setOrder, setCurrentSlide } from "../../context/scoreActions";
import { useContext, useEffect } from "react";
import settings from '../../config/settings';
import api_en from '../../services/en.api';
import api_th from '../../services/th.api';
import { SlideshowOutlined } from "@material-ui/icons";

const API = settings.firstLanguage === 'en' ? api_en : api_th;
const englishSpeaker = settings.firstLanguage === "en";

const Lesson = ({ slides, firstSlide }) => {
  const imageUrl = "https://sukhajata.com/images/";
  const { state, dispatch } = useContext(scoreContext);
  const { currentSlide, score, order } = state;
  const router = useRouter();

  useEffect(() => {
    if (slides && firstSlide) {
      dispatch(setCurrentSlide(firstSlide));            
      let _score = [];
      slides.forEach(() => {
        _score.push(0);
      });
      dispatch(setScore(_score));
      // preload voice
      if (englishSpeaker) {
        textToSpeechThai("ค่ะ");         
      } else {
        textToSpeechEnglish('hi!');
      }
    }
  }, [slides, firstSlide]);

  const moveNextSlide = async result => {
    let newScore = score.splice(0);
    newScore[order] = result;
    dispatch(setScore(newScore));
    
    const newOrder = order + 1;
    dispatch(setOrder(newOrder));

    window.scrollTo(0,0);
    if (slides[newOrder]) {
      const _currentSlide = await getSlideAndMedia(slides[newOrder].id);
      dispatch(setCurrentSlide(_currentSlide));
    } else {
      //finished
      Router.push('/totals')
    }
  };

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item style={{ width: "100%" }}>
          {slides && <LessonProgress slides={slides} />}
        </Grid>
        {currentSlide && (
          <Grid item style={{ width: "100%" }}>            
            {currentSlide.categoryId == "1" && (
              <MultipleChoiceImage1
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId == "2" && (
              <MultipleChoiceText2
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId == "3" && (
              <MissingWord3
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId == "4" && (
              <Teaching4
                slide={currentSlide}
                imageUrl={imageUrl}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId == "6" && (
              <MatchingPairsText6
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
              />
            )}
            {currentSlide.categoryId == "9" && (
              <Translate9 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId == "11" && (
              <MatchingPairsImage11
                slide={currentSlide}
                moveNextSlide={moveNextSlide}
                imageUrl={imageUrl}
              />
            )}
            {currentSlide.categoryId == "14" && (
              <Writing14 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId == "15" && (
              <Bingo15 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId == "16" && (
              <Conversation16 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId == "17" && (
              <Question17 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
            {currentSlide.categoryId == "18" && (
              <Listening18 slide={currentSlide} moveNextSlide={moveNextSlide} />
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

/*
Lesson.getInitialProps = async ({ query }) => {
  const { id } = query;
  //const res = await fetch('https://sukhajata.com/api/lessons-th-en-graphql.php');
  //const data = await res.json();

  const lesson = await getLesson(id);
  const firstSlide = await getSlideAndMedia(lesson.slides[0].id);

  return {
    lesson: lesson,
    firstSlide: firstSlide,
  };
};*/
/*
export async function getServerSideProps({ params }) {
  const lesson = await getLesson(params.id);
  const firstSlide = await getSlideAndMedia(lesson.slides[0].id);

  return {
    props: {
      lesson: lesson,
      firstSlide: firstSlide,
    },
  }
}*/

export async function getStaticProps({ params }) {
  const slides = await getLessonSlides(params.id);    
  // const firstSlide = await getSlideAndMedia(slides[0].id);
  const firstSlide = await getSlide(slides[0].id);
  // console.log(firstSlide);
  const slideMedia = await getSlideMedia(firstSlide.id)
  firstSlide.medias = slideMedia;
  // console.log(firstSlide);
  return {
    props: {
      slides: slides,
      firstSlide: firstSlide,
    },
  }
}


export async function getStaticPaths() {
  const data = await getAllLessons();  
  // const res = await fetch(API.LESSONS);
  // const data = await res.json();
  const paths = data.map(x => {
    return { params: { id: x.id.toString() } };
  });

  return {
    paths: paths,
    fallback: false 
  };
}

export default Lesson;

import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Link from 'next/link';
import fetch from 'node-fetch';

import Header from '../../components/Header';
import settings from '../../config/settings';
import api_en from '../../services/en.api';
import api_th from '../../services/th.api';
import { getLessons } from '../../services/supabaseClient';

const API = settings.firstLanguage === 'en' ? api_en : api_th;

const Lessons = ({ lessons }) => (
  <>
    <Header />
    <Container style={{ marginTop: 20 }}>
      <Grid container justifyContent="space-around" >
      {lessons.map(lesson => (
          <Card
            key={lesson.id}
            style={{ width: 340, marginBottom: 20, marginRight: 20 }}
          >
            <CardActionArea>
              <CardContent>
                <Link href={`/lesson/${encodeURIComponent(lesson.id)}`} as={`/lesson/${lesson.id}`}>
                  <a>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <Chip color="primary" label={lesson.lessonOrder} />
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          {lesson.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </a>
                </Link>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {lesson.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Container>
  </>
);


export async function getStaticProps({ params }) {
  const data = await getLessons(params.moduleId);
  // console.log(data);
  // console.log(data);
  //const res = await fetch(`${API.LESSONS}?moduleId=${params.moduleId}`);
  //const data = await res.json();

  return {
    props: {
      lessons: data
    }
  };
}

export async function getStaticPaths() {

  return {
    paths: [
      { params: { moduleId: "1" }},
      { params: { moduleId: "4" }}
    ],
    fallback: false 
  };
}

export default Lessons;
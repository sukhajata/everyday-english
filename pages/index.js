import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Link from 'next/link';

import Header from '../components/Header';


const ModuleCard = ({ moduleId, name }) => (
  <Card
    key="1"
    style={{ width: 340, marginBottom: 20, marginRight: 20 }}
  >
    <CardActionArea>
      <CardContent>
        <Link href={`/lessons/${moduleId}`} as={`/lessons/${moduleId}`}>
          <a>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Chip color="primary" label="1" />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </a>
        </Link>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Index = () => (
  <>
    <Header />
    <Container style={{ marginTop: 20 }}>
      <Grid container justifyContent="space-around" >
         <ModuleCard moduleId="1" name="Beginner" />
         <ModuleCard moduleId="4" name="Intermediate" />
         <ModuleCard moduleId="2" name="Advanced" />
      </Grid>
    </Container>
  </>
);


export default Index;
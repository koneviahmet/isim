import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container, Grid } from 'semantic-ui-react'
import sozluk from '../isim.json'

export default function Home() {

  console.log(sozluk);

  return (
    <div>
      <Head>
        <title>Sözlük Tanımla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        
        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
              1
            </Grid.Column>

            <Grid.Column width="5">
              2
            </Grid.Column>

            <Grid.Column width="5">
              3
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

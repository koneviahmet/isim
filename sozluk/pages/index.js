import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, Dropdown} from 'semantic-ui-react'
import secilenCumler from '../secilenCumler.json'
import Cumleler from '../components/cumleler'
import AddForm from '../components/addForm'


export default function Home() {
  const [secilenKelime, setSecilenKelime] = useState("");
  const [newIsim, setNewIsim] = useState([]);


  const addNewIsim = (isim, type, regex) => {
    let newIsimAdd    = {}
    newIsimAdd.isim   = isim;
    newIsimAdd.type   = type;
    newIsimAdd.regex  = regex;
    newIsimAdd.ekler  = [];

    setNewIsim([...newIsim, newIsimAdd]);
  }



  const kaydetBTN = () => {
    alert('kaydet');
  }

  return (
    <div>
      <Head>
        <title>Sözlük Tanımla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        
        <Grid>
          <Grid.Row>
            <Grid.Column width="10">
              <List  divided verticalAlign='middle'>
                {secilenCumler.map((item, key) => 
                  <Cumleler key={key} item={item} setSecilenKelime={setSecilenKelime}/>
                )}
              </List>
            </Grid.Column>

            <Grid.Column width="6">
              <div>
  
                <AddForm kaydetBTN={kaydetBTN} 
                  kelime={secilenKelime} 
                  secilenKelime={secilenKelime} 
                  setSecilenKelime={setSecilenKelime}/>



              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

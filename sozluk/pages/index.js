import Head from 'next/head'
import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, Dropdown, Sticky} from 'semantic-ui-react'
import secilenCumler from '../secilenCumler.json'
import Cumleler from '../components/cumleler'
import AddForm from '../components/addForm'


export default function Home() {
  const [secilenKelime, setSecilenKelime] = useState("");
  const [lastIsim, setLastIsim]           = useState({});
  const [newIsim, setNewIsim]             = useState([]);
  const [newSil, setNewSil]               = useState([]);
 

  const addNewKelime = (arr, action) => {

    if(action == "ekle"){
      setNewIsim([...newIsim, arr]);
    }else if(action == "sil"){
      setNewSil([...newIsim, arr]);
    }

    setLastIsim({});
  }

  const denetle = (arr, ekler, istisna) => {
    ekler   = ekler && ekler.split(",") || [];
    istisna = istisna && istisna.split(",") || [];

    arr.ekler = ekler;
    arr.istisna = istisna;
   
    setLastIsim({...arr})
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
            <Grid.Column computer="10" mobile="16">
              <List  divided verticalAlign='middle'>
                {secilenCumler.map((item, key) => 
    
                  <Cumleler  
                    key={key} 
                    item={item} 
                    setSecilenKelime={setSecilenKelime}
                    newIsim={newIsim} 
                    newSil={newSil} 
                    lastIsim={[lastIsim]}
                  />
                )}
              </List>
            </Grid.Column>

            <Grid.Column computer="6" mobile="16">
         
              <div style={{position: "fixed", minWidth: 400, top: 0, right: 0}}>
                <AddForm 
                  kelime={secilenKelime}
                  addNewKelimeParent={addNewKelime} 
                  denetle={denetle}/>
              </div>
          
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

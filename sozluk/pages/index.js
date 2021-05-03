import Head from 'next/head'
import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, Dropdown, Sticky, Segment} from 'semantic-ui-react'
import secilenCumler from '../secilenCumler.json'
import Cumleler from '../components/cumleler'
import AddForm from '../components/addForm'


export default function Home() {
  const [secilenKelime, setSecilenKelime] = useState("");
  const [lastIsim, setLastIsim]           = useState({});
  const [newIsim, setNewIsim]             = useState([]);
  const [newSil, setNewSil]               = useState([]);
  const [show, setShow]                   = useState("isim");
  const [info, setInfo]                   = useState("");

  const addNewKelime = (arr, action) => {

      
      if(
        newIsim.filter(item => item.kelime == secilenKelime).length > 0 
        || newSil.filter(item => item.kelime == secilenKelime).length > 0
        || secilenKelime == ""
        ){
          setInfo("Kelime daha önce eklendi.")
          return false;
        }
      

    if(action == "ekle"){
      setNewIsim([...newIsim, arr]);
    }else if(action == "sil"){
      setNewSil([...newSil, arr]);
    }

    setLastIsim({});
  }

  const deleteIsim = (index) => {
    delete newIsim[index];
    setNewIsim([...newIsim.filter((item) => item)]);
  }

  const deleteSil = (index) => {
    delete newSil[index];
    setNewSil([...newSil.filter((item) => item)]);
  }


  const setSecilenKelimeFNC = (kelime) => {
    setSecilenKelime(kelime);
    setShow("form")
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
                    setSecilenKelime={setSecilenKelimeFNC}
                    newIsim={newIsim} 
                    newSil={newSil} 
                    lastIsim={[lastIsim]}
                  />
                )}
              </List>
            </Grid.Column>

            <Grid.Column computer="6" mobile="16">
              <div style={{position: "fixed", minWidth: 400, top: 0, right: 0}}>
              <Button.Group fluid>
                <Button onClick={() => setShow("form")}>Form</Button>
                <Button onClick={() => setShow("isim")}>Eklenenler</Button>
                <Button onClick={() => setShow("sil")}>Silinenler</Button>
              </Button.Group>
                

              {info && 
                <Segment inverted color='red'
                  onClick={() => setInfo("")} 
                >
                {info}</Segment>}

              {show == "form" &&
              
                <AddForm 
                  kelime={secilenKelime}
                  addNewKelimeParent={addNewKelime} 
                  denetle={denetle}/>
              
              }


              {show == "isim" && <div style={{background: '#f1f1f1', padding: 10}}>
                  <ul>
                  {newIsim.map((item, key) => 
                    <li key={key} style={{position: 'relative'}}>
                        <a style={{cursor: 'pointer'}} onClick={() => setLastIsim(item)}>{item.kelime}</a> 
                        <a 
                          style={{position: 'absolute', 'top': 2, right: 2, cursor: 'pointer'}} 
                          onClick={() => deleteIsim(key)}
                        >[sil]</a>
                    </li>
                  )}
                  </ul>
               </div>}

               {show == "sil" && <div style={{background: '#f1f1f1', padding: 10}}>
                  <ul>
                  {newSil.map((item, key) => 
                    <li key={key} style={{position: 'relative'}}>
                      <a style={{cursor: 'pointer'}} onClick={() => setLastIsim(item)}>{item.kelime}</a> 
                      <a 
                        style={{position: 'absolute', 'top': 2, right: 2, cursor: 'pointer'}} 
                        onClick={() => deleteSil(key)}
                      >[sil]</a>
                    </li>
                  )}
                  </ul>
               </div>}


              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

import Head from 'next/head'
import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, Dropdown} from 'semantic-ui-react'
import secilenCumler from '../secilenCumler.json'
import Cumleler from '../components/cumleler'
import AddForm from '../components/addForm'


export default function Home() {
  const [secilenKelime, setSecilenKelime] = useState("");
  const [regex, setRegex]                 = useState("regex");
  const [lastIsim, setLastIsim]           = useState({});
  const [newIsim, setNewIsim] = useState([
    {
        "kelime": "hakem",
        "type": "canli",
        "regex": "(H|h)?akem(ler|lar|lik)?(den|nin)?",
        "ekler": []
    }
  ]);

  const [newSil, setNewSil]   = useState([]);
  const [action, setAction]   = useState("ekle");
  const [type, setType]       = useState("canli");

  const addNewKelime = (isim, type, regex) => {
    let newIsimAdd      = {}
    newIsimAdd.kelime   = isim;
    newIsimAdd.type     = type;
    newIsimAdd.regex    = regex;
    newIsimAdd.ekler    = [];

    if(action == "ekle"){
      setNewIsim([...newIsim, newIsimAdd]);
    }else if(action == "sil"){
      setNewSil([...newIsim, newIsimAdd]);
    }

    setLastIsim(newIsimAdd);
  }


  const setSecilenKelimeFNC = (kelime) => {
    setSecilenKelime(kelime);
    kelime && setRegex(setRegexFnc(kelime, action))
  } 

  const setActionFNC = (actionx) => {
    setAction(actionx);
    setSecilenKelime(secilenKelime);
    secilenKelime && setRegex(setRegexFnc(secilenKelime, actionx));
  } 

  const setRegexFNCX = (regex) => {
    setRegex(regex);
    lastIsimFNC(secilenKelime, type, regex);
  } 
  

  
  const setRegexFnc = (kelime, newAction) => {
      //kelimenin durumuna göre regex oluşturalım burada
      kelime = kelime.toLowerCase();
      let kelimeArr = [...kelime];

      let newRegex = "/(" + kelimeArr[0].toUpperCase() + "|";
      newRegex += kelimeArr[0].toLowerCase() + ")?";
      /* ekleme anındaki regex */
      if(newAction == "ekle"){
        delete kelimeArr[0];
        newRegex += kelimeArr.join("");
        newRegex += "(ler|lar)?(den|nin)?";

      /* silme durumundaki regex */
      }else if(newAction == "sil"){
        newRegex += kelime;
      }

      newRegex += "/"
      lastIsimFNC(kelime, type, newRegex);

      return newRegex;
  }


  /* son seçilen kelime il seçilenleri yeşil yapalım */
  const lastIsimFNC = (kelime, type, regex) => {
      /* burada lastIsimi de değiştirelim */
      let newLastIsimAdd      = {}
      newLastIsimAdd.kelime   = kelime;
      newLastIsimAdd.type     = type;
      newLastIsimAdd.regex    = regex;
      newLastIsimAdd.ekler    = [];

      if(secilenKelime.length > 2){
        setLastIsim(newLastIsimAdd);
      }else{
        setLastIsim({});
      }

  }


  const kaydetBTN = () => {
    addNewKelime(secilenKelime, type, regex);
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
                  <Cumleler key={key} item={item} setSecilenKelime={setSecilenKelimeFNC} newIsim={newIsim} newSil={newSil} lastIsim={[lastIsim]}/>
                )}
              </List>
            </Grid.Column>

            <Grid.Column computer="6" mobile="16">
              <div>
  
                <AddForm kaydetBTN={kaydetBTN} 
                  kelime={secilenKelime} 
                  secilenKelime={secilenKelime} 
                  setSecilenKelime={setSecilenKelimeFNC}
                  regex={regex}
                  setRegex={setRegexFNCX}
                  action={action}
                  setAction={setActionFNC}
                  type={type}
                  setType={setType}
                  />


              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

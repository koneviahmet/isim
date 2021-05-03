import {useState, useEffect} from 'react'
import { Container, Grid, List, Button, Label, Form, Dropdown} from 'semantic-ui-react'


const AddForm = ({addNewKelimeParent, denetle, kelime}) => {
    const [secilenKelime, setSecilenKelime] = useState("");
    const [regex, setRegex]                 = useState("regex");
    const [lastIsim, setLastIsim]           = useState({});
    const [newIsim, setNewIsim]             = useState([]);
    const [newSil, setNewSil]               = useState([]);
    const [ekler, setEkler]                 = useState("")
    const [action, setAction]               = useState("ekle");
    const [istisna, setIstisna]             = useState("");
    const [type, setType]                   = useState("canli");
    

    useEffect(() => {
      kelime && setSecilenKelimeFNC(kelime);
    },[kelime])
 
    const addNewKelime = (isim, type, regex) => {
      let newIsimAdd           = {}
      newIsimAdd.kelime        = isim;
      newIsimAdd.type          = type;
      newIsimAdd.regex         = regex;
      newIsimAdd.ekler         = ekler.split(",") || [];
      newIsimAdd.istisna       = istisna.split(",") || [];
          
      addNewKelimeParent(newIsimAdd, action);
      setLastIsim(newIsimAdd);
    }


    const setRegexFnc = (kelime, newAction) => {
      //kelimenin durumuna göre regex oluşturalım burada
      kelime = kelime.toLowerCase();
      let kelimeArr = [...kelime];

      let newRegex = "^(" + kelimeArr[0].toUpperCase() + "|";
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

      newRegex += "$"
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
      newLastIsimAdd.ekler    = ekler.split(",") || [];
      newLastIsimAdd.istisna  = istisna.split(",") || [];


      if(secilenKelime.length > 2){
        setLastIsim(newLastIsimAdd);
      }else{
        setLastIsim({});
      }
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

    const kaydetBTN = () => {
      addNewKelime(secilenKelime, type, regex);
    }

    const typeArr = [
      { key: 'canli', text: 'Canlı', value: 'canli' },
      { key: 'cansiz', text: 'Cansiz', value: 'cansiz' },
    ]
    
    const actionArr = [
        { key: 'ekle', text: 'Ekle', value: 'ekle' },
        { key: 'sil', text: 'Sil', value: 'sil' },
    ]


    return (
        <div style={{padding: '20px', background: '#f1f1f1', borderRadius: '5px', margin: '6px'}}> 
        <Form>
          
            <Form.Field>
              <label>Kelime</label>
              <input placeholder='kelime...' value={secilenKelime} onChange={(e) => setSecilenKelimeFNC(e.target.value)}/>
            </Form.Field>

            <Form.Field>
              <label>Action</label>
              <Dropdown placeholder={action} defaultValue={action} fluid  selection options={actionArr} onChange={(e,value) => setActionFNC(value.value)}/>
            </Form.Field>

            <Form.Field>
              <label>Regex</label>
              <input placeholder='Regex' value={regex} onChange={(e) => setRegexFNCX(e.target.value)} />
            </Form.Field>

            <Form.Field>
              <label>Type</label>
              <Dropdown placeholder={type} defaultValue={type} fluid  selection options={typeArr} onChange={(e,value) => setType(value.value)}/>
            </Form.Field>

            <Form.Field>
              <label>Ekler</label>
              <input placeholder='ekler...' value={ekler} onChange={(e) => setEkler(e.target.value)}/>
            </Form.Field>


            <Form.Field>
              <label>İstisnalar</label>
              <input placeholder='istisnalar...' value={istisna} onChange={(e) => setIstisna(e.target.value)}/>
            </Form.Field>

            <Form.Field>
              <Button color="green" fluid onClick={() => denetle(lastIsim)}>Denetle</Button>
            </Form.Field>
          </Form>

          <Button color="red" style={{marginTop: 15}} fluid onClick={() => kaydetBTN()}>Kaydet</Button>
      </div>
       
    )
}



export default AddForm

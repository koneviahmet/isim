import {List,Label, Icon} from 'semantic-ui-react'
import PopupHelper from '../helper/popupHelper'
import styles from '../styles/Home.module.css'

const Cumleler = ({item, setSecilenKelime, newIsim, newSil, lastIsim}) => {


    /* yeni eklediğimiz isim veye silinen kelimeye uyanları denetleyelim */
    let isFind = (arr, kelime) =>{
      let find = false;
      
      /* 
         let findIsim = isimArr.find(
      
            item => item.kelime == kelime 

     
            || item.ekler.find(ek => ek == kelime)
            

       
            || 
            (
                (item.regex && RegExp(item.regex, 'g').test(kelime)) 
                && !item.istisna.find(ek => ek == kelime)
            )
        );
      */

      if(!arr || arr.length == 0 || !(arr[0] && arr[0].kelime))
          return false; 
      
      try {
      
          find = arr && arr.find(
            item => item.kelime == kelime 
            || item.ekler.find(ek => ek == kelime)
            || 
            (    
              item.regex && RegExp(item.regex, 'g').test(kelime)
              && !item.istisna.find(ek => ek == kelime)
            )
          );
      

        
      } catch (error) {
        console.log("regex Hata");
      }
       

      return find && true || false;
    } 

    return (
        
        <List.Item style={{padding: '10px'}}>
        <List.Content floated='left'>
          <strong>{Math.ceil((item.kalanlar.length / item.kelimeler.length) * 100)}</strong>% | {item.cumle}
          

          {item.secilenler.length > 0 && <div className={styles.kelimeList}>
          
            <PopupHelper title="Seçilenler">
              <Label circular color="green" size='mini'> {item.secilenler.length} </Label>
            </PopupHelper>

            {item.secilenler.map((s, k) => 
              <Label style={{marginTop: '4px', opacity: .8}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

          {item.silinenler.length > 0 && <div className={styles.kelimeList}>

            <PopupHelper title="Silinenler">
              <Label circular color="red" size='mini'> {item.silinenler.length} </Label>
            </PopupHelper>
            
            {item.silinenler.map((s, k) => 
              <Label style={{marginTop: '4px', opacity: .8}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

          {item.kalanlar.length > 0 && <div className={styles.kelimeList}>
            <PopupHelper title="Kalanlar">
              <Label circular color="blue" size='mini'> {item.kalanlar.length} </Label>
            </PopupHelper>

            {item.kalanlar.map((s, k) => 
              <Label 
                color={isFind(lastIsim,s) && "green" || 'grey'} 
                style={{marginTop: '4px', cursor: 'pointer', opacity: (isFind(newIsim,s) || isFind(newSil,s)) && 0.5 || 1}} 
                key={k} 
                onClick={() => setSecilenKelime(s.toLowerCase())}
              >
              
                {s}
              </Label>
            )}
          </div>}


          {item.kelimeler.length > 0 && <div className={styles.kelimeList}>
            <PopupHelper title="Kelimeler">
              <Label circular color="yellow" size='mini'> {item.kelimeler.length} </Label>
            </PopupHelper>

            {item.kelimeler.map((s, k) => 
              <Label style={{marginTop: '4px', opacity: .8}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

        </List.Content>

      </List.Item>
  
    )
}

export default Cumleler

import {List,Label} from 'semantic-ui-react'
import PopupHelper from '../helper/popupHelper'
import styles from '../styles/Home.module.css'

const Cumleler = ({item, setSecilenKelime}) => {
    return (
        <List.Item style={{padding: '10px'}}>
        <List.Content floated='left'>
          {item.cumle}

          {item.secilenler.length > 0 && <div className={styles.kelimeList}>
          
            <PopupHelper title="Seçilenler">
              <Label circular color="green" size='mini'> {item.secilenler.length} </Label>
            </PopupHelper>

            {item.secilenler.map((s, k) => 
              <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

          {item.silinenler.length > 0 && <div className={styles.kelimeList}>

            <PopupHelper title="Silinenler">
              <Label circular color="red" size='mini'> {item.silinenler.length} </Label>
            </PopupHelper>
            
            {item.silinenler.map((s, k) => 
              <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

          {item.kalanlar.length > 0 && <div className={styles.kelimeList}>
            <PopupHelper title="Kalanlar">
              <Label circular color="blue" size='mini'> {item.kalanlar.length} </Label>
            </PopupHelper>

            {item.kalanlar.map((s, k) => 
              <Label style={{marginTop: '4px', cursor: 'pointer'}} key={k} onClick={() => setSecilenKelime(s.toLowerCase())} size='mini'>{s}</Label>
            )}
          </div>}


          {item.kelimeler.length > 0 && <div className={styles.kelimeList}>
            <PopupHelper title="Kelimeler">
              <Label circular color="yellow" size='mini'> {item.kelimeler.length} </Label>
            </PopupHelper>

            {item.kelimeler.map((s, k) => 
              <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
            )}
          </div>}

        </List.Content>

      </List.Item>
  
    )
}

export default Cumleler

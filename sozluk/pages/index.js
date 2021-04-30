import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, Dropdown} from 'semantic-ui-react'
import secilenCumler from '../secilenCumler.json'


export default function Home() {
  const [secilenKelime, setSecilenKelime] = useState("");
  const [action, setAction]   = useState("ekle");
  const [regex, setRegex]     = useState("regex");
  const [type, setType]       = useState("canli");



  const typeArr = [
    { key: 'canli', text: 'Canlı', value: 'canli' },
    { key: 'cansiz', text: 'Cansiz', value: 'cansiz' },
  ]

  const actionArr = [
    { key: 'ekle', text: 'Ekle', value: 'ekle' },
    { key: 'sil', text: 'Sil', value: 'sil' },
  ]

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
                
                    <List.Item key={key} style={{padding: '10px'}}>
                      <List.Content floated='left'>
                        {item.cumle}

                        {item.secilenler.length > 0 && <div className={styles.kelimeList}>
                        <Label circular color="green" size='mini'> {item.secilenler.length} </Label>
                          {item.secilenler.map((s, k) => 
                            <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
                          )}
                        </div>}

                        {item.silinenler.length > 0 && <div className={styles.kelimeList}>
                        <Label circular color="red" size='mini'> {item.silinenler.length} </Label>
                          {item.silinenler.map((s, k) => 
                            <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
                          )}
                        </div>}

                        {item.kalanlar.length > 0 && <div className={styles.kelimeList}>
                        <Label circular color="blue" size='mini'> {item.kalanlar.length} </Label>
                          {item.kalanlar.map((s, k) => 
                            <Label style={{marginTop: '4px', cursor: 'pointer'}} key={k} onClick={() => setSecilenKelime(s.toLowerCase())} size='mini'>{s}</Label>
                          )}
                        </div>}


                        {item.kelimeler.length > 0 && <div className={styles.kelimeList}>
                        <Label circular color="yellow" size='mini'> {item.kelimeler.length} </Label>
                          {item.kelimeler.map((s, k) => 
                            <Label style={{marginTop: '4px'}} key={k} size='mini'>{s}</Label>
                          )}
                        </div>}

                      </List.Content>

                    </List.Item>
                
                )}
              </List>
            </Grid.Column>

            <Grid.Column width="6">
              <div>
  
                <div style={{padding: '20px', background: '#f1f1f1', borderRadius: '5px', margin: '6px'}}> 
                  <Form>
                    
                      <Form.Field>
                        <label>Kelime</label>
                        <input placeholder='kelime...' value={secilenKelime} onChange={(e) => setSecilenKelime(e.target.value)}/>
                      </Form.Field>

                      <Form.Field>
                        <label>Action</label>
                        <Dropdown placeholder={action} defaultValue={action} fluid  selection options={actionArr} onChange={(e,value) => setAction(value.value)}/>
                      </Form.Field>

                      <Form.Field>
                        <label>Regex</label>
                        <input placeholder='Regex' value={regex} onChange={(e) => setRegex(e.target.value)} />
                      </Form.Field>

                      <Form.Field>
                        <label>Type</label>
                        <Dropdown placeholder={type} defaultValue={type} fluid  selection options={typeArr} onChange={(e,value) => setType(value.value)}/>
                      </Form.Field>

                      <Form.Field>
                        <Button color="red" fluid onClick={() => kaydetBTN()}>Kaydet</Button>
                      </Form.Field>
                    </Form>
                </div>
                 

              </div>
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </Container>
      
    </div>
  )
}

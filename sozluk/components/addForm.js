import {useState, useEffect} from 'react'
import { Container, Grid, List, Button, Label, Form, Dropdown} from 'semantic-ui-react'


const AddForm = ({kaydetBTN, secilenKelime, setSecilenKelime, regex, setRegex, action, setAction, type, setType}) => {
    
    

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
       
    )
}



export default AddForm

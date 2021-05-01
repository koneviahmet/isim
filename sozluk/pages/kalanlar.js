import Head from 'next/head'
import {useState, useRef} from 'react'
import styles from '../styles/Home.module.css'
import { Container, Grid, List, Button, Label, Form, TextArea} from 'semantic-ui-react'
import copy from 'copy-to-clipboard';


export default function Kalanlar() {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);  

  const setTxtFNC = (val) => {
    let newVal = val.replace(RegExp("ඈ","g"),"i");

    setText(newVal);
    copy(newVal);
  }

  const kopyalaFNC = () => {
    copy(text);
  }

  return (
    <div>
       <TextArea onChange={(e) => setTxtFNC(e.target.value)} style={{ minHeight: 100, width: '95%', margin: 10 }} value={text} />
    
    
        <div style={{padding: 10}}>
          {text}
        </div>

        <Button onClick={() => kopyalaFNC()}>Kopyala</Button>
    </div>

  )
}

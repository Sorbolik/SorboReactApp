import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd'
import './App.css';
import ChatPopUp from './components/ChatPopUp/ChatPopUp';

function App() {
  
  const ws = new WebSocket("wss://146.190.231.201:8082");

  const formField = React.useRef(null)
  const messagesEndRef = React.useRef(null)

  const [messagesArray, setMessagesArray] = useState(
    []
  );

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   submit();
  // }

  const submit = () => {
    // let textNode = document.createElement('div');
    // textNode.innerHTML = message;
    // this.pageForm.controls['messageBox'].setValue('');
    ws.send(formField?.current?.getFieldValue('message'));

    let cose = [{ name: 'message', value: '' }];
    doThings(cose);
    console.log(`We sent a message to the server ${formField?.current?.getFieldValue('message')}`)

  }
  const doThings = (cose) => {
    return formField?.current?.setFields(cose)

  }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }


  useEffect(() => {
    ws.onmessage = (message) => {
      messagesArray.push(message.data);
      setMessagesArray([...messagesArray]);
      // let textNode1 = document.createElement('div');
      // textNode1.innerHTML = message.data;
      // document.getElementById('messages').append(textNode1);
      console.log(`We received a message from the server ${message.data}`)
      console.log(`MESSAGES ${messagesArray}`)

    }
  }, [])


  useEffect(scrollToBottom, [messagesArray]);

  return (
    <div className="App">
      <header className="App-header">
        <div className='popups'>
          {messagesArray.map((elem, i) => {
            return <ChatPopUp actualText={elem} index={i} key={i}></ChatPopUp>
          })}
          <div style={{ marginBottom: "39px" }} ref={messagesEndRef} />
        </div>
        <Form onFinish={submit} ref={formField}>
          <Form.Item
            name='message'
            initialValue=''>
            <Input></Input>
          </Form.Item>
          <Button onClick={submit}>INVIA</Button>

          {/* <div className='inputBox'>
            <label>
              Scrivi:
            <input type="text" name="message" />
            </label>
            <input onClick={submit} type="button" value="Invia" />
          </div> */}
        </Form>
      </header>
    </div>
  );
}

export default App;

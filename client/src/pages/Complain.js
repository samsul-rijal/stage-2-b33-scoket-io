// import hook
import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'

import Navbar from '../components/Navbar'

// import components here
import Contact from '../components/complain/Contact'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside component
let socket
export default function Complain() {
    // code here
    const [contact,setContact]=useState(null)
    const [contacts,setContacts]=useState([])

    const title = "Complain"
    document.title = 'DumbMerch | ' + title
    // code here

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load admin contact")
    
        // listen event to get admin contact
        socket.on("admin contact", (data) => {
            // do whatever to the data sent from server
            console.log(data);
            const dataContact = {
                ...data,
                message: 'Click here to start message'
            }
            setContacts([dataContact])
            // console.log(dataContact);
        })
    }

    const onClickContact = (data)=>{
        console.log(data);
        setContact(data)
    }

    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here
        loadContact()

        return () => {
            socket.disconnect()
        }
    }, [])

    
    return (
        <>
            <Navbar title={title} />
            {/* code here */}
            <Container>
                <Row>
                    <Col>
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}

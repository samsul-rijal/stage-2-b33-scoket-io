// import hook
import React, { useEffect, useState } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import components here
import { Container,Row,Col } from 'react-bootstrap'

// import components here
import Contact from '../components/complain/Contact'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // code here
    const [contact,setContact]= useState()
    const [contacts,setContacts]= useState([])

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    const loadContacts = () => {
        // emit event to load admin contact
        socket.emit("load custommer contacts")
    
        // listen event to get admin contact
        socket.on("custommer contacts", (data) => {
            // do whatever to the data sent from server
            console.log(data);

            let dataContacts = data.filter(item => item.status !== 'admin')
            
            dataContacts = dataContacts.map((item)=>({
                ...item,
                message: "Click here to start message"
            }))

            setContacts(dataContacts)
            console.log(dataContacts);
        })
    }






    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here
        loadContacts()

        return () => {
            socket.disconnect()
        }
    }, [])

    // code here
    const onClickContact = (data)=>{
        // console.log(data);
        setContact(data)
    }

    return (
        <>
            <NavbarAdmin title={title} />
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

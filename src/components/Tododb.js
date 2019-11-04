import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, FormControl, Badge, CardColumns, Card, Form, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socketIOClient from "socket.io-client";

class Tododb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://localhost:4000",
            title: '',
            todo: '',
            items: [],
            dates: new Date().toLocaleString()
        }
        this.save = this.save.bind(this);
    }

    updateonnew = () =>{
        fetch("http://localhost:4000/todos", {

            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((res) => res.json())
            .then((response) => {
                this.setState({ items: response.todos })
            })
    }

    componentDidMount() {
        fetch("http://localhost:4000/todos", {

            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((res) => res.json())
            .then((response) => {
                this.setState({ items: response.todos })
                const socket = socketIOClient(this.state.endpoint);
                
                socket.on('saved', (mss) => {

                    toast.warning(mss.message_io, {
                        position: toast.POSITION.TOP_RIGHT
                      });

                      if(mss.message_io === "Guardado!"){
                          this.updateonnew();
                      }
                })
            })
    }

    save = () => {

        var obj = {
            id: 3,
            title: this.refs.title.value,
            todo: this.refs.todo.value,
            date: this.state.dates
        }



        this.setState({ items: [...this.state.items, obj] })

        fetch("http://localhost:4000/save", {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                title: this.refs.title.value,
                todo: this.refs.todo.value
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response.message)
                toast.success("Guardado!", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            })

    }

    delete = (i, del) => {
        alert(i)
        this.state.items.splice(i, 1);
        this.setState({ items: this.state.items })


          fetch("http://localhost:4000/delete/" + del, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                
              },
          })
          .then((res) => res.json())
          .then((response) => {
            toast.warning(response.message, {
                position: toast.POSITION.TOP_RIGHT
              });
          })
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <Container>
                    <br></br>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="test" placeholder="Titulo" ref="title" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="text" as="textarea" rows="3" placeholder="Por hacer" ref="todo" />
                        </Form.Group>

                    </Form>

                    <Button variant="primary" type="submit" onClick={() => this.save()}>
                        Guardar
                        </Button>
                </Container>
                <br></br>
                <Container>
                    <CardColumns >
                        {
                            this.state.items.reverse().map((item, i) => {
                                return <Card key={i}>

                                    <Card.Body>
                                        <Card.Title>{item.title}
                                            <Button style={{ flex: 1, position: 'absolute ', top: 2, right: 0, borderRadius: 80, marginRight: 2 }} variant="danger" type="submit" onClick={() => this.delete(i, item._id)}>
                                                X
                                        </Button>
                                        </Card.Title>

                                        <Card.Text>
                                            {item.todo}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>

                                        <small className="text-muted">{item.date}</small>


                                    </Card.Footer>
                                </Card>
                            })
                        }




                    </CardColumns>
                </Container>
            </div>
        )
    }
}


export default Tododb;
import React, { Component } from 'react';
import { Nav, Badge, CardColumns, Card, Form, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            todo: '',
            items: [],
            dates: new Date().toLocaleString(),
            datas: 0
        }
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("todos")) {
            localStorage.setItem("todos", "")
        } else {
            var getData = JSON.parse(localStorage.getItem("todos"))
            console.log(getData)
            this.setState({ items: getData, datas:this.state.items.length })
        }
    }


    save = () => {

        var obj = {
            id: 3,
            title: this.refs.title.value,
            todo: this.refs.todo.value,
            date: this.state.dates
        }
        var objt = [{
            id: 3,
            title: this.refs.title.value,
            todo: this.refs.todo.value,
            date: this.state.dates
        }]

        if (!localStorage.getItem("todos")) {
            //var getData = JSON.parse(localStorage.getItem("todos"))
            this.setState({ items: [...this.state.items, obj] })
            localStorage.setItem("todos", JSON.stringify(objt))
            toast.success("Guardado!", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
        else {

            this.setState({ items: [...this.state.items, obj] }, () => localStorage.setItem("todos", JSON.stringify(this.state.items)))
            toast.success("Guardado!", {
                position: toast.POSITION.TOP_RIGHT
              });

        }
    }

    delete = (i) => {
        alert(i)
        this.state.items.splice(i, 1);
        this.setState({ items: this.state.items })
        localStorage.setItem("todos", JSON.stringify(this.state.items))
        toast.warning("Eliminado!", {
            position: toast.POSITION.TOP_RIGHT
          });
    }

    render() {
        return (
            <div style={{ backgroundColor: '#282c34' }}>
               <ToastContainer />

                <h1>{this.state.title}</h1>
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
                                            <Button style={{ flex: 1, position: 'absolute ', top: 2, right: 0, borderRadius: 80, marginRight: 2 }} variant="danger" type="submit" onClick={() => this.delete(i)}>
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
        );
    }
}


export default Todo;
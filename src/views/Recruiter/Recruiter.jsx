import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Table from 'variables/TableRecruiter';
import Input from './RecruiterInput';
import axios from 'axios';
import Cookies from 'js-cookie';
import { rowData } from '../../variables/TableRecruiter';

class Recruiter extends Component {
    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.state = { show: false, nameErr: "" }
    }

    handleHide() {
        this.setState({ show: false });
    }

    validate() {
        let isError = false
        const error = {
            nameErr: "",
        }
        if (rowData.email === "") {
            isError = true;
            error.nameErr = "there is no data select"
        }
        this.setState(error)
        return isError
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    onDelete(e) {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            window.scrollTo(0, 0);
            this.setState({
                show: true
            })
        }
    }

    Delete() {
        const users = {
            // name: this.state.name,
            // email: this.state.email + "@tokopedia.com",
            email: rowData.email,
            deletes: Cookies.get('__hrnu')
        }
        var authOptions = {
            method: 'POST',
            url: 'http://0.0.0.0:8080/authLogin/delete',
            data: JSON.stringify(users),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        };
        axios(authOptions)
        .then(function (response) {
            console.log(response.status, "success");
        })
        .catch(function (error) {
            console.log(error);
        });

        window.location.href = "/Recruiter"
    }

    render() {
        return (
            <div className="content">
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title" >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Are you sure want to Delete?
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            When you click delete the user  <strong>{rowData.name}</strong>  cannot be enter this dashboard anymore
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-main" onClick={this.handleHide}>Cancel</Button>
                            <button
                                id="modalBtn"
                                type="button"
                                className="btn btn-main"
                                onClick={this.Delete}>Delete</button>
                        </Modal.Footer>
                </Modal>


                <Grid fluid>
                    <Row>
                        <Col md={4}>
                            <Card
                                title="Recruiters"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Input />
                                }
                            />
                        </Col>
                        <Col md={8}>
                            <Card
                                category="data of Recruiters"

                                ctTableFullWidth ctTableResponsive
                                content={
                                    <div>
                                        <p id="inputEmail" style={{ color: "#ff0019" }} >{this.state.nameErr}</p>
                                        <Table />
                                        <button
                                            id="btnDelete"
                                            type="button"
                                            className="btn btn-main"
                                            onClick={e => this.onDelete(e)}>Delete</button>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Recruiter;

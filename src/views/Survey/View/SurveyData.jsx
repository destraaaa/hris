import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

export default class SurveyData extends Component {
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            show: false,
            err: ""
        }
    }

    componentDidMount() {
        //trigger surveynya apa??
        const id = 2;
        axios.get('http://0.0.0.0:8080/survey/form/view/' + id).then(res => {
            console.log("res of data", res.data)
            $(document).ready(function () {
                $('.prev-holder').css('cursor', 'default');
                $(".form-actions.btn-group").addClass('btn');
                $(".form-actions.btn-group.btn").addClass('survey');
                $(".save-template").addClass('survey-save');
                $(".radio-inline > label").addClass('survey-label');
                $('.field-actions').remove();        
                $('.ui-sortable').sortable('destroy');
                
            });
            var option = {
                defaultFields: res.data.schema,
                disabledActionButtons: ['data', 'clear'],
                stickyControls: {
                    enable: false
                },
                disableFields: [
                    'header',
                    'paragraph',
                    'text',
                    'checkbox-group',
                    'radio-group',
                    'select',
                    'textarea',
                    'date',
                    'number',
                    'hidden',
                    'file',
                    'button',
                    'autocomplete'
                ],
                onSave: (evt, formData) => {
                    let formSchema = formBuilder.actions.getData();
                    let formArray = {};
                    let error = [];

                    formSchema.forEach(element => {
                        if (element.value === undefined) {
                            if (element.type === "radio-group" || element.type === "select") {
                                element.values.forEach(elVal => {
                                    if (elVal.value === "" && element.required) {
                                        error.push(element.label)

                                    } else if (elVal.selected) {
                                        formArray[element.label] = elVal.value
                                    }
                                });
                            }
                            else if (element.type === "checkbox-group") {
                                let tempVal = []

                                element.values.forEach(elVal => {
                                    if (elVal.selected) {
                                        tempVal.push(elVal.value)
                                    }
                                });
                                if (tempVal.length === 0 && element.required) {
                                    error.push(element.label)
                                } else {
                                    formArray[element.label] = tempVal.join(", ")
                                }
                            }
                            else if (element.type !== "header" && element.type !== "paragraph") {
                                if (element.required) {
                                    error.push(element.label)
                                }
                            }
                        }
                        else {
                            formArray[element.label] = element.value
                        }
                    });


                    if (error.length === 0) {
                        let formResult = {
                            schemaId: id,
                            answer: formArray

                        }
                        this.setState({
                            err: ""
                        })
                        var config = {
                            method: 'POST',
                            url: 'http://0.0.0.0:8080/survey/result/save',
                            data: formResult,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            json: true
                        }

                        axios(config).then((response) => {
                            this.setState({
                                show: true
                            })
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                    else {
                        let showError = error.join(", ")
                        this.setState({
                            err: showError
                        })
                        // console.log("error", showError)
                    }
                }

            }
            let fbEditor = $('#form-survey');
            let formBuilder = fbEditor.formBuilder(option);
        });

    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        document.title = "PT.Tokopedia - Survey Form"
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Thank You For Your Participation
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 style={{ textAlign: "center" }}>Please Press the Button to Continue</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>Continue</Button>
                    </Modal.Footer>
                </Modal>
                <div id="form-survey"></div>
                <p id="validate">{this.state.err === "" ? "" : this.state.err + " is Empty"}</p>
            </div>
        )
    }

}
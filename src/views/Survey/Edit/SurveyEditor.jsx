import React, { Component } from 'react';
import $ from 'jquery';
// import { preview } from '../Preview/SurveyAction';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');
require('formBuilder/dist/form-render.min.js');


export default class SurveyEditor extends Component {
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            show: false,
            name: "",
            prevPath: ""
        }
    }

    handleHide() {
        this.setState({ show: false });
    }

    handelFinish = () => {
        $(".main-card").removeClass("hidden");
        window.location.href = "/survey"
    }
    handelBack = ({ history }) => {
        $(".main-card").removeClass("hidden");
        window.location.href = "/survey";
    }



    componentDidMount() {
        const { id } = this.props.match.params;
        $(".main-card").addClass("hidden");
        axios.get(`http://0.0.0.0:8080/survey/form/view/${id}`).then(res => {
            $(document).ready(function () {
                $(".radio-inline > label").addClass('survey-label');
            });

            this.setState({
                name: res.data.schemaName
            })
            var schemaData
            if ($.isEmptyObject(res.data))
                schemaData = []
            else
                schemaData = res.data.schema

            var options = {
                defaultFields: schemaData,
                stickyControls: {
                    enable: true,
                    offset: {
                        top: 70,
                    }
                },
                editOnAdd: true,
                actionButtons: [
                    {
                        id: 'back',
                        className: 'btn back-btn',
                        label: 'Back',
                        type: 'button',
                        events: {
                            click: ({ history }) => {
                                $(".main-card").removeClass("hidden");
                                window.location.href = "/survey";
                                // this.props.history.goBack();
                            }
                        }
                    },
                ],
                disableFields: ['hidden', 'file', 'button'],
                disabledAttrs: [
                    'access',
                    'name',
                    'value',
                    'multiple',
                    'other'
                ],
                controlOrder: [
                    'header',
                    'paragraph',
                    'text',
                    'checkbox-group',
                    'radio-group',
                    'select',
                    'textarea',
                    'date',
                    'number'
                ],

                disabledActionButtons: [
                    'data',
                    'clear'
                ],
                onSave: (evt, formData) => {
                    let question = [];
                    let data = formBuilder.actions.getData();

                    data.forEach(element => {
                        if (element.type === "header" || element.type === "paragraph") {
                        }
                        else {
                            question.push(element.label)
                        }

                    });

                    let name;
                    if (this.props.surveyName !== "") {
                        name = this.props.surveyName
                    }
                    else {
                        name = this.state.name
                    }
                    var form = {
                        schemaId: id,
                        schemaName: name,
                        userid: Cookies.get('__hrni'),
                        schema: data,
                        questions: question
                    }

                    var config = {
                        method: 'POST',
                        url: 'http://0.0.0.0:8080/survey/form/save',
                        data: form,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        json: true
                    }

                    axios(config)
                        .then((response) => {
                            this.setState({
                                show: true
                            })
                        }).catch((error) => {
                            console.log(error);
                        })
                }

            };
            let fbEditor = $('#editor');
            let formBuilder = fbEditor.formBuilder(options);

        })
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            The Form Survey Has been Saved
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 style={{ textAlign: "center" }}>Please Press the Button to Continue</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handelFinish}>Continue</Button>
                    </Modal.Footer>
                </Modal>
                <div id="editor"></div>
            </div>
        )
    }
}
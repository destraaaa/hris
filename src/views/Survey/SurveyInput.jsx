import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import {
    Route,
    Link,
    BrowserRouter,
    Switch

} from 'react-router-dom';
import Cookies from 'js-cookie';
import SurveyEditor from './Edit/SurveyEditor';
import SurveyResult from './Result/TableSurveyResult';
import CardFlip from 'components/CardFlip/CardFlip';
const $ = require('jquery');

const popoverAddNew = (
    <Popover id="popover-positioned-bottom" >
        <strong>Add new!</strong> make survey
    </Popover>
);

export default class SurveyInput extends Component {
    constructor() {
        super();
        this.state = {
            surveySchema: [],
            lastId: 0,
            show: false,
            name: "",
            finish:false
        }
        var filterSurvey = [];
        this.onAdd = this.onAdd.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.cardToggle = this.cardToggle.bind(this);
    }

    componentDidMount() {
        this.viewData()
    }

    viewData() {
        axios.get("http://0.0.0.0:8080/survey/form/view").then(res => {
            let currentId = Cookies.get('__hrni')
            let schema = []
            let tempSchema
            if (!$.isEmptyObject(res.data.ids)) {
                res.data.ids.forEach(element => {
                    // if (element.userId === currentId) {
                        tempSchema = {
                            id: element.schemaId,
                            name: element.schemaName,
                        }
                        schema.push(tempSchema)
                    // }
                });

                this.filterSurvey = schema
                this.setState({
                    surveySchema: schema,
                    lastId: res.data.lastId + 1
                })
            }
            //for first Survey
            else {
                console.log("masuk first")
                let lastId = 1
                tempSchema = {
                    id: lastId,
                    name: "Survey " + lastId
                }
                this.setState({
                    surveySchema: schema,
                    lastId: lastId
                })
            }
        })
    }

    onAdd() {
        let addId = this.state.lastId + 1
        let tempSchema = {
            id: addId,
            name: "Survey " + addId
        }
        var joined = this.state.surveySchema.concat(tempSchema);
        this.setState({
            surveySchema: joined,
            show: true
        })
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value
        });
    };

    handleHide() {
        this.state.surveySchema.pop();
        this.setState({ show: false});
    }


    cardToggle() {
            this.setState({ show: false, finish:true });
    }

    handleSearch(e){
        var searchQuery = e.target.value.toLowerCase();
        var displayedSurvey = this.filterSurvey.filter(function(el) {
            var searchValue = el.name.toLowerCase();
            
            return searchValue.indexOf(searchQuery) > -1;
        });
                   
        this.setState({
            surveySchema: displayedSurvey
        });
      }

    render() {
        return (
            <BrowserRouter>
                <div className='main-survey'>
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title" >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                What is your Survey Name?
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="input-survey">
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    maxLength="35"
                                />
                                <strong> (maximum {35 - this.state.name.length} Character Left)</strong>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id="modalBtn" className="btn btn-main" onClick={this.handleHide}>Cancel</Button>
                            <Link to={ '/edit/' + this.state.lastId}>
                            
                                <button type="button" className="btn btn-main" onClick={this.cardToggle}>Add</button>
                            </Link>
                        </Modal.Footer>
                    </Modal>

                    <div className="main-card">
                    <input className= "input-search" type="text" onChange={e=>this.handleSearch(e)} placeholder="Search..."/>
                        <div className="Cards">
                            {
                                this.state.surveySchema.map((el) =>
                                    <CardFlip title={el.name} key={el.id} cardId={el.id} />)
                            }
                            <div className="Card">
                                <div className="btn card-front card-add">
                                    <div id="add-survey">
                                        <OverlayTrigger trigger={['hover']} placement="bottom" overlay={popoverAddNew}>
                                            <i className="fa fa-plus-circle" id="add-circle" onClick={this.onAdd}></i>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="btn-card-flip">
                                        <div className="btn btn-flip">flip</div>
                                        <div className="btn btn-flip">button</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route
                            path={"/edit/:id"}
                            render={(props) => <SurveyEditor {...props} surveyName={this.state.name} />}
                        />
                        <Route
                            path={"/result/:id"}
                            component={SurveyResult}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}


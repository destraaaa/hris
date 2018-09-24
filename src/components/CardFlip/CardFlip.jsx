import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
const $ = require('jquery');

export default class CardFlip extends Component {
  constructor(props) {
    super()
    this.state = {
      flipped: false,
      clicked: false,
      show: false,
      showRename: false,
      name: "",
      err: "",
      spawn: ""
    }
    this.flip = this.flip.bind(this)
    this.onDelete = this.onDelete.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRename = this.onRename.bind(this);
    this.rename = this.rename.bind(this);
  };

  flip() {
    this.setState({
      flipped: !this.state.flipped,
      clicked: true,
    })
  };

  editSurvey(id) {
    $(".main-card").addClass("hidden");
  }

  resultSurvey(id) {
    $(".main-card").addClass("hidden");
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  };

  validate() {
    let isError = false;
    const error = {
      err: "",
    };
    if (this.state.name === "") {
      isError = true;
      error.err = "Survey name is empty!!!";
      error.spawn = " spawn";
    }
    if (this.state.name.length > 35) {
      isError = true;
      error.err = "Survey name is too long!!!";
      error.spawn = " spawn";
    }


    this.setState(error);
    return isError

  }

  rename(id) {
    const err = this.validate()
    if (!err) {
      const survey = {
        schemaId: id,
        schemaName: this.state.name
      }
      // console.log("survey", survey)
      var authOptions = {
        method: 'POST',
        url: 'http://0.0.0.0:8080/survey/form/save',
        data: JSON.stringify(survey),
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

      window.location.href = "/Survey"
      this.setState({ showRename: false });

    }
  }


  handleHide() {
    this.setState({ show: false, showRename: false });
  }

  onDelete(e) {
    e.preventDefault();
    this.setState({
      show: true
    })
  }

  onRename(e) {
    e.preventDefault();
    this.setState({
      showRename: true
    })
  }

  Delete(id) {
    const survey = {
      schemaId: id
    }
    var authOptions = {
      method: 'POST',
      url: 'http://0.0.0.0:8080/survey/form/delete',
      data: JSON.stringify(survey),
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

    window.location.href = "/Survey"
  }

  render() {
    var flippedStyle = this.state.flipped ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedStyle = "";
    return (
      <div className="Card">
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
            When you click delete Form Survey will not available anymore to access!
                          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-main" onClick={this.handleHide}>Cancel</Button>
            <button
              id="modalBtn"
              type="button"
              className="btn btn-main"
              onClick={() => this.Delete(this.props.cardId)}>Delete</button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showRename}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title" >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              What is your new Survey Name?
          </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div id="input-survey">
              <p className={"pRegist " + this.state.spawn}>{this.state.err}</p>
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
            <button type="button" className="btn btn-main" onClick={() => this.rename(this.props.cardId)}>Change</button>
          </Modal.Footer>
        </Modal>
        
        <div onClick={this.flip}>
          <div className={"btn card-front" + flippedStyle}>
            <h3 id="card-title">{this.props.title}</h3>
          </div>
          <div className={"card-back" + flippedStyle}>
            <div className="btn-card-flip">
              <Link to={'/edit/' + this.props.cardId}><button className="btn btn-flip" onClick={() => { this.editSurvey(this.props.cardId) }}>Edit <i className="fa fa-edit" /></button></Link>
              <Link to={'/result/' + this.props.cardId}><button className="btn btn-flip" onClick={() => { this.resultSurvey(this.props.cardId) }}>Result <i className="fa fa-bar-chart" /></button></Link>
              <button className="btn btn-flip" onClick={e => this.onDelete(e)}>Delete <i className="fa fa-close" /></button>
              <button className="btn btn-flip" onClick={this.onRename}>Rename <i className="fa fa-font" /></button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
} 
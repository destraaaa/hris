import React, { Component } from 'react';
import { fonts } from 'pdfmake/build/pdfmake';
const $ = require('jquery');
$.DataTable = require('datatables.net');
// require('jszip');
// require( 'pdfmake');
// require( 'datatables.net-buttons-dt')();
// require( 'datatables.net-buttons/js/buttons.flash.js');
// require( 'datatables.net-buttons/js/buttons.html5.js');


// require( 'pdfmake');
// require('datatables.net-buttons');
// require('datatables.net-buttons/js/buttons.flash.js');
// require('datatables.net-buttons/js/buttons.html5.js');


var jzip = require('jszip');
var dt = require('datatables.net');
var buttons = require('datatables.net-buttons');
var flash = require('datatables.net-buttons/js/buttons.flash.js');
var html = require('datatables.net-buttons/js/buttons.html5.js');
var colVis = require( 'datatables.net-buttons/js/buttons.colVis.js' );

    

export default class Table extends Component {

    
    componentDidMount() {
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                dom: '<"buttons" B>lTfgitp',
                buttons: [{ extend: 'excel', className: 'RcsvButton'},
                          { extend: 'csv', className: 'RcsvButton' }, 
                          {
                            extend: 'colvis',
                            text: 'Show',
                            className: 'RcsvButton' ,
                            columns: ':gt(0)',
                            columns: ':gt(1)',
                          },
                        //   'selectNone'
                        ],                          
                scrollX: true,
                deferRender: true,
                "ajax": {
                    "url": "http://0.0.0.0:8080/rejected/view",
                    "dataSrc": ""
                },
                columns: [
                    { data: "id" },
                    { data: "fullName" },
                    { data: "email" },
                    {
                        data: "timestamp",
                        "render": function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    { data: "nickName" },
                    { data: "phoneNumber" },
                    { data: "school" },
                    { data: "major" },
                    { data: "GPA" },
                    { data: "purpose" },
                    { data: "meet" },
                    { data: "position" },
                    { data: "time" },
                    { data: "infoJob" },
                    { data: "acquaintanceName" },
                    { data: "relationship" },
                    { data: "referralName" },
                ]

            }
        )
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ minWidth: 700, paddingLeft: 40, marginRight: 40 }}>
                <table className="display" id="big-table" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th id="big-col">Fullname</th>
                            <th id="big-col">Email</th>
                            <th id="big-col">Timestamp</th>
                            <th id="big-col">Nickname</th>
                            <th id="big-col">PhoneNumber</th>
                            <th id="big-col">School</th>
                            <th id="big-col">Major</th>
                            <th id="big-col">GPA</th>
                            <th id="big-col">Purpose</th>
                            <th id="big-col">ContactPerson</th>
                            <th id="big-col">Position</th>
                            <th id="big-col">TimeSchedule</th>
                            <th id="big-col">JobInfo</th>
                            <th id="big-col">Acquaintance</th>
                            <th id="big-col">Relationship</th>
                            <th id="big-col">ReferralName</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

}
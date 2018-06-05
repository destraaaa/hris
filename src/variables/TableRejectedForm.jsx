import React, { Component } from 'react';
// import { fonts } from 'pdfmake/build/pdfmake';
const $ = require('jquery');
$.DataTable = require('datatables.net');
require('jszip');
require('datatables.net');
require('datatables.net-buttons');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.colVis.js');

export default class Table extends Component {
    componentDidMount() {
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                dom: '<"buttons" B>lTfgitp',
                buttons: [
                    {
                        extend: 'colvis',
                        text: 'Show',
                        className: 'RcsvButton',
                        columns: ':gt(0)'
                    },
                    { extend: 'excel', className: 'RcsvButton', text: 'excel<i class="fa fa-file-excel-o"></i>' },
                    { extend: 'csv', className: 'RcsvButton' },
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

    render() {
        return (
            <div style={{ minWidth: 700, paddingLeft: 50, marginRight: 40 }}>
                <table className="display" id="big-table" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th className="big-col">Fullname</th>
                            <th className="big-col">Email</th>
                            <th className="big-col">Timestamp</th>
                            <th className="big-col">Nickname</th>
                            <th className="big-col">PhoneNumber</th>
                            <th className="big-col">School</th>
                            <th className="big-col">Major</th>
                            <th className="big-col">GPA</th>
                            <th className="big-col">Purpose</th>
                            <th className="big-col">ContactPerson</th>
                            <th className="big-col">Position</th>
                            <th className="big-col">TimeSchedule</th>
                            <th className="big-col">JobInfo</th>
                            <th className="big-col">Acquaintance</th>
                            <th className="big-col">Relationship</th>
                            <th className="big-col">ReferralName</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
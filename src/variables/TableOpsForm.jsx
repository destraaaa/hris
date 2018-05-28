import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const $ = require('jquery');
// const dt = require( 'datatables.net-fixedcolumns');
var dataRow = {
    progress: null,
    id: null,
    updatedDate : null,
    pic : "",
}

export default class Table extends Component {
    data(check) {
        $.fn.DataTable.ext.pager.numbers_length = 6;
        this.$el = $(this.el)
        var table = this.$el.DataTable(
            {
                destroy: check,
                // fixedColumns: {
                //     leftColumns: 4
                // },
                columnDefs: [
                    {
                        'targets': 4,
                        'data': 'statProgress',
                        'render': function (data, type, row, meta) {
                            return '<select name= "progress" id="opsTableProgressBtn">' +
                                '<option style = "color:#8e8e8e" selected disabled>' + row.statProgress + '</option>' +
                                '<option value=3>APPROVED</option>' +
                                '<option value=2>REJECT</option>' +
                                '</select>';

                        }
                    }
                ],
                'rowCallback': function (row, data, index) {
                    $('#opsTableProgressBtn', row).click(function () {
                        dataRow.progress = parseInt(($('select', row).val()),0);
                    });
                },
                createdRow(row, data, dataIndex) {
                    if (data.statProgress === "REJECT") {
                        $(row).addClass('REJECTcolor');
                    }
                    else if (data.statProgress === "APPROVED") {
                        $(row).addClass('APPROVEDcolor');
                    }
                    else $(row).addClass('');
                },
                dom: '<"buttons" B>lTfgitp',
                buttons: [
                    {
                        extend: 'colvis',
                        text: 'Show',
                        className: 'RcsvButton',
                        columns: ':gt(0)'
                    },
                    {
                        extend: 'excel', className: 'RcsvButton', text: 'excel<i class="fa fa-file-excel-o"></i>',
                        exportOptions: {
                            format: {
                                body: function (data, row, col, node) {
                                    if (col === 4) {
                                        return table
                                            .cell({ row: row, column: col })
                                            .nodes()
                                            .to$()
                                            .find(':selected')
                                            .text()
                                    } else {
                                        return data;
                                    }
                                }
                            }
                        }
                    },
                    { extend: 'csv', className: 'RcsvButton' },
                ],
                scrollX: true,
                scrollCollapse: true,
                scrollY: 400,
                autoWidth: true,
                "ajax": {
                    "url": "http://0.0.0.0:8080/opsform/view",
                    "dataSrc": ""
                },
                deferRender: true,
                "language": {
                    "zeroRecords": "No Data found",
                    "emptyTable": "there is no record",
                    "processing": "Processing...",
                },
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
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
                    { data: "statProgress", targets: 4 },
                    {
                        data: "updatedDate",
                        "render": function (data) {
                            if (data === "0001-01-01T00:00:00Z") {
                                return ""
                            }
                            else {
                                var date = new Date(data);
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" + month + "/" + date.getFullYear();
                            }
                        }
                    },
                    { data: "nickName" },
                    { data: "phoneNumber" },
                    { data: "school" },
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
        this.$el.on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).toggleClass('selected');
                let pos = table.row(this).index();
                let row = table.row(pos).data();
                let time = new Date()
                dataRow.id = row.id;
                dataRow.updatedDate = time;
                dataRow.pic = parseInt(Cookies.get('__hrni'));
                var authOptions = {
                    method: 'POST',
                    url: 'http://0.0.0.0:8080/form/update',
                    data: JSON.stringify(dataRow),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    json: true
                };
                axios(authOptions)

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                dataRow.id = null
            }
        });
    }

    componentDidUpdate() {
        if (Cookies.get('__filt') === "Ops_Form_Response") {
            this.data(true)
            Cookies.remove('__filt')
        }
    }

    componentDidMount() {
        this.data(false)
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy(true)
    }

    render() {
        return (
            <div style={{ minWidth: 700, paddingLeft: 40, marginRight: 40 }}>
                <table className="display" id="big-table" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th id="id-col">Id</th>
                            <th id="big-col">Fullname</th>
                            <th id="big-col">Email</th>
                            <th id="big-col">Timestamp</th>
                            <th id="nonTableProgressBtn">Progress</th>
                            <th id="big-col">LastUpdated</th>
                            <th id="big-col">Nickname</th>
                            <th id="big-col">PhoneNumber</th>
                            <th id="big-col">School</th>
                            <th id="big-col">PurposeCandidate</th>
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
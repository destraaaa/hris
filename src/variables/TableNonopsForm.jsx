import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const $ = require('jquery');
require('datatables.net-fixedcolumns');
require('datatables.net-scroller');
$.DataTable = require('datatables.net');
const $el = $(this.el);


var dataRow = {
    progress: null,
    id: null
}

export default class Table extends Component {
    data(check) {
        $.fn.DataTable.ext.pager.numbers_length = 6;

        this.$el = $(this.el)
        var table = this.$el.DataTable(
            {
                dom: '<"buttons" B>lTfgitp',
                buttons: [
                    {
                        extend: 'colvis',
                        text: 'Show',
                        className: 'RcsvButton',
                        columns: ':gt(0)',
                        columns: ':gt(1)',
                    },
                    { extend: 'excel', className: 'RcsvButton' },
                    { extend: 'csv', className: 'RcsvButton' },
                    // 'selectNone'
                ],
                destroy: check,
                // pagingType: "input",
                scrollY: 400,
                scrollX: true,
                scrollCollapse: true,
                autoWidth: true,
                // fixedColumns: {
                //     leftColumns: 4
                // },
                // columnDefs: [
                //     {

                //         'targets': 0,
                //         'checkboxes': {
                //             'selectRow': true
                //         }
                //     }
                // ],
                'rowCallback': function (row, data, index) {
                    $('#nonTableProgressBtn', row).click(function () {
                        dataRow.progress = parseInt($('select', row).val());
                    });
                },
                columnDefs: [
                    {

                        'targets': 4,
                        'data': 'statProgress',
                        'render': function (data, type, row, meta) {
                            // return '<input type="checkbox" name="user_id[]" value="' + $('<div/>').text(row.statProgress).html() + '">';
                            return '<select id="nonTableProgressBtn">' +
                                '<option value="' + row.statProgress + '" selected disabled>' + row.statProgress + '</option>' +
                                '<option value = 3 >APPROVED</option>' +
                                '<option value = 2 >REJECT</option>' +
                                '</select>';

                        }
                    }
                ],
                createdRow(row, data, dataIndex) {
                    if (data.statProgress == "REJECT") {
                        console.log(data)
                        $(row).addClass('REJECTcolor');
                    }
                    else if (data.statProgress == "APPROVED") {
                        $(row).addClass('APPROVEDcolor');
                    }
                    else if (data.statProgress == "ON PROGRESS") {
                        $(row).addClass('PROGRESScolor');
                    }
                    else $(row).addClass('');
                },
                select: {
                    'style': 'multi'
                },
                "ajax": {
                    "url": "http://0.0.0.0:8080/nonopsform/view",
                    "dataSrc": ""
                },
                deferRender: true,
                scroller: {
                    displayBuffer: 10
                },
                scroller: false,
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
                    { data: "statProgress" },
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
                    { data: "referralName" }
                ]
            }

        )

        this.$el.on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).toggleClass('selected');
                let pos = table.row(this).index();
                let row = table.row(pos).data();
                console.log(dataRow);
                dataRow.id = row.id

                var authOptions = {
                    method: 'POST',
                    url: 'http://0.0.0.0:8080/opsform/update',
                    data: JSON.stringify(dataRow),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    json: true
                };
                axios(authOptions)
                    .then(function (response) {
                        console.log(response.data);
                        console.log(response.status);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let pos = table.row(this).index();
                let row = table.row(pos).data();
                console.log(dataRow);
                dataRow.id = row.id
            }
        });

    }

    componentDidUpdate() {
        if (Cookies.get('__filt') === "NonOps_Form_Response") {
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
                            <th id="progressTable">Progress</th>
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
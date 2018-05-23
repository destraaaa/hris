import React, { Component } from 'react';
import Cookies from 'js-cookie';


const $ = require('jquery');
require('datatables.net-fixedcolumns');
require('datatables.net-scroller');
$.DataTable = require('datatables.net');
const $el = $(this.el);

export default class Table extends Component {
    data(check) {
        $.fn.DataTable.ext.pager.numbers_length = 6;

        this.$el = $(this.el)
        this.$el.DataTable(
            {
                dom: '<"buttons" B>lTfgitp',
                buttons: [{ extend: 'excel', className: 'csvButton' },
                { extend: 'csv', className: 'csvButton' }],
                destroy: check,
                // pagingType: "input",
                scrollY: 400,
                scrollX: true,
                scrollCollapse: true,
                autoWidth: true,
                // fixedColumns: {
                //     leftColumns: 4
                // },
                columnDefs: [
                    {

                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
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
                    else  $(row).addClass('');
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
            $(this).toggleClass('selected');
        });

        // $('#button').click(function () {
        //     alert(this.$el.rows('.selected').data().length + ' row(s) selected');
        // });
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
                            <th id="big-col">Progress</th>
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
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';
const $ = require('jquery');
// require('datatables.net-scroller');

var dataRow = {
    progress: null,
    id: null,
    updatedDate: null,
    pic: "",
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
                        columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                    },
                    {
                        extend: 'excel',
                        className: 'RcsvButton',
                        text: 'excel<i class="fa fa-file-excel-o"></i>',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                        }
                    },
                    {
                         extend: 'csv', 
                         className: 'RcsvButton',
                         exportOptions: {
                            columns: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                        }
                    },
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
                'rowCallback': function (row, data, index) {
                    $('#nonTableProgressBtn', row).click(function () {
                        dataRow.progress = parseInt(($('select', row).val()), 10);
                    });
                },
                columnDefs: [
                    {

                        'targets': 4,
                        'data': 'statProgress',
                        'render': function (data, type, row, meta) {
                            return '<select id="nonTableProgressBtn">' +
                                '<option value="' + row.statProgress + '" selected disabled>' + row.statProgress + '</option>' +
                                '<option value = 3 >APPROVED</option>' +
                                '<option value = 2 >REJECT</option>' +
                                '</select>';
                        }
                    },
                    {
                        'targets': 5,
                        visible: false
                    }
                ],
                createdRow(row, data, dataIndex) {
                    if (data.statProgress === "REJECT") {
                        $(row).addClass('REJECTcolor');
                    }
                    else if (data.statProgress === "APPROVED") {
                        $(row).addClass('APPROVEDcolor');
                    }
                    else if (data.statProgress === "ON PROGRESS") {
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
                // scroller: {
                //     displayBuffer: 10
                // },
                // scroller: false,
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
                    { data: "statProgress" },
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
                let time = new Date()
                dataRow.id = row.id;
                dataRow.updatedDate = time;
                dataRow.pic = parseInt((Cookies.get('__hrni')), 10);
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
                    .then(function (response) {
                        toast.success("Ops Form name " + row.fullName + " has been changed", {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            className: "notif",
                        });

                        table.ajax.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                dataRow.id = null
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
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <table className="display" id="big-table" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th id="id-col">Id</th>
                            <th id="big-col">Fullname</th>
                            <th id="email-col">Email</th>
                            <th id="big-col">Timestamp</th>
                            <th id="progressTable">Progress</th>
                            <th id="progressTable">Progress</th>  
                            <th id="big-col">LastUpdated</th>
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
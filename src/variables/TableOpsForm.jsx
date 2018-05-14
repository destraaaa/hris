import React, { Component } from 'react';
import Cookies from 'js-cookie';
const $ = require('jquery')
$.DataTable = require('datatables.net')
const $el = $(this.el)

export default class Table extends Component {
    data(check) {
        $.fn.DataTable.ext.pager.numbers_length = 6;
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                destroy: check,
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
                    { data: "nickName" },
                    { data: "phoneNumber" },
                    { data: "email" },
                    { data: "statProgress" },
                    { data: "school" },
                    { data: "purpose" },
                    { data: "meet" },
                    { data: "position" },
                    { data: "time" },
                    { data: "infoJob" },
                    { data: "acquaintanceName" },
                    { data: "relationship" },
                    { data: "referralName" },
                    {
                        data: "timestamp",
                        "render": function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                        }
                    }

                ]

            }
        )
        this.$el.on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });

        $('#button').click(function () {
            alert(this.$el.rows('.selected').data().length + ' row(s) selected');
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
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Nickname</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                            <th>Progress</th>
                            <th>School</th>
                            <th>PurposeCandidate</th>
                            <th>ContactPerson</th>
                            <th>Position</th>
                            <th>TimeSchedule</th>
                            <th>JobInfo</th>
                            <th>Acquaintance</th>
                            <th>Relationship</th>
                            <th>ReferralName</th>
                            <th>Timestamp</th>

                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

}
import React, { Component } from 'react';
const $ = require('jquery')
$.DataTable = require('datatables.net')

export default class Table extends Component {
    componentDidMount() {
        console.log(this.el)
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                "ajax": {
                    "url": "http://0.0.0.0:8080/rejected/view",
                    "dataSrc": ""
                },
                columns: [
                    { data: "id" },
                    { data: "fullName" },
                    { data: "nickName" },
                    { data: "phoneNumber" },
                    { data: "email" },
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
                    {
                        data: "timestamp",
                        "render": function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return   date.getDate()+ "/"  +(month.length > 1 ? month : "0" + month)+ "/" + date.getFullYear();
                        }
                    }
                ]

            }
        )
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ minWidth: 720, paddingLeft: 40, marginRight: 40, overflowX: "auto" }}>
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Nickname</th>
                            <th>PhoneNumber</th>
                            <th>Email</th>
                            <th>School</th>
                            <th>Major</th>
                            <th>GPA</th>
                            <th>Purpose</th>
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
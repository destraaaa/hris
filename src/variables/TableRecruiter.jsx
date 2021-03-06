import React, { Component } from 'react';
import moment from 'moment';
import './timeFormat.js';
const $ = require('jquery')
export var rowData = {
    email: "",
    name: ""
}

export default class Table extends Component {
    componentDidMount() {
        this.$el = $(this.el)
        var table = this.$el.DataTable(
            {
                scrollX: true,
                searching: false,
                paging: false,
                "ajax": {
                    "url": "http://0.0.0.0:8080/authLogin/user",
                    "dataSrc": ""
                },
                columns: [
                    { data: "id" },
                    { data: "name" },
                    { data: "email" },
                    { data: "pic" },
                    {
                        data: "timestamps",
                        "render": function (data) {
                            return moment(data).format('DD MMMM YYYY')
                        }
                    }
                ]

            }
        )
        this.$el.on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).toggleClass('selected');
                rowData.email = ""
                rowData.name = ""
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let pos = table.row(this).index();
                let row = table.row(pos).data();
                rowData.email = row.email
                rowData.name = row.name
            }
        });
    }
    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ paddingLeft: 40, marginRight: 40 }}>
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Pic</th>
                            <th>Join Time</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
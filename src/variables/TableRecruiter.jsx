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
                    "url": "http://0.0.0.0:8080/authLogin/user",
                    "dataSrc": ""
                },
                // data: this.props.data,
                columns: [
                    { data: "id" },
                    { data: "name" },
                    { data: "email" },
                    { data: "timestamps" }
                ]

            }
        )
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ width: 1010, paddingLeft: 50, overflowX:"auto" }}>
                <table className="display" width="100%" ref={el => this.el = el}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Join Time</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

}
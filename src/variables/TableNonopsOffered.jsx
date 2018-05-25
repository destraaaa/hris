import React, { Component } from 'react';
const $ = require('jquery')
$.DataTable = require('datatables.net')

export default class Table extends Component {
    componentDidMount() {
        console.log(this.el)
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                // data: this.props.data,
                // columns: [
                //     { title: "Name" },
                //     { title: "Position" },
                //     { title: "Office" },
                //     { title: "Extn." },
                //     { title: "Start date" },
                //     { title: "Salary" },
                //     { title: "Start date" },
                //     { title: "Salary" }


                // ]
            }
        )
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ width: 1000, paddingLeft: 50 }}>
                <table className="display" width="100%" ref={el => this.el = el}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Office</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>lalalaalal</td>
                        <td>lalalaalal</td>
                        <td>lalalaalal</td>
                        <td>lalalaalal</td>
                    </tr>
                </tbody>
                </table>
            </div>
        )
    }

}
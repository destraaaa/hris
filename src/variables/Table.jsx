import React, { Component } from 'react';
const $ = require('jquery')
$.DataTable = require('datatables.net')

export default class Table extends Component {
    componentDidMount() {
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                data: this.props.data,
                columns: [
                    { title: "Name" },
                    { title: "Position" },
                    { title: "Office" },
                    { title: "Extn." },
                    { title: "Start date" },
                    { title: "Salary" }
                ]
            }
        )
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{paddingLeft:15}}>
                <table className="display" width="100%" ref={el => this.el = el}></table>
            </div>
        )
    }

}
import React, { Component } from 'react';
const $ = require('jquery')

export default class Table extends Component {
    componentDidMount() {
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                //data belum ada
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
                </table>
            </div>
        )
    }

}
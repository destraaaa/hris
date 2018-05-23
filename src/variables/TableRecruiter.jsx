import React, { Component } from 'react';
const $ = require('jquery')
$.DataTable = require('datatables.net')
export var rowData = {
    email :"",
    name : ""
}

export default class Table extends Component {

    
    componentDidMount() {
        console.log(this.el)
        this.$el = $(this.el)
        var table = this.$el.DataTable(
            {
                scrollX:true,
                searching:false,
                paging:false,
                "ajax": {
                    "url": "http://0.0.0.0:8080/authLogin/user",
                    "dataSrc": ""
                },
                // data: this.props.data,
                columns: [
                    { data: "id" },
                    { data: "name" },
                    { data: "email" },
                    {data: "pic"},
                    {
                        data: "timestamps",
                        "render": function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                        }
                    }
                ]

            }
        )
        this.$el.on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
            $(this).toggleClass('selected');
            let pos = table.row(this).index();
            let row =table.row(pos).data();
            // console.log(row);
            rowData.email = row.email
            rowData.name = row.name
            }
            else{
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let pos = table.row(this).index();
                let row =table.row(pos).data();
                // console.log(row);
                rowData.email = row.email
                rowData.name = row.name
            }
        } );
    }

    // componentWillUnmount() {
    //     this.Sel.DataTable.destroy(true)
    // }
    render() {
        return (
            <div style={{ paddingLeft: 40, marginRight: 40}}>
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
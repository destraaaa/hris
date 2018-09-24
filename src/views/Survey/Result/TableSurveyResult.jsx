import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class Table extends Component {
    constructor() {
        super();
        this.state = {
            table: [],
            tableData: [],
            isEmpty: false
        }
    }

    showSurvey() {
        $(".main-card").removeClass("hidden");
    }

    data(check) {
        $.fn.DataTable.ext.pager.numbers_length = 6;
        $.fn.dataTable.ext.errMode = 'none';
        this.$el = $(this.el)
        const self = this;
        const { id } = this.props.match.params

        axios.get(`http://0.0.0.0:8080/survey/result/view/${id}`).then(res => {
            let tempTable = [];
            let tempTableData = [];
            let tempResult = [];
            let tempObj
            console.log(res)
            if ($.isEmptyObject(res.data)) {
                this.setState({
                    isEmpty: true
                })
            }
            else {
                res.data.questions.forEach(element => {
                    tempObj = {
                        data: element
                    }
                    tempTableData.push(element)
                    tempTable.push(tempObj)
                });
                self.setState({
                    table: tempTable,
                    result: tempResult,
                    tableData: tempTableData
                })
                this.$el.DataTable(
                    {
                        destroy: check,
                        dom: '<"buttons" B>lTfgitp',
                        buttons: [
                            {
                                extend: 'colvis',
                                text: 'Show',
                                className: 'RcsvButton',
                            },
                            {
                                extend: 'excel',
                                className: 'RcsvButton',
                                text: 'excel<i class="fa fa-file-excel-o"></i>',
                                exportOptions: {
                                }
                            },
                            {
                                extend: 'csv',
                                className: 'RcsvButton',
                                exportOptions: {
                                }
                            },
                        ],
                        scrollX: true,
                        scrollCollapse: true,
                        scrollY: 400,
                        autoWidth: true,
                        deferRender: true,
                        language: {
                            zeroRecords: "No Data found",
                            emptyTable: "there is no record",
                            processing: "Processing..."
                        },
                        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                        order: [[0, "desc"]],
                        ajax: {
                            url: `http://0.0.0.0:8080/survey/result/view/${id}`,
                            dataSrc: "answers"
                        },
                        columns: this.state.table
                    })
            }

            $('#table').on('error.dt', function (e, settings, techNote, message) {
                console.log('An error has been reported by DataTables: ', message);
            });
        });
    }

    componentDidMount() {
        $(".main-card").addClass("hidden");
        this.data(false)
    }

    componentWillUnmount() {
        if (!this.state.isEmpty) {
            this.$el.DataTable().destroy(true)
        }
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.isEmpty?<p style={{ textAlign: "center" }}>there is no data yet</p>:""
                    }
                </div>
                <table className="display" id="big-table" width="100%" ref={el => this.el = el} >
                    <thead>
                        <tr>
                            {
                                this.state.tableData.map((el, index) => <th className="big-col" key={index}>{el}</th>)
                            }
                        </tr>
                    </thead>
                </table>
                <Link to="/Survey"><button className="btn survey-back" onClick={this.showSurvey}>Back</button></Link>
            </div>
        )
    }
}
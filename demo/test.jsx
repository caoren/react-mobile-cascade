import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cascade from '../src/index.jsx';

class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [
                {
                    name : '浙江省',
                    value : '1',
                    childs : [
                        {
                            name : '杭州',
                            value : '1-1',
                            childs : [
                                {
                                    name : '上城区',
                                    value : '1-1-1'
                                },
                                {
                                    name : '下城区',
                                    value : '1-1-2'
                                },
                                {
                                    name : '西湖区',
                                    value : '1-1-3'
                                }
                            ]
                        },
                        {
                            name : '温州',
                            value : '1-2',
                            childs : [
                                {
                                    name : '1区',
                                    value : '1-2-1'
                                },
                                {
                                    name : '2区',
                                    value : '1-2-2'
                                },
                                {
                                    name : '3区',
                                    value : '1-2-3'
                                }
                            ]
                        }
                    ]
                },
                {
                    name : '江西省',
                    value : '1',
                    childs : [
                        {
                            name : '南昌',
                            value : '1-1',
                            childs : [
                                {
                                    name : '红谷滩区',
                                    value : '1-1-1'
                                },
                                {
                                    name : '青山湖区',
                                    value : '1-1-2'
                                },
                                {
                                    name : '西湖区',
                                    value : '1-1-3'
                                }
                            ]
                        },
                        {
                            name : '上饶',
                            value : '1-2',
                            childs : [
                                {
                                    name : '新洲区',
                                    value : '1-2-1'
                                },
                                {
                                    name : '德兴',
                                    value : '1-2-2'
                                },
                                {
                                    name : '鄱阳',
                                    value : '1-2-3'
                                }
                            ]
                        },
                        {
                            name : '鹰潭',
                            value : '2-2'
                        }
                    ]
                }
            ],
            text : ''
        }
        this.change = this.change.bind(this);
        this.show = this.show.bind(this);
    }
    show(){
        this.refs.cascade.show();
    }
    change(arr){
        let result = arr.map(function(item){return item.name}).join('');
        this.setState({
            text : result
        });
    }
    render(){
        let {list,text} = this.state;
        return(
            <div>
                <div className="c-item" onClick={this.show}>open</div>
                <div>{text}</div>
                <Cascade ref="cascade" scrollTextKey="name" scrollChildKey="childs" column={3} data={list} immediateDone={true} onDone={this.change} />
            </div>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('J_wrap')
);
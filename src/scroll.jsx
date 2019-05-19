import React, {Component} from 'react';
import PropTypes from 'prop-types';
import iScroll from 'iscroll/build/iscroll-lite';
import ReactIScroll from 'react-iscroll';
import SelectItem from './item';
//extend
function extend(target){
    if(typeof target !== 'object'){
        throw new TypeError('Cannot convert undefined or null to object');
    }
    const len = arguments.length;
    for (let index = 1; index < len; index++) {
        const source = arguments[index];
        if(source != null){
            for(let key in source){
                if(Object.prototype.hasOwnProperty.call(source,key)){
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}
const ITEMHEIGHT = 34;
const HALFITEMHEIGHT = Math.round(ITEMHEIGHT/2);
class SelectScroll extends React.Component{
    constructor(props){
        super(props);
        this.scrollEnd = this.scrollEnd.bind(this);
        this.isFirst = true;
    }
    scrollEnd(iScrollInstance){
        const { onSelected, index } = this.props;
        const y = iScrollInstance.y;
        const spare = y % ITEMHEIGHT;
        let scrollY = y;
        if(spare != 0){
            scrollY = Math.abs(spare) > HALFITEMHEIGHT ? (y - spare - ITEMHEIGHT) : (y - spare);
            iScrollInstance.scrollTo(0, scrollY, 100);
        }
        const cur = Math.abs(Math.round(scrollY/ITEMHEIGHT));
        onSelected && onSelected(cur,index);
    }
    componentDidUpdate(){
        const { selectedIndex } = this.props;
        const startY = -(selectedIndex) * ITEMHEIGHT;
        this.refs.iscroll.withIScroll(true, (iScroll) => {
            if (iScroll && startY !== 0) {
                iScroll.scrollTo(0, startY);
            }
        });
    }
    render(){
        const {
            data,
            index,
            options,
            selectedIndex,
            textKey
        } = this.props;
        const coptions = extend({}, options);
        if (this.isFirst) {
            coptions.startY = -(selectedIndex) * ITEMHEIGHT;
            delete this.isFirst;
        }
        return (
            <ReactIScroll ref="iscroll" className="c-cascade-wrap" iScroll={iScroll} options={coptions} onScrollEnd={this.scrollEnd}>
                <SelectItem data={data} textKey={textKey} index={index} />
                <div className="c-cascade-shade"></div>
                <div className="c-cascade-indicator"></div>
            </ReactIScroll>
        )
    }
}
SelectScroll.propTypes = {
    data : PropTypes.array,
    onSelected : PropTypes.func,
    index : PropTypes.number,
    selectedIndex : PropTypes.number,
    options : PropTypes.object,
    textKey : PropTypes.string
}
export default SelectScroll
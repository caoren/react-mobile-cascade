import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import SelectScroll from './scroll';
//polyfill
if(typeof Array.prototype.findIndex === 'undefined'){
    Object.defineProperty(Array.prototype,'findIndex',{
        value : function(callback){
            if(this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if(typeof callback !== 'function') {
                throw new TypeError('callback must be a function');
            }
            const list = this;
            const len = list.length;
            const thisArg = arguments[1];
            for(let i = 0; i < len; i++){
                if(callback.call(thisArg,list[i],i,list)){
                    return i;
                }
            }
            return -1;
        },
        enumerable : false,
        configurable : false,
        writable : false
    });
}
const IscrollOption = {
    startX : 0,
    startY : 0,
    disablePointer : true,
    disableTouch : false,
    disableMouse : true
}
const EMPTY = ['', '', ''];
function analysisData(obj){
    const {
        data,
        column,
        scrollCheckedKey,
        scrollChildKey
    } = obj;
    return (indexs) => { // 根据选中的位置输出对应的子级数据
        let list = data;
        const arr = [];
        const selectArr = [];
        let i = 0;
        while(i < column){
            let sel;
            if(typeof indexs === 'undefined'){
                sel = list.findIndex((item) => item[scrollCheckedKey]);
                sel = sel > -1 ? sel : 0;
                selectArr.push(sel);
            }
            else{
                sel = indexs[i];
            }
            arr.push(EMPTY.concat(list,EMPTY));
            list = list[sel] ? list[sel][scrollChildKey] : [];
            list = list || [];
            i++;
        }
        return {
            items : arr,
            sels : selectArr
        };
    }
}
class Cascade extends Component{
    constructor(props) {
        super(props);
        this.transformData = analysisData(props);
        const initData = this.transformData();
        this.state = {
            show : false,
            selecteIndexs : initData.sels,
            selecteItems : initData.items
        }
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);
    }
    //注:改变的位置，该位置后的选中都重置
    change(cur, index) {
        const { selecteIndexs } = this.state;
        const { column } = this.props;
        if (cur == selecteIndexs[index]) {
            return;
        }
        selecteIndexs[index] = cur;
        let i = index;
        while(i < column - 1){
            i++;
            selecteIndexs[i] = 0;
        }
        //console.log(cur,index,selecteIndexs);
        const sData = this.transformData(selecteIndexs);
        this.setState({
            selecteIndexs : selecteIndexs,
            selecteItems : sData.items
        });
    }
    show() {
        this.setState({
            show : true
        });
    }
    //是否触发onCancel
    cancel(fire = true) {
        if(fire){
            const { onCancel } = this.props;
            onCancel && onCancel();
        }
        this.setState({
            show : false
        });
    }
    fetchValue() {
        const { column } = this.props;
        const { selecteIndexs, selecteItems } = this.state;
        const result = [];
        for(let i = 0; i < column; i++){
            result.push(selecteItems[i][selecteIndexs[i] + 3]);
        }
        return result;
    }
    componentDidMount() {
        const { onDone, immediateDone } = this.props;
        immediateDone && onDone && onDone(this.fetchValue());
    }
    save() {
        const {onDone} = this.props;
        onDone && onDone(this.fetchValue());
        this.cancel(false);
    }
    render() {
        const { show } = this.state;
        const { title, data, scrollTextKey } = this.props;
        const { selecteItems, selecteIndexs } = this.state;
        const columnNode = selecteItems.map((item, n) => (
            <SelectScroll
                selectedIndex={selecteIndexs[n]}
                data={item}
                onSelected={this.change}
                textKey={scrollTextKey}
                key={`casd_${n}`}
                index={n}
                options={IscrollOption} />
        ));
        const SelectNode = (
            <div className="c-cascade-select">
                <div className="c-cascade-opa">
                    <div className="c-cascade-bton" onClick={this.cancel}>取消</div>
                    <div className="c-cascade-title">{title}</div>
                    <div className="c-cascade-bton" onClick={this.save}>确定</div>
                </div>
                <div className="c-cascade-cont">
                    {columnNode}
                </div>
            </div>
        );
        return (
            <div>
                <CSSTransition in={show} classNames="cascademask" timeout={300} mountOnEnter={true} unmountOnExit={true}>
                    <div className="c-cascade-mask" onClick={this.cancel}></div>
                </CSSTransition>
                <CSSTransition in={show} classNames="cascadecont" timeout={300} mountOnEnter={true} unmountOnExit={true}>
                    {SelectNode}
                </CSSTransition>
            </div>
        )
    }
}
Cascade.propTypes = {
    title : PropTypes.string,
    data : PropTypes.array.isRequired,
    column : PropTypes.number.isRequired,
    onDone : PropTypes.func,
    onCancel : PropTypes.func,
    scrollTextKey : PropTypes.string,
    scrollCheckedKey : PropTypes.string,
    scrollChildKey : PropTypes.string,
    immediateDone : PropTypes.bool
}
Cascade.defaultProps = {
    scrollTextKey : 'text',
    scrollCheckedKey : 'checked',
    scrollChildKey : 'children',
    immediateDone : false
}
export default Cascade;

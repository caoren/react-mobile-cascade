import "../assets/cascade.css";
import React,{PropTypes,Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
            let list = this;
            let len = list.length;
            let thisArg = arguments[1];
            for(let i = 0;i < len;i++){
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
    startY : 0
}
const EMPTY = ['','',''];
function analysisData(obj){
    let {data,column,scrollCheckedKey,scrollChildKey} = obj;
    return function(indexs){//根据选中的位置输出对应的子级数据
        let list = data;
        let arr = [];
        let selectArr = [];
        let i = 0;
        while(i < column){
            let sel;
            if(typeof indexs === 'undefined'){
                sel = list.findIndex(function(item){return item[scrollCheckedKey]});
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
    constructor(props){
        super(props);
        this.transformData = analysisData(props);
        let initData = this.transformData();
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
    change(cur,index){
        let {selecteIndexs} = this.state;
        let {column} = this.props;
        if(cur == selecteIndexs[index]){
            return;
        }
        selecteIndexs[index] = cur;
        let i = index;
        while(i < column - 1){
            i++;
            selecteIndexs[i] = 0;
        }
        //console.log(cur,index,selecteIndexs);
        let sData = this.transformData(selecteIndexs);
        this.setState({
            selecteIndexs : selecteIndexs,
            selecteItems : sData.items
        });
    }
    show(){
        this.setState({
            show : true
        });
    }
    //是否触发onCancel
    cancel(fire = true){
        if(fire){
            let {onCancel} = this.props;
            onCancel && onCancel();
        }
        this.setState({
            show : false
        });
    }
    fetchValue(){
        let {column} = this.props;
        let {selecteIndexs,selecteItems} = this.state;
        let result = [];
        for(let i=0;i<column;i++){
            result.push(selecteItems[i][selecteIndexs[i] + 3]);
        }
        return result;
    }
    componentDidMount(){
        let {onDone,immediateDone} = this.props;
        immediateDone && onDone && onDone(this.fetchValue());
    }
    save(){
        let {onDone} = this.props;
        onDone && onDone(this.fetchValue());
        this.cancel(false);
    }
    render(){
        let self = this;
        let {show} = self.state;
        let {title,data,scrollTextKey} = self.props;
        let SelectNode;
        let MaskNode;
        if(show){
            MaskNode = (
                <div className="c-cascade-mask" onClick={self.cancel}></div>
            );
            let {selecteItems,selecteIndexs} = self.state;
            let columnNode = selecteItems.map(function(item,n){
                return (<SelectScroll selectedIndex={selecteIndexs[n]} data={item} onSelected={self.change} textKey={scrollTextKey} key={n} index={n} options={IscrollOption} />)
            });
            SelectNode = (
                <div className="c-cascade-select">
                    <div className="c-cascade-opa">
                        <div className="c-cascade-bton" onClick={self.cancel}>取消</div>
                        <div className="c-cascade-title">{title}</div>
                        <div className="c-cascade-bton" onClick={self.save}>确定</div>
                    </div>
                    <div className="c-cascade-cont">
                        {columnNode}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="cascademask" transitionEnterTimeout={300}  transitionLeaveTimeout={300}>
                    {MaskNode}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup component="div" transitionName="cascadecont" transitionEnterTimeout={300}  transitionLeaveTimeout={300}>
                    {SelectNode}
                </ReactCSSTransitionGroup>
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

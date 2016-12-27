import React,{PropTypes,Component} from 'react';
class SelectItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {data,textKey} = this.props;
        return (
            <ul className="c-cascade-ul">
                {
                    data.map(function(item,n){
                        return (<li key={n}>{item[textKey]}</li>);
                    })
                }
            </ul>
        );
    }
}
SelectItem.propTypes = {
    data : PropTypes.array,
    textKey : PropTypes.string
}
export default SelectItem
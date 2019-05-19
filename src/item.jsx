import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SelectItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { data, textKey } = this.props;
        return (
            <ul className="c-cascade-ul">
                {
                    data.map((item,n) => {
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectItem = function (_Component) {
    (0, _inherits3.default)(SelectItem, _Component);

    function SelectItem(props) {
        (0, _classCallCheck3.default)(this, SelectItem);
        return (0, _possibleConstructorReturn3.default)(this, (SelectItem.__proto__ || (0, _getPrototypeOf2.default)(SelectItem)).call(this, props));
    }

    (0, _createClass3.default)(SelectItem, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                data = _props.data,
                textKey = _props.textKey;

            return _react2.default.createElement(
                "ul",
                { className: "c-cascade-ul" },
                data.map(function (item, n) {
                    return _react2.default.createElement(
                        "li",
                        { key: n },
                        item[textKey]
                    );
                })
            );
        }
    }]);
    return SelectItem;
}(_react.Component);

SelectItem.propTypes = {
    data: _react.PropTypes.array,
    textKey: _react.PropTypes.string
};
exports.default = SelectItem;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _iscrollLite = require('iscroll/build/iscroll-lite');

var _iscrollLite2 = _interopRequireDefault(_iscrollLite);

var _reactIscroll = require('react-iscroll');

var _reactIscroll2 = _interopRequireDefault(_reactIscroll);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ITEMHEIGHT = 34;
var HALFITEMHEIGHT = Math.round(ITEMHEIGHT / 2);

var SelectScroll = function (_React$Component) {
    (0, _inherits3.default)(SelectScroll, _React$Component);

    function SelectScroll(props) {
        (0, _classCallCheck3.default)(this, SelectScroll);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SelectScroll.__proto__ || (0, _getPrototypeOf2.default)(SelectScroll)).call(this, props));

        _this.scrollEnd = _this.scrollEnd.bind(_this);
        _this.isFirst = true;
        return _this;
    }

    (0, _createClass3.default)(SelectScroll, [{
        key: 'scrollEnd',
        value: function scrollEnd(iScrollInstance) {
            var _props = this.props,
                onSelected = _props.onSelected,
                index = _props.index;

            var y = iScrollInstance.y;
            var spare = y % ITEMHEIGHT;
            var scrollY = y;
            if (spare != 0) {
                scrollY = Math.abs(spare) > HALFITEMHEIGHT ? y - spare - ITEMHEIGHT : y - spare;
                iScrollInstance.scrollTo(0, scrollY, 100);
            }
            var cur = Math.abs(Math.round(scrollY / ITEMHEIGHT));
            onSelected && onSelected(cur, index);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var selectedIndex = this.props.selectedIndex;

            var startY = -selectedIndex * ITEMHEIGHT;
            this.refs.iscroll.withIScroll(true, function (iScroll) {
                //console.log(iScroll,startY);
                iScroll.scrollTo(0, startY);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                data = _props2.data,
                index = _props2.index,
                options = _props2.options,
                selectedIndex = _props2.selectedIndex,
                textKey = _props2.textKey;

            var coptions = (0, _assign2.default)({}, options);
            if (this.isFirst) {
                coptions.startY = -selectedIndex * ITEMHEIGHT;
                delete this.isFirst;
            }
            return _react2.default.createElement(
                _reactIscroll2.default,
                { ref: 'iscroll', className: 'c-cascade-wrap', iScroll: _iscrollLite2.default, options: coptions, onScrollEnd: this.scrollEnd },
                _react2.default.createElement(_item2.default, { data: data, textKey: textKey, index: index }),
                _react2.default.createElement('div', { className: 'c-cascade-shade' }),
                _react2.default.createElement('div', { className: 'c-cascade-indicator' })
            );
        }
    }]);
    return SelectScroll;
}(_react2.default.Component);

SelectScroll.propTypes = {
    data: _react.PropTypes.array,
    onSelected: _react.PropTypes.func,
    index: _react.PropTypes.number,
    selectedIndex: _react.PropTypes.number,
    options: _react.PropTypes.object,
    textKey: _react.PropTypes.string
};
exports.default = SelectScroll;
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iscrollLite = require('iscroll/build/iscroll-lite');

var _iscrollLite2 = _interopRequireDefault(_iscrollLite);

var _reactIscroll = require('react-iscroll');

var _reactIscroll2 = _interopRequireDefault(_reactIscroll);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//extend
function extend(target) {
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var len = arguments.length;
    for (var index = 1; index < len; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}
var ITEMHEIGHT = 34;
var HALFITEMHEIGHT = Math.round(ITEMHEIGHT / 2);

var SelectScroll = function (_React$Component) {
    _inherits(SelectScroll, _React$Component);

    function SelectScroll(props) {
        _classCallCheck(this, SelectScroll);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.scrollEnd = _this.scrollEnd.bind(_this);
        _this.isFirst = true;
        return _this;
    }

    SelectScroll.prototype.scrollEnd = function scrollEnd(iScrollInstance) {
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
    };

    SelectScroll.prototype.componentDidUpdate = function componentDidUpdate() {
        var selectedIndex = this.props.selectedIndex;

        var startY = -selectedIndex * ITEMHEIGHT;
        this.refs.iscroll.withIScroll(true, function (iScroll) {
            if (iScroll && startY !== 0) {
                iScroll.scrollTo(0, startY);
            }
        });
    };

    SelectScroll.prototype.render = function render() {
        var _props2 = this.props,
            data = _props2.data,
            index = _props2.index,
            options = _props2.options,
            selectedIndex = _props2.selectedIndex,
            textKey = _props2.textKey;

        var coptions = extend({}, options);
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
    };

    return SelectScroll;
}(_react2.default.Component);

SelectScroll.propTypes = {
    data: _propTypes2.default.array,
    onSelected: _propTypes2.default.func,
    index: _propTypes2.default.number,
    selectedIndex: _propTypes2.default.number,
    options: _propTypes2.default.object,
    textKey: _propTypes2.default.string
};
exports.default = SelectScroll;
module.exports = exports['default'];
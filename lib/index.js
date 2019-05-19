'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//polyfill
if (typeof Array.prototype.findIndex === 'undefined') {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(callback) {
            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError('callback must be a function');
            }
            var list = this;
            var len = list.length;
            var thisArg = arguments[1];
            for (var i = 0; i < len; i++) {
                if (callback.call(thisArg, list[i], i, list)) {
                    return i;
                }
            }
            return -1;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });
}
var IscrollOption = {
    startX: 0,
    startY: 0,
    disablePointer: true,
    disableTouch: false,
    disableMouse: true
};
var EMPTY = ['', '', ''];
function analysisData(obj) {
    var data = obj.data,
        column = obj.column,
        scrollCheckedKey = obj.scrollCheckedKey,
        scrollChildKey = obj.scrollChildKey;

    return function (indexs) {
        // 根据选中的位置输出对应的子级数据
        var list = data;
        var arr = [];
        var selectArr = [];
        var i = 0;
        while (i < column) {
            var sel = void 0;
            if (typeof indexs === 'undefined') {
                sel = list.findIndex(function (item) {
                    return item[scrollCheckedKey];
                });
                sel = sel > -1 ? sel : 0;
                selectArr.push(sel);
            } else {
                sel = indexs[i];
            }
            arr.push(EMPTY.concat(list, EMPTY));
            list = list[sel] ? list[sel][scrollChildKey] : [];
            list = list || [];
            i++;
        }
        return {
            items: arr,
            sels: selectArr
        };
    };
}

var Cascade = function (_Component) {
    _inherits(Cascade, _Component);

    function Cascade(props) {
        _classCallCheck(this, Cascade);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.transformData = analysisData(props);
        var initData = _this.transformData();
        _this.state = {
            show: false,
            selecteIndexs: initData.sels,
            selecteItems: initData.items
        };
        _this.cancel = _this.cancel.bind(_this);
        _this.save = _this.save.bind(_this);
        _this.change = _this.change.bind(_this);
        return _this;
    }
    //注:改变的位置，该位置后的选中都重置


    Cascade.prototype.change = function change(cur, index) {
        var selecteIndexs = this.state.selecteIndexs;
        var column = this.props.column;

        if (cur == selecteIndexs[index]) {
            return;
        }
        selecteIndexs[index] = cur;
        var i = index;
        while (i < column - 1) {
            i++;
            selecteIndexs[i] = 0;
        }
        //console.log(cur,index,selecteIndexs);
        var sData = this.transformData(selecteIndexs);
        this.setState({
            selecteIndexs: selecteIndexs,
            selecteItems: sData.items
        });
    };

    Cascade.prototype.show = function show() {
        this.setState({
            show: true
        });
    };
    //是否触发onCancel


    Cascade.prototype.cancel = function cancel() {
        var fire = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (fire) {
            var onCancel = this.props.onCancel;

            onCancel && onCancel();
        }
        this.setState({
            show: false
        });
    };

    Cascade.prototype.fetchValue = function fetchValue() {
        var column = this.props.column;
        var _state = this.state,
            selecteIndexs = _state.selecteIndexs,
            selecteItems = _state.selecteItems;

        var result = [];
        for (var i = 0; i < column; i++) {
            result.push(selecteItems[i][selecteIndexs[i] + 3]);
        }
        return result;
    };

    Cascade.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props,
            onDone = _props.onDone,
            immediateDone = _props.immediateDone;

        immediateDone && onDone && onDone(this.fetchValue());
    };

    Cascade.prototype.save = function save() {
        var onDone = this.props.onDone;

        onDone && onDone(this.fetchValue());
        this.cancel(false);
    };

    Cascade.prototype.render = function render() {
        var _this2 = this;

        var show = this.state.show;
        var _props2 = this.props,
            title = _props2.title,
            data = _props2.data,
            scrollTextKey = _props2.scrollTextKey;
        var _state2 = this.state,
            selecteItems = _state2.selecteItems,
            selecteIndexs = _state2.selecteIndexs;

        var columnNode = selecteItems.map(function (item, n) {
            return _react2.default.createElement(_scroll2.default, {
                selectedIndex: selecteIndexs[n],
                data: item,
                onSelected: _this2.change,
                textKey: scrollTextKey,
                key: 'casd_' + n,
                index: n,
                options: IscrollOption });
        });
        var SelectNode = _react2.default.createElement(
            'div',
            { className: 'c-cascade-select' },
            _react2.default.createElement(
                'div',
                { className: 'c-cascade-opa' },
                _react2.default.createElement(
                    'div',
                    { className: 'c-cascade-bton', onClick: this.cancel },
                    '\u53D6\u6D88'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'c-cascade-title' },
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'c-cascade-bton', onClick: this.save },
                    '\u786E\u5B9A'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'c-cascade-cont' },
                columnNode
            )
        );
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _CSSTransition2.default,
                { 'in': show, classNames: 'cascademask', timeout: 300, mountOnEnter: true, unmountOnExit: true },
                _react2.default.createElement('div', { className: 'c-cascade-mask', onClick: this.cancel })
            ),
            _react2.default.createElement(
                _CSSTransition2.default,
                { 'in': show, classNames: 'cascadecont', timeout: 300, mountOnEnter: true, unmountOnExit: true },
                SelectNode
            )
        );
    };

    return Cascade;
}(_react.Component);

Cascade.propTypes = {
    title: _propTypes2.default.string,
    data: _propTypes2.default.array.isRequired,
    column: _propTypes2.default.number.isRequired,
    onDone: _propTypes2.default.func,
    onCancel: _propTypes2.default.func,
    scrollTextKey: _propTypes2.default.string,
    scrollCheckedKey: _propTypes2.default.string,
    scrollChildKey: _propTypes2.default.string,
    immediateDone: _propTypes2.default.bool
};
Cascade.defaultProps = {
    scrollTextKey: 'text',
    scrollCheckedKey: 'checked',
    scrollChildKey: 'children',
    immediateDone: false
};
exports.default = Cascade;
module.exports = exports['default'];
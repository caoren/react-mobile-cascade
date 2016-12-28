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

require("../assets/cascade.css");

require("core-js/fn/array/find-index.js");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require("react-addons-css-transition-group");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _scroll = require("./scroll");

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IscrollOption = {
    startX: 0,
    startY: 0
};
var EMPTY = ['', '', ''];
console.log(findIndex);
function analysisData(obj) {
    var data = obj.data,
        column = obj.column,
        scrollCheckedKey = obj.scrollCheckedKey,
        scrollChildKey = obj.scrollChildKey;

    return function (indexs) {
        //根据选中的位置输出对应的子级数据
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
    (0, _inherits3.default)(Cascade, _Component);

    function Cascade(props) {
        (0, _classCallCheck3.default)(this, Cascade);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Cascade.__proto__ || (0, _getPrototypeOf2.default)(Cascade)).call(this, props));

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


    (0, _createClass3.default)(Cascade, [{
        key: "change",
        value: function change(cur, index) {
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
        }
    }, {
        key: "show",
        value: function show() {
            this.setState({
                show: true
            });
        }
        //是否触发onCancel

    }, {
        key: "cancel",
        value: function cancel() {
            var fire = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (fire) {
                var onCancel = this.props.onCancel;

                onCancel && onCancel();
            }
            this.setState({
                show: false
            });
        }
    }, {
        key: "fetchValue",
        value: function fetchValue() {
            var column = this.props.column;
            var _state = this.state,
                selecteIndexs = _state.selecteIndexs,
                selecteItems = _state.selecteItems;

            var result = [];
            for (var i = 0; i < column; i++) {
                result.push(selecteItems[i][selecteIndexs[i] + 3]);
            }
            return result;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                onDone = _props.onDone,
                immediateDone = _props.immediateDone;

            immediateDone && onDone && onDone(this.fetchValue());
        }
    }, {
        key: "save",
        value: function save() {
            var onDone = this.props.onDone;

            onDone && onDone(this.fetchValue());
            this.cancel(false);
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;
            var show = self.state.show;
            var _self$props = self.props,
                title = _self$props.title,
                data = _self$props.data,
                scrollTextKey = _self$props.scrollTextKey;

            var SelectNode = void 0;
            var MaskNode = void 0;
            if (show) {
                (function () {
                    MaskNode = _react2.default.createElement("div", { className: "c-cascade-mask", onClick: self.cancel });
                    var _self$state = self.state,
                        selecteItems = _self$state.selecteItems,
                        selecteIndexs = _self$state.selecteIndexs;

                    var columnNode = selecteItems.map(function (item, n) {
                        return _react2.default.createElement(_scroll2.default, { selectedIndex: selecteIndexs[n], data: item, onSelected: self.change, textKey: scrollTextKey, key: n, index: n, options: IscrollOption });
                    });
                    SelectNode = _react2.default.createElement(
                        "div",
                        { className: "c-cascade-select" },
                        _react2.default.createElement(
                            "div",
                            { className: "c-cascade-opa" },
                            _react2.default.createElement(
                                "div",
                                { className: "c-cascade-bton", onClick: self.cancel },
                                "\u53D6\u6D88"
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "c-cascade-title" },
                                title
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "c-cascade-bton", onClick: self.save },
                                "\u786E\u5B9A"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "c-cascade-cont" },
                            columnNode
                        )
                    );
                })();
            }
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { component: "div", transitionName: "cascademask", transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                    MaskNode
                ),
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { component: "div", transitionName: "cascadecont", transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                    SelectNode
                )
            );
        }
    }]);
    return Cascade;
}(_react.Component);

Cascade.propTypes = {
    title: _react.PropTypes.string,
    data: _react.PropTypes.array.isRequired,
    column: _react.PropTypes.number.isRequired,
    onDone: _react.PropTypes.func,
    onCancel: _react.PropTypes.func,
    scrollTextKey: _react.PropTypes.string,
    scrollCheckedKey: _react.PropTypes.string,
    scrollChildKey: _react.PropTypes.string,
    immediateDone: _react.PropTypes.bool
};
Cascade.defaultProps = {
    scrollTextKey: 'text',
    scrollCheckedKey: 'checked',
    scrollChildKey: 'children',
    immediateDone: false
};
exports.default = Cascade;
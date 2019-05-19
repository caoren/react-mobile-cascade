'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectItem = function (_Component) {
    _inherits(SelectItem, _Component);

    function SelectItem(props) {
        _classCallCheck(this, SelectItem);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    SelectItem.prototype.render = function render() {
        var _props = this.props,
            data = _props.data,
            textKey = _props.textKey;

        return _react2.default.createElement(
            'ul',
            { className: 'c-cascade-ul' },
            data.map(function (item, n) {
                return _react2.default.createElement(
                    'li',
                    { key: n },
                    item[textKey]
                );
            })
        );
    };

    return SelectItem;
}(_react.Component);

SelectItem.propTypes = {
    data: _propTypes2.default.array,
    textKey: _propTypes2.default.string
};
exports.default = SelectItem;
module.exports = exports['default'];
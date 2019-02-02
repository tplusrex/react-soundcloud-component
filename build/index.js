'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundCloudEmbed = function (_Component) {
  _inherits(SoundCloudEmbed, _Component);

  function SoundCloudEmbed(props) {
    _classCallCheck(this, SoundCloudEmbed);

    var _this = _possibleConstructorReturn(this, (SoundCloudEmbed.__proto__ || Object.getPrototypeOf(SoundCloudEmbed)).call(this, props));

    _this.state = {
      __html: null
    };

    _this.fetchEmbed = _this.fetchEmbed.bind(_this);
    _this.getQueryParams = _this.getQueryParams.bind(_this);
    _this.handleFetchSuccess = _this.handleFetchSuccess.bind(_this);
    _this.handleFetchFailure = _this.handleFetchFailure.bind(_this);
    return _this;
  }

  _createClass(SoundCloudEmbed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var fetchParams = this.getQueryParams(this.props);
      this.fetchEmbed(fetchParams);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var url = this.props.url;
      var __html = this.state.__html;

      if (nextProps.url !== url || nextState.__html !== __html) {
        return true;
      }
      return false;
    }
  }, {
    key: 'fetchEmbed',
    value: function fetchEmbed(queryParams) {
      var payload = new Promise(function (resolve, reject) {
        (0, _jsonp2.default)('https://soundcloud.com/oembed?' + queryParams, null, function (err, data) {
          if (err) {
            reject(err.message);
          } else {
            resolve(data);
          }
        });
      });

      payload.then(this.handleFetchSuccess).catch(this.handleFetchFailure);
    }
  }, {
    key: 'getQueryParams',
    value: function getQueryParams(_ref) {
      var url = _ref.url;

      return _qs2.default.stringify({
        url: url,
        format: 'js'
      });
    }
  }, {
    key: 'handleFetchSuccess',
    value: function handleFetchSuccess(response) {
      this.setState({ __html: response.html });
    }
  }, {
    key: 'handleFetchFailure',
    value: function handleFetchFailure() {
      this.setState({ __html: null });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.__html } });
    }
  }]);

  return SoundCloudEmbed;
}(_react.Component);

exports.default = SoundCloudEmbed;
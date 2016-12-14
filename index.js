// Generated by IcedCoffeeScript 108.0.11
(function() {
  var RockSolidSocket, net, sig,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  net = require('net');

  sig = "[ROCKSOLIDSOCKET]";

  RockSolidSocket = (function(_super) {
    __extends(RockSolidSocket, _super);

    function RockSolidSocket(url) {
      this._connect = __bind(this._connect, this);
      var _ref;
      RockSolidSocket.__super__.constructor.call(this);
      _ref = url.split(':'), this.host = _ref[0], this.port = _ref[1];
      this.on('close', (function(_this) {
        return function() {
          console.error("" + sig + " Connection closed unexpectedly");
          return _this._connect();
        };
      })(this));
      this.on('error', (function(_this) {
        return function(e) {
          console.error("" + sig + " Error:");
          console.error(e);
          _this.destroy();
          return _this._connect();
        };
      })(this));
      this.on('timeout', (function(_this) {
        return function() {
          console.error("" + sig + " Connection timed out");
          return _this._connect();
        };
      })(this));
      this.on('connect', (function(_this) {
        return function() {
          return console.log("" + sig + " Connected to " + _this.host + ":" + _this.port);
        };
      })(this));
      this.setKeepAlive(5000);
      this._connect();
    }

    RockSolidSocket.prototype._connect = function(attempt) {
      var e;
      if (attempt == null) {
        attempt = 1;
      }
      try {
        return this.connect(this.port, this.host);
      } catch (_error) {
        e = _error;
        console.info("" + sig + " Reconnecting to " + this.host + ":" + this.port);
        return setTimeout(this._connect, 500 * attempt);
      }
    };

    return RockSolidSocket;

  })(net.Socket);

  module.exports = RockSolidSocket;

}).call(this);

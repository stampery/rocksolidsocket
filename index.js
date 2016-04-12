// Generated by IcedCoffeeScript 108.0.11
(function() {
  var RockSolidSocket, net,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  net = require('net');

  RockSolidSocket = (function(_super) {
    __extends(RockSolidSocket, _super);

    function RockSolidSocket(url) {
      var _ref;
      RockSolidSocket.__super__.constructor.call(this);
      _ref = url.split(':'), this.host = _ref[0], this.port = _ref[1];
      this.on('close', this._reconnect);
      this.on('error', this.destroy);
      this.on('timeout', this.destroy);
      this.on('connect', (function(_this) {
        return function() {
          return console.log("[ROCKSOLIDSOCKET] Connected to " + _this.host + ":" + _this.port);
        };
      })(this));
      this._connect();
    }

    RockSolidSocket.prototype._connect = function() {
      var e;
      try {
        return this.connect(this.port, this.host);
      } catch (_error) {
        e = _error;
        return this._reconnect();
      }
    };

    RockSolidSocket.prototype._reconnect = function() {
      console.log("[ROCKSOLIDSOCKET] Reconnecting to " + this.host + ":" + this.port);
      return setTimeout(this._connect.bind(this), 500);
    };

    return RockSolidSocket;

  })(net.Socket);

  module.exports = RockSolidSocket;

}).call(this);

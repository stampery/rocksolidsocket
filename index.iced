net = require 'net'

class RockSolidSocket extends net.Socket
  constructor : (url) ->
    super()
    [@host, @port] = url.split ':'
    @on 'close', @_reconnect
    @on 'error', @destroy
    @on 'timeout', @destroy
    @on 'connect', () =>
      console.log "[ROCKSOLIDSOCKET] Connected to #{@host}:#{@port}"
    @_connect()

  _connect : () ->
    try
      @connect @port, @host
    catch e
      @_reconnect()

  _reconnect : () ->
    console.log "[ROCKSOLIDSOCKET] Reconnecting to #{@host}:#{@port}"
    setTimeout @_connect.bind(this), 500

module.exports = RockSolidSocket

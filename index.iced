net = require 'net'
sig = "[ROCKSOLIDSOCKET]"

class RockSolidSocket extends net.Socket
    constructor : (url) ->
        super()
        [@host, @port] = url.split ':'

        @on 'close', =>
            console.error "#{sig} Connection closed unexpectedly"
            @_reconnect()

        @on 'error', (e) =>
            console.error "#{sig} Error:"
            console.error e
            @_reconnect()

        @on 'timeout', =>
            console.error "#{sig} Connection timed out"
            @_reconnect()

        @on 'connect', =>
            console.log "#{sig} Connected to #{@host}:#{@port}"

        @_connect()

    _connect : () ->
        try
            @connect @port, @host
        catch e
            console.error(e)
            @_reconnect()

    _reconnect : () ->
        console.info "#{sig} Reconnecting to #{@host}:#{@port}"
        setTimeout @_connect.bind(this), 500

module.exports = RockSolidSocket

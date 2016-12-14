net = require 'net'
sig = "[ROCKSOLIDSOCKET]"

class RockSolidSocket extends net.Socket
    constructor : (url) ->
        super()
        [@host, @port] = url.split ':'

        @on 'close', =>
            console.error "#{sig} Connection closed unexpectedly"
            @_connect()

        @on 'error', (e) =>
            console.error "#{sig} Error:"
            console.error e
            @destroy()
            @_connect()

        @on 'timeout', =>
            console.error "#{sig} Connection timed out"
            @_connect()

        @on 'connect', =>
            console.log "#{sig} Connected to #{@host}:#{@port}"

        @setKeepAlive(5000)
        @_connect()

    _connect : (attempt = 1) =>
        try
            @connect @port, @host
        catch e
            console.info "#{sig} Reconnecting to #{@host}:#{@port}"
            setTimeout @_connect, 500*attempt

module.exports = RockSolidSocket

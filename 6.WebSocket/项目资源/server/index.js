const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');

const http = require('http');
const WebSocketServer = require('websocket').server;

const {$ws} = require('./ws')

const app = new Koa();

app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

const port = 3000;
let server = app.listen(port, function (error) {
    if (error) {
        console.log('服务器运行失败,', error);
    } else {
        console.log('服务器启动成功,启动于http://localhost:' + port);
    }
})

// var server = http.createServer(function(request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// server.listen(3000, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });


let wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});


function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    // var connection = request.accept('echo-protocol', request.origin);
    // console.log((new Date()) + ' Connection accepted.');
    // connection.on('message', function (message) {
    //     if (message.type === 'utf8') {
    //         console.log('Received Message: ' + message.utf8Data);
    //         connection.sendUTF(message.utf8Data);
    //     } else if (message.type === 'binary') {
    //         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    //         connection.sendBytes(message.binaryData);
    //     }
    // });
    // connection.on('close', function (reasonCode, description) {
    //     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    // });

    $ws(request);
});
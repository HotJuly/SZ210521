const {usersModel} = require('../mongoDB');
let wsConnects = {}

async function $ws(request){
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    const {userId} = await usersModel.findOne({token:request.httpRequest.headers.token});
    wsConnects[userId] = connection;
    // console.log('wsConnects',wsConnects,wsConnects[request.httpRequest.headers.token])
}

module.exports={
    wsConnects,
    $ws
}
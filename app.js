const midi = require('midi');
const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/asset'))

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname })
});
server.listen(3000, function() {
    console.log('Votre app est disponible sur localhost:3000 !')
})

io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    input.on('message', (deltaTime, message) => {
        var velocity = message.toString().split(",")[2];
        var note = message.toString().split(",")[1];
        if (parseInt(message.toString().split(",")[0]) === 176) {
            io.emit('potar', note + " " + velocity);
        } else {
            var state = (message.toString().split(",")[0] == 144 ? "ON" : "OFF");
            //console.log(note + " " + (state == "ON" ? state + " " + velocity : state))
            io.emit('touche', note + " " + (state == "ON" ? state + " " + velocity : state));
        }

    });
})

const input = new midi.Input();

input.getPortCount();
input.getPortName(1);



input.openPort(1);

input.ignoreTypes(false, false, false);
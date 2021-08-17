
const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickes-pendientes', ticketControl.tickets.length);
    
   
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
    const siguiente = ticketControl.siguiente();
    callback(siguiente);
    socket.broadcast.emit('tickes-pendientes', ticketControl.tickets.length);

    })

    socket.on('atender-siguiente', ( {escritorio}, callback ) =>{

        if(!escritorio){
            return callback({
                ok: false,
                msg: ' el escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
        socket.emit('tickes-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickes-pendientes', ticketControl.tickets.length);

        if(!ticket){
            return callback({
                ok: false,
                msg: ' no hay tickets pendientes'
            })
        }else{
            return callback({
                ok: true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}


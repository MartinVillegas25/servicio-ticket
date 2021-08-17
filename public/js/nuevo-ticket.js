//referecias

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();



socket.on('connect', () => {
     // asi hago que si estan conectado podemos hacer click en el boton, pero si estan desconectado, no se va a poder crear tickets
    btnCrear.disabled = false;
    
});

socket.on('disconnect', () => {
    
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ultimo)=> {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})




btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});
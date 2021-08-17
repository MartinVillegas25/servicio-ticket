//referencias

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const numTicket = document.querySelector('small');
const alerta = document.querySelector('.alert');
const pendientes = document.querySelector('#lblPendientes');



// asi busco dentro de la URL
const searchParams = new URLSearchParams( window.location.search); 

// asi busco si dentro de la URL existe la palabra escritorio, en caso de que no, te redirige al index
if (!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error(' el escritorio es obligatorio')
}

const socket = io();

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

alerta.style.display = 'none';

socket.on('connect', () => {
     // asi hago que si estan conectado podemos hacer click en el boton, pero si estan desconectado, no se va a poder crear tickets
     btnAtender.disabled = false;
    
});

socket.on('disconnect', () => {
    
    btnAtender.disabled = true;
});


socket.on('tickes-pendientes', (pendiente)=>{
    pendientes.innerText = pendiente;
})



btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-siguiente', {escritorio}, ({ok, msg, ticket}) => {
        
        if(!ok) {
            numTicket.innerText = 'Nadie';
            return alerta.style.display = '';
        }

        numTicket.innerText = 'Ticket ' + ticket.numero;
    })

    socket.on('tickes-pendientes', (pendiente)=>{
        pendientes.innerText = pendiente;
    })
    
    // socket.emit( 'siguiente-ticket', null, (ticket) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});
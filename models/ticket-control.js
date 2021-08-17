const path = require('path');
const fs = require('fs');


// esta clase es para manejar los tickes que se generan y de que escritorio los estan llamando
class Tickets {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimo= 0; // para tener el valor del ultimo ticket
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return{
            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets : this.tickets,
            ultimos4: this.ultimos4
        }
    }
    
    //con init leemos el json y establecemos las propiedades
    init() {
        const {hoy, tickets, ultimos4, ultimo} =require ('../db/data.json');
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimos4 = ultimos4;
            this.ultimo = ultimo;
        }else{
            //es otro dia
            this.guardarDb();
        }
    }

    guardarDb() {
       const dbpath = path.join(__dirname , '../db/data.json' )
       fs.writeFileSync(dbpath, JSON.stringify(this.toJson));   
    }

    siguiente(){
        this.ultimo += 1; // para sumarle uno al ultimo ticket generado
        const ticket = new Tickets(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDb();
        return 'ticket' + ticket.numero;
    
    }

    atenderTicket(escritorio){

        if(this.tickets.length == 0){
            return null
    }

    const ticket = this.tickets.shift(); // asi borro el primer elemento del arreglo
    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket); //para que lo agrege al principio del arreglo

    if(this.ultimos4.length >4){
        this.ultimos4.splice(-1,1); //borra el ultimo elemento del arreglo, para que asi siempre se muestren solo los ultimos cuatro
    }

    this.guardarDb()

    return ticket

    }

}

module.exports = TicketControl;

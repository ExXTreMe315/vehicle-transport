import * as alt from "alt-server";
import * as chat from "chat";

const trailer = new alt.Vehicle("tr2", -350.28131103515625, -197.39340209960938, 37.923828125, 0, 0, -1);
const elegy = new alt.Vehicle("elegy", -374.79559326171875, -206.05714416503906, 36.2725830078125, 0, 0, -1);

alt.onClient('ask:trailer', (player) =>{
    alt.emitClient(player, 'send:trailer', trailer);
});

let ramp = true
alt.onClient('ramp', (r) =>{
    if(ramp){
        ramp = false;
        trailer.setDoorState(5, 7);
    } else if(!ramp){
        ramp = true;
        trailer.setDoorState(5, 0);
    }
});

let uppr = true
alt.onClient('uppr', (r) =>{
    if(uppr){
        trailer.setDoorState(4, 7);
        uppr = false;
    } else if(!uppr){
        trailer.setDoorState(4, 2);
        alt.setTimeout(() => {
            trailer.setDoorState(4, 0);
            uppr = true;
        }, 1000);
    }
});

chat.registerCmd('door', (player, args) => {
    let id0 = JSON.parse(args[0])
    let id1 = JSON.parse(args[1])
    trailer.setDoorState(id0, id1)
});

chat.registerCmd('ss', (player, args) => {
    let veh = player.vehicle;
    let id = JSON.parse(args[0]);
    alt.emitClient(player, 'ss', player, veh, trailer, id);
});

chat.registerCmd('as', (player, args) => {
    let veh = player.vehicle;
    alt.emitClient(player, 'as', player, trailer, veh, args);
});

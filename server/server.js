import * as alt from "alt-server";

const trailer = new alt.Vehicle("tr2", -350.28131103515625, -197.39340209960938, 37.923828125, 0, 0, -1);
const elegy = new alt.Vehicle("elegy", -374.79559326171875, -206.05714416503906, 36.2725830078125, 0, 0, -1);

alt.onClient('ask:trailer', (player) =>{
    alt.emitClient(player, 'send:trailer', trailer);
});

alt.onClient('getDoorState', (player, veh, door) =>{
    let doorState = veh.getDoorState(door);
    alt.emitClient(player, 'send:doorstate', doorState);
});

let ramp = true
alt.onClient('ramp', () =>{
    if(ramp){
        ramp = false;
        trailer.setDoorState(5, 7);
    } else if(!ramp){
        ramp = true;
        trailer.setDoorState(5, 0);
    }
});

let uppr = true
alt.onClient('uppr', () =>{
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

alt.onClient('send:trailer', (player, closestVehicle) => {
    alt.onClient('get:trailer', (player) => {
        alt.emitClient(player, 'send:trailer', closestVehicle)
    })
})

/*
    let doorState = trailer.getDoorState(0);
    console.log(doorState);
 */
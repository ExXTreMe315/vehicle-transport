import * as alt from "alt-server";

const flatbeds = []

alt.onClient('send:trailer', (player, closestVehicle) => {
    alt.onClient('get:trailer', (player) => {
        alt.emitClient(player, 'send:trailer', closestVehicle)
    });
});

alt.onClient('send:trailer', (player, closestVehicle) => {
    alt.onClient('get:trailer2', (player) => {
        alt.emitClient(player, 'send:trailer2', closestVehicle)
    });
});

alt.onClient('send:trailer', (player, closestVehicle) => {
    alt.onClient('get:trailer3', (player) => {
        alt.emitClient(player, 'send:trailer3', closestVehicle)
    });
});

alt.onClient('getDoorState', (player, veh, door) =>{
    let doorState = veh.getDoorState(door);
    alt.emitClient(player, 'send:doorstate', doorState);
});

alt.onClient('ramp', (player, veh) =>{
    let doorState = veh.getDoorState(1)
    if(doorState == 0){
        veh.setDoorState(5, 7);
    } else if(doorState == 7){
        veh.setDoorState(5, 0);
    }
});

alt.onClient('uppr', (player, veh) =>{
    let doorState = veh.getDoorState(0)
    if(doorState == 0){
        veh.setDoorState(4, 7);
    } else if(doorState == 7){
        veh.setDoorState(4, 2);
        alt.setTimeout(() => {
            veh.setDoorState(4, 0);
        }, 1000);
    }
});

alt.onClient('getNumberPlateText', (player, veh) =>{
    let numberPlateText = veh.numberPlateText
    alt.emitClient(player, 'sendNumberPlateIndex', veh, numberPlateText);
});

alt.onClient('flat:save', (player, tow, flat) => {
    flatbeds.push({savedtow: tow, savedflat: flat});
    console.log(flatbeds);
});


alt.onClient('flat:load', (player) => {
    alt.emitClient(player, 'flat:loadet', flatbeds)
});

alt.onClient('flat:del', (player, flat) => {
    let i = 0;
    flatbeds.forEach(e => {
        if(e['savedflat'] == flat){
            flatbeds.splice(i, 1);
            console.log(flatbeds)
        }
    });
});

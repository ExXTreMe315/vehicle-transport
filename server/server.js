import * as alt from "alt-server";
import * as chat from "chat";
import * as fs from "fs";

const trailer = new alt.Vehicle("tr2", -350.28131103515625, -197.39340209960938, 37.923828125, 0, 0, -1);
const elegy = new alt.Vehicle("elegy", -372.949462890625, -126.76483154296875, 38.6820068359375, 0, 0, -1);

chat.registerCmd('trailerDoor', (player, args) => {
    let id0 = JSON.parse(args[0])
    let id1 = JSON.parse(args[1])
    trailer.setDoorState(id0, id1)
});

chat.registerCmd('door', (player, args) => {
    let id0 = JSON.parse(args[0])
    let id1 = JSON.parse(args[1])
    player.vehicle.setDoorState(id0, id1)
});

chat.registerCmd('ws', (player, args) => {
    let veh = player.vehicle
    alt.emitClient(player, 'ws', player, trailer, veh, args);
});

chat.registerCmd('ss', (player) => {
    let veh = player.vehicle
    alt.emitClient(player, 'ss', player, veh);
});

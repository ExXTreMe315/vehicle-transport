import * as alt from "alt-client";
import * as native from "natives";
import * as NativeUI from './includes/NativeUI/NativeUi';

//Menus
const mainMenu = new NativeUI.Menu("Trailer", "Trailer Menu", new NativeUI.Point(50, 50));
const doorsMenu = new NativeUI.Menu("Ramps", "Ramps Menu", new NativeUI.Point(50, 50));
const attachMenu = new NativeUI.Menu("Attach", "Attach Menu", new NativeUI.Point(50, 50));

//MainMenu
let doorsMenuItem = (new NativeUI.UIMenuItem("Ramp/Floor Menu", "Lower/Raise Ramp/Floor"));
mainMenu.AddItem(doorsMenuItem);

let attachMenuItem = (new NativeUI.UIMenuItem("Attach Menu", "Open Attach Menu"));
mainMenu.AddItem(attachMenuItem);

let testItem = (new NativeUI.UIMenuItem("testItem", "execute testItem"));
mainMenu.AddItem(testItem);

mainMenu.AddSubMenu(doorsMenu, doorsMenuItem);
mainMenu.AddSubMenu(attachMenu, attachMenuItem);

//RampMenu
let rampItem = (new NativeUI.UIMenuItem("Ramp", "Lower/Raise Ramp"));
doorsMenu.AddItem(rampItem);

let upprItem = (new NativeUI.UIMenuItem("Etage", "Lower/Raise Etage"));
doorsMenu.AddItem(upprItem);

//AttachMenu
let attachItem = (new NativeUI.UIMenuItem("Attach Lower", "Attach Vehicle at Lower Floor"));
attachMenu.AddItem(attachItem);

let attachUpprMidItem = (new NativeUI.UIMenuItem("Attach Upper Middle", "Attach Vehicle at Upper Middle"));
attachMenu.AddItem(attachUpprMidItem);

let attachUpprEndItem = (new NativeUI.UIMenuItem("Attach Upper End", "Attach Vehicle at Upper End"));
attachMenu.AddItem(attachUpprEndItem);

let detachItem = (new NativeUI.UIMenuItem("Detach", "Detach Vehicle"));
attachMenu.AddItem(detachItem);

//ItemClickHandlers

mainMenu.ItemSelect.on(item => {
    if (item == testItem) {
        alt.emitServer('get:trailer');
        alt.onServer('send:trailer', (closestVehicle) => {
            alt.log(closestVehicle);
            alt.emitServer('getDoorState', closestVehicle, 0);
            alt.onServer('send:doorstate', (doorState) => {
                alt.log(doorState);
            });
        });
   	}
});

let uppr = true
doorsMenu.ItemSelect.on(item => {
    if (item == rampItem) {
        alt.emitServer('ramp');
   	}
    if (item == upprItem) {
        alt.emitServer('uppr');
        if(uppr){
            uppr = false
        } else if(!uppr){
            uppr = true
        }
   	}
});

attachMenu.ItemSelect.on(item => {
  	if (item == attachItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('ask:trailer');
        alt.onServer('send:trailer', (trailer) => {
            attach(veh, trailer);
        });
   	}
    if (item == attachUpprMidItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('get:trailer');
        alt.onServer('send:trailer', (closestVehicle) => {
            alt.log(closestVehicle);
            alt.emitServer('getDoorState', closestVehicle, 0);
            alt.onServer('send:doorstate', (doorState) => {
                if(doorState == 0){
                    alt.onServer('send:trailer', (trailer) => {
                        attachUpprMidUp(veh, trailer);
                    });
                } else if(doorState == 7){
                    alt.onServer('send:trailer', (trailer) => {
                        attachUpprMidDown(veh, trailer);
                    });
                }
            });
        });
    }
    if (item == attachUpprEndItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('get:trailer');
        alt.onServer('send:trailer', (closestVehicle) => {
            alt.log(closestVehicle);
            alt.emitServer('getDoorState', closestVehicle, 0);
            alt.onServer('send:doorstate', (doorState) => {
                if(doorState == 0){
                    alt.onServer('send:trailer', (trailer) => {
                        attachUpprEndUp(veh, trailer);
                    });
                } else if(doorState == 7){
                    alt.onServer('send:trailer', (trailer) => {
                        attachUpprEndDown(veh, trailer);
                    });
                }
            });
        });
    }
    if (item == detachItem) {
        let veh = alt.Player.local.vehicle;
        detach(veh)
   	}
});

//Key Handles
alt.on('keyup', (key) => {
    if(key === 69){
        let closestVehicle = getClosestVehicle(alt.Player.local);
        let dist = distance(closestVehicle.pos, alt.Player.local.pos);
        if(closestVehicle.model == alt.hash('tr2') && dist <= 5){
            mainMenu.Open();
            alt.log(closestVehicle)
            alt.emitServer('send:trailer', closestVehicle);
        }
    }
});

//Script Functions
function attach (veh, trailer){
    let bone = 18;
    let offset = { x: 0.0000, y: 6.5424, z: 0.2702 }
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}

function attachUpprMidUp (veh, trailer){
    let bone = 17;
    let offset = { x: 0.0000, y: 2.5, z: 2.4 }
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}

function attachUpprEndUp (veh, trailer){
    let bone = 17;
    let offset = {x: 0.0000, y: 2.5, z: 2.3}
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}

function attachUpprMidDown (veh, trailer){
    let bone = 17;
    let offset = { x: 0.0000, y: 2.5, z: 1.9 }
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}

function attachUpprEndDown (veh, trailer){
    let bone = 17;
    let offset = {x: 0.0000, y: 2.5, z: 0.8}
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}

function detach (veh){
    native.detachEntity(veh, true, true);    
}

//Distance Functions
/**
 * Get all players in a certain range of a position.
 * @param  {} pos
 * @param  {} range
 * @param  {} dimension=0
 * @returns {Array<alt.Player>}
 */
 export function getPlayersInRange(pos, range, dimension = 0) {
    if (pos === undefined || range === undefined) {
        throw new Error('GetPlayersInRange => pos or range is undefined');
    }

    return alt.Player.all.filter(player => {
        return player.dimension === dimension && distance2d(pos, player.pos) <= range;
    });
}

/**
 * Get the forward vector of a player.
 * @param  {} rot
 * @returns {{x,y,z}}
 */
export function getForwardVectorServer(rot) {
    const z = -rot.z;
    const x = rot.x;
    const num = Math.abs(Math.cos(x));
    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}

/**
 * Get the distance from one vector to another.
 * Does take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {number}
 */
export function distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

/**
 * Get the distance from one vector to another.
 * Does not take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {{x,y,z}}
 */
export function distance2d(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

/**
 * Check if a position is between two vectors.
 * @param  {} pos
 * @param  {} vector1
 * @param  {} vector2
 * @returns {boolean}
 */
export function isBetween(pos, vector1, vector2) {
    const validX = pos.x > vector1.x && pos.x < vector2.x;
    const validY = pos.y > vector1.y && pos.y < vector2.y;
    return validX && validY ? true : false;
}

/**
 * Get a random position around a position.
 * @param  {} position
 * @param  {} range
 * @returns {{x,y,z}}
 */
export function randomPositionAround(position, range) {
    return {
        x: position.x + Math.random() * (range * 2) - range,
        y: position.y + Math.random() * (range * 2) - range,
        z: position.z
    };
}

/**
 * Get the closest vector from a group of vectors.
 * @param  {alt.Vector3} pos
 * @param  {Array<{x,y,z}> | Array<{pos:alt.Vector3}} arrayOfPositions
 * @returns {Array<any>}
 */
export function getClosestVectorFromGroup(pos, arrayOfPositions) {
    arrayOfPositions.sort((a, b) => {
        if (a.pos && b.pos) {
            return distance(pos, a.pos) - distance(pos, b.pos);
        }

        return distance(pos, a.pos) - distance(pos, b.pos);
    });

    return arrayOfPositions[0];
}

/**
 * Get the closest player to a player.
 * @param  {} player
 * @returns {Array<alt.Player>}
 */
export function getClosestPlayer(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Player.all]);
}

/**
 * Get the closest vehicle to a player.
 * @param  {alt.Vector3} player
 * @returns {Array<alt.Vehicle>}
 */
export function getClosestVehicle(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Vehicle.all]);
}
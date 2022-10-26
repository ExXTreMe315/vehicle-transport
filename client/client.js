import * as alt from "alt-client";
import * as native from "natives";
import * as NativeUI from './includes/NativeUI/NativeUi';

//Menu
const mainMenu = new NativeUI.Menu("Trailer", "Trailer Menu", new NativeUI.Point(50, 50));

let rampItem = (new NativeUI.UIMenuItem("Ramp", "Lower/Raise Ramp"));
mainMenu.AddItem(rampItem);

let upprItem = (new NativeUI.UIMenuItem("Etage", "Lower/Raise Etage"));
mainMenu.AddItem(upprItem);

let attachItem = (new NativeUI.UIMenuItem("Attach", "Attach Vehicle"));
mainMenu.AddItem(attachItem);

let attachUpprMidItem = (new NativeUI.UIMenuItem("Attach Upper Middle", "Attach Vehicle at Upper Middle"));
mainMenu.AddItem(attachUpprMidItem);

let attachUpprEndItem = (new NativeUI.UIMenuItem("Attach Upper End", "Attach Vehicle at Upper End"));
mainMenu.AddItem(attachUpprEndItem);

let detachItem = (new NativeUI.UIMenuItem("Detach", "Detach Vehicle"));
mainMenu.AddItem(detachItem);

let uppr = true

mainMenu.ItemSelect.on(item => {
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
  	if (item == attachItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('ask:trailer');
        alt.onServer('send:trailer', (trailer) => {
            attach(veh, trailer);
        });
   	}
    if (item == attachUpprMidItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('ask:trailer');
        if(uppr){
            alt.onServer('send:trailer', (trailer) => {
                attachUpprMidUp(veh, trailer);
            });
        } else if(!uppr){
            alt.onServer('send:trailer', (trailer) => {
                attachUpprMidDown(veh, trailer);
            });
        }
    }
    if (item == attachUpprEndItem) {
        let veh = alt.Player.local.vehicle;
        alt.emitServer('ask:trailer');
        if(uppr){
            alt.onServer('send:trailer', (trailer) => {
                attachUpprEndUp(veh, trailer);
            });
        } else if(!uppr){
            alt.onServer('send:trailer', (trailer) => {
                attachUpprEndDown(veh, trailer);
            });
        }
    }
    if (item == detachItem) {
        let veh = alt.Player.local.vehicle;
        native.detachEntity(veh, true, true);  
   	}
});

alt.on('keyup', (key) => {
    if(key === 71){
        mainMenu.Open();
    }
});

//Script

function attach (veh, trailer){
    let bone = 18;
    let offset = { x: 0.0000, y: 6.5424, z: 0.2702 }
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
}
alt.onServer('as', (player, trailer, veh, args) => {
    let bone = 17;
    let os0 = JSON.parse(args[0]);
    let os1 = JSON.parse(args[1]);
    let os2 = JSON.parse(args[2]);
    let offset = { x: os0, y: os1, z: os2}
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
});

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

alt.onServer('ss', (player, veh, trailer, args) => {
    native.attachEntityToEntity(veh, trailer, args, 0, 0, 0, 0, 0, 0, false, false, true, false, 20, true);
    //native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
});

/**
 * Get the distance from one vector to another.
 * Does take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {number}
 */
 export function distance2(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }
    let x = Math.sqrt(Math.pow(vector1.x - vector2.x, 2));
    let y = Math.sqrt(Math.pow(vector1.y - vector2.y, 2));
    let z = Math.sqrt(Math.pow(vector1.z - vector2.z, 2));
    let dist = {x: x, y: y, z: z}
    return dist
}
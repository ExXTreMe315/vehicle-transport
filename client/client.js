import * as alt from "alt-client";
import * as native from "natives";

alt.onServer('ws', (player, trailer, veh, args) => {
    let bone = 18;
    let offset = { x: 0.0000, y: 6.5424, z: 0.2702 }
    let vehPos = native.getOffsetFromEntityGivenWorldCoords(trailer, veh.pos.x, veh.pos.y, veh.pos.z);
    let attachPos = {x: vehPos.x-offset.x, y: vehPos.y-offset.y, z: vehPos.z-offset.z}

    native.attachEntityToEntity(veh, trailer, bone, attachPos.x, attachPos.y, attachPos.z, 0, 0, 0, false, false, true, false, 20, true);
});

alt.onServer('ss', (player, veh) => {
    native.detachEntity(veh, true, true)
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
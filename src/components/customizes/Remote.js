var MicroGear = require('microgear');
import blelib from '../ble/ble'

const APPID = 'TheBeetleBeachBox';
const KEY = '535vxXWIX3Uz66A';
const SECRET = 'GHCZ3Ohksf7lvItgeFQQ2QUjF';

var microgear = MicroGear.create({
    key: KEY,
    secret: SECRET
});

microgear.connect(APPID);

microgear.on('connected', function () {
    microgear.subscribe("/1/remoteOpen")
    console.log('Connected...');
})

microgear.on('message', function (topic, msg) {
    if (topic == "/TheBeetleBeachBox/1/remoteOpen") {
        console.log(msg);
        var boxid = new TextDecoder("utf-8").decode(msg);
        console.log(boxid)
        openBox(boxid)
    }
});

async function openBox(boxid) {
    let peripheral = await blelib.bleConnect(boxid)
    await blelib.openBox(peripheral)
    setTimeout(async () => {
        await blelib.closeBox(peripheral)
        await blelib.bleDisconnect(boxid)
    }, 5000);
}



export {
    microgear
}
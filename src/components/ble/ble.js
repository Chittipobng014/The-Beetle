export default {
    turnONOFF: function (peripheral, cmd) {
        return new Promise((resolve, reject) => {
            for (let index = 0; index < peripheral.characteristics.length; index++) {
                const element = peripheral.characteristics[index];
                console.log(element)
                if (element.properties[0] == 'Write') {
                    var array = new Uint8Array(cmd.length);
                    for (var i = 0, l = cmd.length; i < l; i++) {
                        array[i] = cmd.charCodeAt(i);
                    }
                    ble.write(peripheral.id, element.service, element.characteristic, array.buffer, function () {
                        resolve("succenss")
                    }, function () {
                        resolve("fail")
                    });
                }
            }
        })
    },
    stringToBytes: (string) => {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array.buffer;
    },
    bleConnect: function (id) {
        return new Promise((resolve, reject) => {
            ble.connect(id, (peripheral) => {
                console.log("Connected")
                return resolve(peripheral)
            }), (error) => {
                return resolve(error)
            };
        })
    },
    bleDisconnect: function (id) {
        return new Promise((resolve, reject) => {
            ble.disconnect(id, () => {
                resolve("Disconnected")
            }, (err) => {
                resolve(err)
            });
        })
    },
    openBox: async function (peripheral) {
        return new Promise(async (resolve, reject) => {
            const open = await this.turnONOFF(peripheral, "ON");
            resolve(open)
        })
    },
    closeBox: async function (peripheral) {
        return new Promise(async (resolve, reject) => {
            const close = await this.turnONOFF(peripheral, "OFF");
            setTimeout(() => {
                resolve(close)
            }, 2000);
        })
    },
}
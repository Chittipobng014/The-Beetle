export default {
    turnONOFF: function (peripheral, cmd) {
        return new Promise((resolve, reject) => {
            console.log(peripheral.characteristics)
            for (let index = 0; index < peripheral.characteristics.length; index++) {
                const element = peripheral.characteristics[index];
                if (element.properties[0] == 'Write') {
                    var array = new Uint8Array(cmd.length);
                    for (var i = 0, l = cmd.length; i < l; i++) {
                        array[i] = cmd.charCodeAt(i);
                    }
                    ble.write(peripheral.id, element.service, element.characteristic, array.buffer, function (data) {
                        resolve("succenss")
                    }, function (error) {
                        console.log(error)
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
            console.log("disconnecting");
            ble.disconnect(id, () => {
                console.log("​disconnected");
                resolve("Disconnected")
            }, (err) => {
                console.log(err)
                resolve(err)
            });
        })
    },
    openBox: async function (peripheral) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Opening')
                const open = await this.turnONOFF(peripheral, "ON");
                console.log('Opened')
                resolve(open)
            } catch (error) {
                console.log(error)
                resolve(error)
            }
        })
    },
    closeBox: async function (peripheral) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Closing')
                const close = await this.turnONOFF(peripheral, "OFF");
                setTimeout(() => {
                    console.log('Closed')
                    resolve(close)
                }, 2000);
            } catch (error) {
                console.log(error)
                resolve(error)
            }
        })
    },
}
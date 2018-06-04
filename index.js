var miio = require('miio');
var Service, Characteristic;

module.exports = function (homebridge) {

    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-xiaomi-power-strip', 'XiaoMiPowerStrip', XiaoMiPowerStrip);
}

function XiaoMiPowerStrip(log, config) {
    this.log = log;
    this.name = config.name || 'Power Strip';
    this.address = config.address;
    this.token = config.token;
    this.model = config.model;

    this.services = [];

    this.switchService = new Service.Switch(this.name);

    this.switchService
       .getCharacteristic(Characteristic.On)
       .on('get',this.getPowerState.bind(this))
       .on('set',this.setPowerOn.bind(this));

    this.services.push(this.switchService);

    this.serviceInfo = new Service.AccessoryInformation();

    this.serviceInfo
        .setCharacteristic(Characteristic.Manufacturer, 'Xiaomi')
        .setCharacteristic(Characteristic.Model, 'Power-Strip')
        .setCharacteristic(Characteristic.SerialNumber, '62810821');;

    this.services.push(this.serviceInfo);

    this.discover();
}

XiaoMiPowerStrip.prototype = {
    discover: function () {
        var accessory = this;
        const device = miio.createDevice({
            address: accessory.address,
            token: accessory.token,
            model: accessory.model
        });
        device.init();
        accessory.device = device;
        device.power();
    },

    getPowerState: function (callback) {
        var on = this.device.power()
        if (on == undefined){
          on = true
          this.device.setPower(true)
            .then(on => console.log('Power is now', on))
            .catch(err=>{
              callback(err);
            });
        }
        if (on == undefined){
          on = true
          this.device.setPower(true)
            .then(on => console.log('Power is now', on))
            .catch(err=>{
              callback(err);
            });
        }
        else if(on) {
            callback(null, true);
        } else {
            callback(null, false);
        }
        this.log.info('getPowerState:', on);
    },

    setPowerOn: function (Power, callback) {
        this.log.info('setPowerState:', Power);
        this.device.setPower(Power ? true: false)
            .then(on => console.log('Power is now', on))
            .catch(err=>{
              callback(err);
            });
        callback();
    },

    identify: function(callback) {
        callback();
    },

    getServices: function () {
        return this.services;
    }
};

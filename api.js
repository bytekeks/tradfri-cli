const debug = require('debug')('tradfri-tool:apiClass');
const Tradfri = require('ikea-tradfri');
const config = require('./initialConfig.json');
const credentials = require('./credentials.json');

class api {
  constructor() {
    this.tradfri = new Tradfri(config.tradfriGatewayUrl, credentials, false);

    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
    this.getDevices = this.getDevices.bind(this);
    // this.switchOffAll = this.switchOffAll.bind(this);
    // this.switchOnAll = this.switchOnAll.bind(this);
    this.switchOff = this.switchOff.bind(this);
    this.switchOn = this.switchOn.bind(this);
    this.setBrightness = this.setBrightness.bind(this);
    this.setColour = this.setColour.bind(this);
  }

  async connect() {
    // debug('connect called');
    try {
      const data = await this.tradfri.connect();

      await this.getDevices();

      // debug(data);
    } catch (err) {
      debug("ERROR:");
      debug(err);
      //process.exit(1);
    }
  }

  async close() {
    try {
      const closed = await this.tradfri.close();
      if (closed === true) {
        debug('Connection closed.');
      } else {
        debug('Didn\'nt close the connection :(');
      }
    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }

  async getDevices() {
    try {
      this.devices = await this.tradfri.devices;

      // debug(this.devices);

      this.deviceNames = await this.devices
        .filter(device => device.type==='Bulb')
        .map(device => device.name);

    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }

  // async switchOffAll() {
  //   try {
  //     if (this.deviceNames !== undefined) {
  //       await this.switchOff(this.deviceNames);
  //     } else {
  //       debug('Please define devices first.');
  //     }
  //   } catch (err) {
  //     debug("ERROR:");
  //     debug(err);
  //   }
  // }

  // async switchOnAll() {
  //   try {
  //     debug(this.deviceNames);
  //     if (this.deviceNames !== undefined) {
  //       await this.deviceNames.forEach(name => console.log(name));
  //       await this.deviceNames.forEach(name => this.switchOn(name));
  //     } else {
  //       debug('Please define devices first.');
  //     }
  //   } catch (err) {
  //     debug("ERROR:");
  //     debug(err);
  //   }
  // }

  async switchOff(lampName) {
    try {
      if (lampName !== undefined) {
        const lamp = await this.tradfri.device(lampName);
        const switchedOff = await lamp.switch(false);

        if (switchedOff === true) {
          debug('lamp switched off.');
        } else {
          debug('Didn\'t switch off the lamp.');
        }
      } else {
        debug('Please define lamp name.');
      }
    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }

  async switchOn(lampName) {
    try {
      if (lampName !== undefined) {
        const lamp = await this.tradfri.device(lampName);

        // debug(lamp);

        const switchedOn = await lamp.switch(true);

        if (switchedOn === true) {
          debug('lamp switched on.');
        } else {
          debug('Didn\'t switch on the lamp.');
        }
      } else {
        debug('Please define lamp name.');
      }
    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }

  async setBrightness(lampName, brightness) {
    try {
      if (lampName !== undefined && brightness <= 100 && brightness >= 0) {
        const lamp = await this.tradfri.device(lampName);

        // debug(lamp);

        const setBrightness = await lamp.setBrighness(brightness);

        if (setBrightness === true) {
          debug('Brightness set to xxx.');
        } else {
          debug('Didn\'t set brightness.');
        }
      } else {
        debug('Please define lamp name.');
      }
    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }

  async setColour(lampName, colour) {
    try {
      if (lampName !== undefined && (colour !== 'white' || colour !== 'warm' || colour !== 'glow')) {
        const lamp = await this.tradfri.device(lampName);

        // debug(lamp);

        const setColour = await lamp.setColour(colour);

        if (setColour === true) {
          debug('Color set to xxx.');
        } else {
          debug('Didn\'t set color.');
        }
      } else {
        debug('Please define lamp name.');
      }
    } catch (err) {
      debug("ERROR:");
      debug(err);
    }
  }
}

module.exports = api;
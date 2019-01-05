#!/usr/bin/env node

const debug = require('debug')('tradfri-cli:index');
const api = require('./api');
const program = require('commander');

const app = async () => {
  program
    .version('0.0.1', '-v, --version')
    .usage('[options]')
    .option('-b, --brightness <percentage>', 'Set brightness of all lights', parseInt)
    .option('-t, --temp <color_temperature>', 'Set color temperature for all lights', /^(white|glow|warm)$/i, 'warm')
    .option('-off, --switchoff', 'Switch off all lights')
//    .option('-on, --switchon', 'Switch on all lights')
    .parse(process.argv);

  const myLamps = new api();

  await myLamps.connect();

  if (program.brightness) {
    // console.log('%j', program.brightness);
    await myLamps.setBrightness('Schreibtisch', program.brightness);
    await myLamps.setBrightness('Schrank', program.brightness);
  }

  if (program.temp && !program.switchoff) {
    // console.log('%j', program.temp);
    await myLamps.setColour('Schreibtisch', program.temp);
    await myLamps.setColour('Schrank', program.temp);
  }

  if (program.switchoff) {
    await myLamps.switchOff('Schrank');
    await myLamps.switchOff('Schreibtisch');
  }

  // if (program.switchoon) {
  //   await myLamps.switchOn('Schrank');
  //   await myLamps.switchOn('Schreibtisch');
  // }

  await myLamps.close();
};

app();
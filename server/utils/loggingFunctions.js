import clc from 'cli-color';
import dotenv from 'dotenv';

export function printMentorId(id) {
  console.log(`Current ${clc.yellow('Mentor')}: ${clc.greenBright(id)}`);
}

export function printUserSocket(isMentor, id) {
  isMentor
    ? console.log(`${clc.yellow('Mentor')} connected: ${clc.greenBright(id)}`)
    : console.log(`${clc.magenta('Student')} connected: ${clc.cyan(id)}`);
}

export function loadEnvVars() {
  const dotenvLoadResult = dotenv.config();
  if (dotenvLoadResult.parsed) {
    console.log('Environment variables loaded successfully.');
    return;
  }
  if (dotenvLoadResult.error) {
    throw dotenvLoadResult.error;
  }
  console.log('Environment variables not loaded.');
}

import clc from 'cli-color';

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
  if (dotenvLoadResult.error) {
    throw dotenvLoadResult.error;
  } else if (dotenvLoadResult.parsed) {
    console.log('Environment variables loaded successfully.');
  }
}

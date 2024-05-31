import clc from 'cli-color';

export function printMentorId(id) {
  console.log(`Current ${clc.yellow('Mentor')}: ${clc.greenBright(id)}`);
}

export function printUserSocket(isMentor, id) {
  isMentor
    ? console.log(`${clc.yellow('Mentor')} connected: ${clc.greenBright(id)}`)
    : console.log(`${clc.magenta('Student')} connected: ${clc.cyan(id)}`);
}

export const replaceMostStrWithAsterisks = (str) => {
  const firstChar = str[0];
  const lastChar = str[str.length - 1];
  return firstChar + '*'.repeat(str.length - 2) + lastChar;
};

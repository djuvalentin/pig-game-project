import roll1 from './imgs/dice-1.png';
import roll2 from './imgs/dice-2.png';
import roll3 from './imgs/dice-3.png';
import roll4 from './imgs/dice-4.png';
import roll5 from './imgs/dice-5.png';
import roll6 from './imgs/dice-6.png';

const dice = {
  roll1,
  roll2,
  roll3,
  roll4,
  roll5,
  roll6,
};

export default function (diceNumber) {
  const path = dice[`roll${diceNumber}`];
  return path;
}

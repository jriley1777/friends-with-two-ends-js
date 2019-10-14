import start from '../components/Processing/sketches/start';
import game from '../components/Processing/sketches/game';

const sketches = [
    start,
    game
]

export const getCurrentSketch = sketchIndex => {
    return sketches[sketchIndex]
};
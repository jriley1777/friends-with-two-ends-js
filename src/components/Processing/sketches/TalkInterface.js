
let general = [
    'ooOOoohh',
    'pretty...',
    'mine mine mine',
    'out of my way',
    'quit pushin',
    'hey hey',
    '#fun',
    'ball!',
    'my precious',
    'play nicely',
    'get me out of here',
    'have we started?',
    'what game is this',
    'hey who touched my butt?',
    'stranger danger',
    'hugs!',
    'TICKLE FIGHT!'
];

let friends = ['Joey', 'Chandler', 'Ross', 'Phoebe', 'Rachel', 'Monica'];
const getFriend = friends => {
    let i = Math.floor(Math.random() * friends.length);
    return friends[i];
}

let config = [
    'start?',
    'time to start?',
    'have we started?',
    'are we pretty yet?',
    'how\'s my figure?',
    `i like ${getFriend(friends)} better`,
    `i like ${getFriend(friends)} better`,
    `i like ${getFriend(friends)} better`,
    `${getFriend(friends)} is the worst`,
    `${getFriend(friends)}...ugh`,
    `two friends one end`
]

export const VOCABULARY_TYPES = {
    GENERAL: general,
    CONFIG: config
}

class TalkInterface {
    constructor(p) {
        this.p = p;
        this.sayings = [];
        this.currentSpeech = '';

        this.talkToggle = [];
        this.talkTimer = [];
        this.talkIndex = [];
        this.showMouseText = false;
    }

    setVocabulary(sayingArray){
        this.sayings = sayingArray;
    }

    setGroupSize(numTalkers){
        this.talkIndex = new Array(numTalkers);
        this.talkToggle = new Array(numTalkers);
        this.talkTimer = new Array(numTalkers);
        for (let i = 0; i < numTalkers; i++) {
            this.talkToggle[i] = false;
            this.talkTimer[i] = 0;
        }
    }

    getSaying(i=0){
        let saying = '';
        if (this.p.millis() - this.talkTimer[i] > 1000) {
            if (Math.random() > 0.99) {
                this.talkToggle[i] = !this.talkToggle[i];
                this.talkTimer[i] = this.p.millis();
                this.talkIndex[i] = null;
            }
        }
        if (this.talkToggle[i]) {
            if (!this.talkIndex[i] && this.talkIndex[i] !== 0) {
                this.talkIndex[i] = Math.floor(Math.random() * (this.sayings.length));
            }
            saying = this.sayings[this.talkIndex[i]];
        }
        if (this.showMouseText) {
            saying = 'MOUSE!!!!';
        }
        return saying;
    }

    talk(object, i=0) {
        let p = this.p;
        let saying = this.getSaying(i);
        if (saying) {
            p.textSize(20);
            p.stroke('rgba(0,0,0,0.3)');
            p.fill('rgba(255,255,255,0.3)');
            p.ellipse(object.head.x + 70, object.head.y - 70, 200, 80);
            p.ellipse(object.head.x + 60, object.head.y - 20, 50, 30);
            p.ellipse(object.head.x + 50, object.head.y, 20, 15);
            p.fill('#000');
            p.text(saying, object.head.x + 70, object.head.y - 70);
        }
    }


}

export default TalkInterface;
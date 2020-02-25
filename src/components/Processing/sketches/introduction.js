import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';
import Effect from './Effect';
import TalkInterface, { VOCABULARY_TYPES } from './TalkInterface';

export default function (p) {
    let w, h, margin;
    let physics = new VerletPhysics2D();
    let players = [];
    let sketchStart;
    let filmGrain;
    let talkInterface;
    let p1Talk, p2Talk;

    p.setup = function () {
        p.clear();
        sketchStart = p.millis();
        w = window.innerWidth;
        h = window.innerHeight / 100 * 94;
        margin = 40;

        p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);

        physics.setWorldBounds(new geom.Rect(margin, margin, w - margin * 2, h - margin * 2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);
        p.createPlayers();
        filmGrain = new Effect(p);
        talkInterface = new TalkInterface(p);
        talkInterface.setVocabulary(VOCABULARY_TYPES.GENERAL);
        talkInterface.setGroupSize(players.length);
    };

    p.getSaying = function() {
        let sayings = [
            `Am I one friend with two ends or two friends with one end?`,
            `I like travel, ice cream, and hanging with friends.`,
            `sup?`,
            `This one time I ate 40 hot dogs, you wouldn't believe it.`,
            `I came here to dance.`,
            `The earth is flat! The moon landing was a movie set!`,
            `Worm facts! A worm has no arms, legs or eyes.\n Oh yeah, what are these....`,
        ]
        return sayings[Math.floor(Math.random()*sayings.length)]
    }


    p.draw = function () {
        p.background('#dcd');
        p.updatePlayers();
        // p.background(255);
        p.textFont('Caveat Brush');
        let timer = p.millis() - sketchStart;
        p.stroke(255);
        p.strokeWeight(2);
        p.fill(10)
        p.textAlign(p.CENTER);
        if (timer < 2000) {
            p.textSize(100);
            p.text('Introducing...', w / 2, h / 2)
        }
        if (timer > 2000 && timer < 5000) {
            p.textSize(60);
            p.text(`Hi! I'm ${players[0].name}`, w / 2, h / 2 - 100);
            p.textSize(36);
            if (!p1Talk) {
                p1Talk = p.getSaying();
            }
            p.text(p1Talk, w / 2, h / 2)
            players[0].display();
        }
        if (timer > 5000 && timer < 6000) {
            p.textSize(100);
            p.text('vs...', w / 2, h / 2)
        }
        if (timer > 6000 && timer < 9000) {
            p.textSize(60);
            p.text(`Hi! I'm ${players[1].name}`, w / 2, h / 2 - 100);
            p.textSize(36);
            if (!p2Talk || p2Talk===p1Talk){
                p2Talk = p.getSaying();
            }
            if( p2Talk !== p1Talk ) {
                p.text(p2Talk, w / 2, h / 2);
            }
            players[1].display();
        }
        if (timer > 9000) {
            p.textSize(48);
            p.text('And now...', w / 2, h / 2 - 80)
            p.textSize(60);
            p.text('The ceremonial dance of friendship!', w / 2, h / 2)
            players.map(player => {
                player.display();
                player.dance();
                return null;
            })
        }
        if (timer > 12000) {
            p.textSize(48);
            p.text(`It is done.`, w / 2, h / 2 + 80);
        }
        if (timer > 14000) {
            if(p.props){
                p.props.changeRoute();
            }
        }
        if (Math.floor(p.millis()) % 3 === 0) {
            filmGrain.displayFilmGrain();
        }
        physics.update();
    };

    p.createPlayers = function () {
        players.push(PlayerFactory("", p.random(125), physics, p).create(200, h / 2, p.color('#fff')));
        players.push(PlayerFactory("", p.random(125), physics, p).create(w - 200, h / 2, p.color('#000')));
        players.map(x => {
            x.moveSpeed = 30;
            x.shouldDrawTrail = true;
            return x;
        })
    }

    p.updatePlayers = function () {
        if (p.props && p.props.players) {
            let p1 = p.props.players.find(x => x.playerId === 1);
            let p2 = p.props.players.find(x => x.playerId === 2);
            players[0].name = p1.attr.name;
            players[1].name = p2.attr.name;
            players[0].strokeWeight = p1.attr.big;
            players[1].strokeWeight = p2.attr.big;
            players[0].setNumParticles(p1.attr.tall);
            players[1].setNumParticles(p2.attr.tall);
        }
    }

}

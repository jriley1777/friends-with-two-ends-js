import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';
import { music } from '../../../utils/music';
import Ball from './Ball';
import Effect from './Effect';
import TalkInterface, { VOCABULARY_TYPES } from './TalkInterface';

export default function (p) {
    let w, h, margin;
    let physics = new VerletPhysics2D();
    let players;
    let teamLeft, teamRight;
    let scoreLeft, scoreRight;
    let ball;
    let sketchStart;
    let pMusic;
    let musicFile = music.config;
    let filmGrain;
    let talkInterface;

    p.playMusic = function() {
        pMusic.play();
    }

    p.setup = function () {
        sketchStart = p.millis();
        w = window.innerWidth;
        h = window.innerHeight/100 * 94;
        margin = 60;

        players = [];
        p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);
        teamLeft = p.color('#fff');
        teamRight = p.color('#000');
        scoreLeft = 0;
        scoreRight = 0;

        physics.setWorldBounds(new geom.Rect(margin, margin, w - margin * 2, h - margin * 2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);
        p.createPlayers();
        ball = new Ball(w / 2, h / 2, physics, p)
        filmGrain = new Effect(p);
        talkInterface = new TalkInterface(p);
        talkInterface.setGroupSize(players.length);
        talkInterface.setVocabulary(VOCABULARY_TYPES.CONFIG);
    };

    p.draw = function () {
        if (p.props && p.props.fetchMusic && !pMusic) {
            pMusic = p.loadSound(musicFile, p.playMusic)
        }
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawCourt();
        if (p.millis() - sketchStart > 1000) {
            p.drawPlayers();
            ball.display();
            p.updatePlayerNames();
            physics.update();
            if (scoreLeft >= (w - 2 * margin) || scoreRight >= (w - 2 * margin)) {
                p.setup();
            }
        }
        if (Math.floor(p.millis()) % 3 === 0) {
            filmGrain.displayFilmGrain();
        }
        
    };

    p.createPlayers = function () {
        players.push(PlayerFactory("", p.random(125), physics, p).create(200, h / 2, p.color('#fff')));
        players.push(PlayerFactory("", p.random(125), physics, p).create(w - 200, h / 2, p.color('#000')));
        players.map(x => {
            x.moveSpeed = 30;
            x.shouldDrawTTrail = true;
        })
    }

    p.updatePlayerNames = function () {
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

    p.drawCourt = function () {
        teamLeft.setAlpha(50);
        teamRight.setAlpha(50);
        p.fill('#dcd');
        p.noStroke();
        p.rect(0, 0, w, h);
        p.strokeWeight(1);
        p.stroke(0);
        p.fill(teamLeft);
        p.arc(w / 2, h / 2, w - (2 * margin), h, p.HALF_PI, p.PI + p.HALF_PI);
        p.fill(teamRight);
        p.arc(w / 2, h / 2, w - (2 * margin), h, -p.HALF_PI, p.HALF_PI);
        teamLeft.setAlpha(255);
        teamRight.setAlpha(255);
        p.fill(255);
        p.stroke(0);
        p.line(w / 2, 0, w / 2, h);
        p.strokeWeight(1);
        p.textSize(48);
        p.fill(0);
        p.textAlign(p.CENTER);
        p.stroke(255);
        p.text("Friends with Two Ends", w / 2, margin);
        p.textSize(36);
        p.text("Keep the ball on your side", w / 2, h-margin);
        p.text("WASD Keys", w / 8, h - margin);
        p.text("Arrow Keys", w / 1.15, h - margin);
    }

    p.drawPlayers = function () {
        p.textSize(36);
        players.map(friend => friend.display());
        let attractor;
        if(ball){
            attractor = ball;
        }
        if (attractor) {
            players.map((friend, i) => {
                talkInterface.talk(friend, i);
                return null;
            })
        }
    }

    p.keyPressed = function () {
        let p1 = players[0];
        let p2 = players[1];

        //p1
        if (p.key === 'a') {
            p1.moveLeft = true;
        }
        if (p.key === 'd') {
            p1.moveRight = true;
        }
        if (p.key === 'w') {
            p1.moveUp = true;
        }
        if (p.key === 's') {
            p1.moveDown = true;
        }
        //p2
        if (p.keyCode === p.LEFT_ARROW) {
            p2.moveLeft = true;
        }
        if (p.keyCode === p.RIGHT_ARROW) {
            p2.moveRight = true;
        }
        if (p.keyCode === p.UP_ARROW) {
            p2.moveUp = true;
        }
        if (p.keyCode === p.DOWN_ARROW) {
            p2.moveDown = true;
        }
    }

    p.keyReleased = function () {
        let p1 = players[0];
        let p2 = players[1];
        //p1
        if (p.key === 'a') {
            p1.moveLeft = false;
        }
        if (p.key === 'd') {
            p1.moveRight = false;
        }
        if (p.key === 'w') {
            p1.moveUp = false;
        }
        if (p.key === 's') {
            p1.moveDown = false;
        }

        //p2
        if (p.keyCode === p.LEFT_ARROW) {
            p2.moveLeft = false;
        }
        if (p.keyCode === p.RIGHT_ARROW) {
            p2.moveRight = false;
        }
        if (p.keyCode === p.UP_ARROW) {
            p2.moveUp = false;
        }
        if (p.keyCode === p.DOWN_ARROW) {
            p2.moveDown = false;
        }
    }
}

import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from '../classes/PlayerFactory';
import Ball from '../classes/Ball';
import Effect from '../classes/Effect';
import TalkInterface, { VOCABULARY_TYPES } from '../classes/TalkInterface';

export default function(p) {
    p.props = {};
    let w, h, margin;
    let physics = new VerletPhysics2D();
    let players = [];
    let ball, ballResetTime;
    let mouse, mouseBehavior;
    let didMouseStop;
    let mouseStopLength = 1000;
    let lastMouseMove = 0;
    let sketchStart;
    let filmGrain;
    let talkInterface;
    let hasAudioInitialized = false;

    p.setup = function() {
        p.clear();
        sketchStart = p.millis();
        ballResetTime = p.millis();
        w = window.innerWidth;
        h = window.innerHeight / 100 * 94;
        margin = 40;

        p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);

        physics.setWorldBounds(new geom.Rect(margin, margin, w-margin*2, h-margin*2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);
        p.createPlayers();
        filmGrain = new Effect(p);
        talkInterface = new TalkInterface(p);
        talkInterface.setVocabulary(VOCABULARY_TYPES.GENERAL);
        talkInterface.setGroupSize(players.length);
    };

    p.draw = function() {
        p.background('#dcd');
        p.textFont('Caveat Brush');
        p.drawPlayers();
        p.drawMouse();
        didMouseStop = p.millis() - mouseStopLength > lastMouseMove;
        if (didMouseStop) {
            mouse = null;
        }
        if (p.millis() - sketchStart < 3000) {
            for (let i = 0; i < players.length; i++) {
                players[i].dance();
            }
        } else {
            if (ball) {
                if (p.millis() - ballResetTime > 4000) {
                    p.resetBall();
                }
                ball.display();
            } else {
                ball = new Ball(w / 2, (h - h / 10), physics, p);
            }
        }
        physics.update();

        if (Math.floor(p.millis()) % 3 === 0) {
            filmGrain.displayFilmGrain();
        }
    };

    p.resetBall = function() {
        ballResetTime = p.millis();
        ball.changeLocation(p.random(w), p.random(h))
    }

    p.createPlayers = function() {
        for(let i=0; i<10; i++){
            let attr = {
                strokeWeight: p.random(10, 125),
                numParticles: Math.floor(p.random(40, 60))
            }
            players.push(PlayerFactory("", attr, physics, p).create(i* w/10, h-h/8, p.color(p.random(30,200))));
        }
    }

    p.mouseClicked = function() {
        if(ball){
            p.resetBall();
        }
    }

    p.mouseMoved = function() {
        lastMouseMove = p.millis();
        if(mouse) {
            physics.removeParticle(mouse);
            physics.removeBehavior(mouseBehavior);
        }
        mouse = new VerletParticle2D(new geom.Vec2D(p.mouseX, p.mouseY), 1);
        mouseBehavior = new behaviors.AttractionBehavior(mouse, 20, -0.001);
        physics.addBehavior(mouseBehavior);
        physics.addParticle(mouse);
    }

    p.drawMouse = function() {
        if(mouse) {
            let Color = p.color('#ff0000');
            p.stroke(Color);
            p.noFill();
            p.strokeWeight(0.25);
            p.ellipse(p.mouseX, p.mouseY, 100, 100);
            p.strokeWeight(0.5);
            p.ellipse(p.mouseX, p.mouseY, 75, 75);
            p.strokeWeight(0.75);
            p.ellipse(p.mouseX, p.mouseY, 50, 50);
            p.strokeWeight(1);
            p.ellipse(p.mouseX, p.mouseY, 25, 25);
        }
    }

    p.drawPlayers = function() {
        p.textSize(36);
        players.map(friend => friend.display());
        let attractor;
        talkInterface.showMouseText = false;
        if (ball) {
            if (mouse) {
                attractor = mouse;
                talkInterface.showMouseText = true;
            } else {
                attractor = ball;
                talkInterface.showMouseText = false;
            }
        }
        if(attractor){
            players.map((friend, i) => {
                talkInterface.talk(friend, i);
                if (friend.head) {
                    if (attractor.x > friend.head.x + 100) {
                        friend.moveRight = true;
                        friend.moveLeft = false;
                    }
                    if (attractor.x < friend.head.x - 100) {
                        friend.moveRight = false;
                        friend.moveLeft = true;
                    }
                    if (attractor.y < friend.head.y - 100) {
                        friend.moveUp = true;
                        friend.moveDown = false;
                    }
                    if (attractor.y > friend.head.y + 100) {
                        friend.moveUp = false;
                        friend.moveDown = true;
                    }
                }
                return null;
            })
        }
    }
}

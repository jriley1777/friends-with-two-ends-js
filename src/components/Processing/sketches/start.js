import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';
import { music } from '../../../utils/music';

export default function(p) {
    let w, h, margin;
    let physics = new VerletPhysics2D();
    let players = [];
    let ball, ballBehavior, ballResetTime;
    let mouse, mouseBehavior;
    let didMouseStop;
    let mouseStopLength = 1000;
    let lastMouseMove = 0;
    let talkIndex = new Array(players.length);
    let talkToggle = new Array(players.length);
    let talkTimer = new Array(players.length);
    let sketchStart;
    let pMusic;

    let verbs = [
        'ooOOoohh',
        'pretty...',
        'mine mine mine',
        'out of my way',
        'quit pushin',
        'hey hey',
        '#fun',
        'ball!',
        'my precious',
        'food?',
        'play nicely',
        'get me out of here',
        'have we started?',
        'what game is this',
        'hey who touched my butt?',
        'stranger danger',
        'hugs!'
    ];

    p.preload = function() {
        pMusic = p.loadSound(music.start)
    }

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

        p.createBall();
        p.createPlayers();
        for(let i=0;i<players.length;i++){
            talkToggle[i] = false;
            talkTimer[i] = 0;
        }
        pMusic.play();
    };

    p.draw = function() {
        p.background('#dcd');
        // p.background(255);
        p.textFont('Caveat Brush');
        if (p.millis() - sketchStart > 4000) {
            p.drawPlayers();
            p.drawMouse();
            didMouseStop = p.millis() - mouseStopLength > lastMouseMove;
            if (didMouseStop) {
                mouse = null;
            }
            if (p.millis() > 0 && p.millis() < 12000) {
                for (let i = 0; i < players.length; i++) {
                    players[i].dance();
                }
            } else {
                if (ball) {
                    p.drawBall();
                }
            }
            physics.update();
        }
        if (Math.floor(p.millis()) % 3 === 0) {
            p.applyFilmGrain();
        }
        p.resetBall();
    };

    p.applyFilmGrain = function () {
        p.loadPixels();
        p.pixelDensity(0.5);
        for (let i = 0; i < p.pixels.length; i += Math.floor(p.random(800))) {
            if (i % 10 === 0) {
                let color = p.color(255);
                p.pixels[i] = color;
                p.pixels[i + 1] = color;
                p.pixels[i + 2] = color;
                p.pixels[i + 3] = p.random(100, 200);
            }
        }
        p.updatePixels();
    }

    p.resetBall = function() {
        if(p.millis() - ballResetTime > 10000) {
            ballResetTime = p.millis();
            p.removeBall();
            p.createBall(p.random(w), p.random(h))
        }
    }

    p.removeBall = function() {
        physics.removeParticle(ball);
        physics.removeBehavior(ballBehavior);
    }

    p.createBall = function (x = w/2, y = (h-h/10)) {
        ball = new VerletParticle2D(new geom.Vec2D(x, y), 20);
        ballBehavior = new behaviors.AttractionBehavior(ball, 105, -0.001);
        physics.addBehavior(ballBehavior);
        physics.addParticle(ball);
    }

    p.drawBall = function () {
        let Color = p.color('rgb(255, 0, 0)');
        p.stroke('#000');
        p.fill(Color);
        p.strokeWeight(1);
        p.ellipse(ball.x, ball.y, 100, 100);
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
        p.removeBall();
        p.createBall();
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
            p.ellipse(mouse.x, mouse.y, 100, 100);
            p.strokeWeight(0.5);
            p.ellipse(mouse.x, mouse.y, 75, 75);
            p.strokeWeight(0.75);
            p.ellipse(mouse.x, mouse.y, 50, 50);
            p.strokeWeight(1);
            p.ellipse(mouse.x, mouse.y, 25, 25);
        }
    }

    p.talk = function(friend, i) {
        let saying = '';
        if(p.millis() - talkTimer[i] > 1000) {
            if(Math.random() > 0.99) {
                talkToggle[i] = !talkToggle[i];
                talkTimer[i] = p.millis();
                talkIndex[i] = null;
            }
        }
        if(talkToggle[i]) {
            if (!talkIndex[i] && talkIndex[i] !== 0) {
                talkIndex[i] = Math.floor(Math.random() * (verbs.length));
            }
            saying = verbs[talkIndex[i]];
        }
        if (mouse) {
            saying = 'MOUSE!!!!';
        }
        if(saying) {
            p.textSize(20);
            p.stroke('rgba(0,0,0,0.3)');
            p.fill('rgba(255,255,255,0.3)');
            p.ellipse(friend.head.x + 70, friend.head.y - 70, 200, 80);
            p.ellipse(friend.head.x + 60, friend.head.y - 20, 50, 30);
            p.ellipse(friend.head.x + 50, friend.head.y, 20, 15);
            p.fill('#000');
            p.text(saying, friend.head.x + 70, friend.head.y - 70);
        }
    }

    p.drawPlayers = function() {
        p.textSize(36);
        players.map(friend => friend.display());
        let attractor;
        if(mouse) {
            attractor = mouse;
        } else if(ball) {
            attractor = ball;
        }
        if(attractor){
            players.map((friend, i) => {
                p.talk(friend, i);
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

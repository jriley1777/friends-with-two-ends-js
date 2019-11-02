import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';

export default function(p) {
    let w, h, margin;
    const canvas = document.getElementById("app-p5_container");
    let physics = new VerletPhysics2D();
    let players = [];
    let ball, ballBehavior;
    let mouse, mouseBehavior;
    let didMouseStop;
    let mouseStopLength = 1000;
    let lastMouseMove = 0;
    let talkIndex = new Array(players.length);

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

    ]

    p.setup = function() {
        p.clear();
        w = window.innerWidth;
        h = canvas.offsetHeight;
        margin = 40;

        p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);

        physics.setWorldBounds(new geom.Rect(margin, margin, w-margin*2, h-margin*2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);

        p.createBall();
        p.createPlayers();
    };

    p.draw = function() {
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawPlayers();
        p.drawMouse();
        if(ball){
            p.drawBall();
        }
        physics.update();
        didMouseStop = p.millis() - mouseStopLength > lastMouseMove;
        if(didMouseStop) {
            mouse = null;
        }
    };

    p.createBall = function () {
        ball = new VerletParticle2D(new geom.Vec2D(w / 2, h / 2), 1);
        ballBehavior = new behaviors.AttractionBehavior(ball, 20, -0.0001)
        physics.addBehavior(ballBehavior);
        physics.addParticle(ball);
    }

    p.drawBall = function () {
        let Color = p.color('rgb(255, 212, 41)');
        p.stroke(Color);
        p.fill(Color);
        p.strokeWeight(1);
        p.ellipse(ball.x, ball.y, 100, 100);
    }

    p.windowResized = function () {
        p.resizeCanvas(window.innerWidth, canvas.offsetHeight);
    }

    p.createPlayers = function() {
        for(let i=0; i<10; i++){
            players.push(PlayerFactory("", p.random(125), physics, p).create(i, h, p.color(p.random(255), p.random(255), p.random(255))));
        }
    }

    p.mouseClicked = function() {
        physics.removeParticle(ball);
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
                p.textSize(20);
                if(!talkIndex[i]){
                    talkIndex[i] = Math.floor(Math.random() * verbs.length);
                }
                let saying = mouse ? 'MOUSE!!!' : verbs[talkIndex[i]];
                p.stroke('rgba(0,0,0,0.3)');
                p.fill('rgba(255,255,255,0.3)')
                p.ellipse(friend.head.x + 70, friend.head.y-70, 200, 80);
                p.ellipse(friend.head.x + 60, friend.head.y-20, 50, 30);
                p.ellipse(friend.head.x + 50, friend.head.y, 20, 15);
                p.fill('#000');
                p.text(saying, friend.head.x + 70, friend.head.y-70);
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

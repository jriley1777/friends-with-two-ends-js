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
    let ball;

    p.setup = function() {
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
        p.drawBall();
        physics.update();
    };

    p.createBall = function () {
        ball = new VerletParticle2D(new geom.Vec2D(w / 2, h / 2), 20);
        physics.addBehavior(new behaviors.AttractionBehavior(ball, 20, -0.0001));
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

    p.drawPlayers = function() {
        p.textSize(36);
        if(ball){
            players.map(friend => {
                if (friend.head) {
                    if (ball.x > friend.head.x + 100) {
                        friend.moveRight = true;
                        friend.moveLeft = false;
                    }
                    if (ball.x < friend.head.x - 100) {
                        friend.moveRight = false;
                        friend.moveLeft = true;
                    }
                    if (ball.y < friend.head.y - 100) {
                        friend.moveUp = true;
                        friend.moveDown = false;
                    }
                    if (ball.y > friend.head.y + 100) {
                        friend.moveUp = false;
                        friend.moveDown = true;
                    }
                }
                return friend.display()
            })
        }
    }
}

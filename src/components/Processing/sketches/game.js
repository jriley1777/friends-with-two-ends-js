import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';

export default function(p) {
    p.props = {};
    let w, h, margin;
    let ball;
    const canvas = document.getElementById("app-p5_container");
    let physics;
    let teamLeft, teamRight;
    let p1, p2;
    let p1AddParticles, p1RemoveParticles, p2AddParticles, p2RemoveParticles;
    let scoreToggle, scoreLeft, scoreRight;
    let maxPlayerSize = 45;
    let minPlayerSize = 35;

    p.preload = function(props) {
        p.soundFormats('mp3');
    }

    p.setup = function() {
        w = p.windowWidth;
        h = canvas.clientHeight;
        margin = 40;

        teamLeft = p.color('rgb(102, 204, 255)');
        teamRight = p.color('rgb(255, 153, 153)');
        scoreToggle = 0;
        scoreLeft = 0;
        scoreRight = 0;

        p.createCanvas(w, h);
        p.frameRate(120);

        physics = new VerletPhysics2D();
        physics.setWorldBounds(new geom.Rect(margin, margin, w-margin*2, h-margin*2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);

        p.createBall();
        p.createPlayers();
        p.createCenterGrav();
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, canvas.offsetHeight);
    }

    p.draw = function() {
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawCourt();
        p.drawPlayers();
        p.growPlayers();
        p.drawBall();
        p.drawScoreBoard();
        physics.update();
        p1.name = p.props && p.props.username ? p.props.username : p1.name;
        if (scoreLeft >= (w - 2 * margin) || scoreRight >= (w - 2 * margin)) {
            p.gameOver();
            scoreToggle = 3;
        }
        if (scoreToggle < 3) {
            if (scoreToggle > 0) {
                if (scoreToggle === 1) {
                    if (scoreLeft % 10 === 0) {
                        if (p1.particles.length > minPlayerSize) {
                            p1.removeParticle();
                        }
                        if (p2.particles.length < maxPlayerSize) {
                            p2.appendParticle();
                        }
                    }
                } else {
                    if (scoreRight % 10 === 0) {
                        if (p2.particles.length > minPlayerSize) {
                            p2.removeParticle();
                        }
                        if (p1.particles.length < maxPlayerSize) {
                            p1.appendParticle();
                        }
                    }
                }
            }
            if (ball.x < (w / 2) && scoreToggle !== 1) {
                scoreToggle = 1;
            } else if (ball.x > (w / 2) && scoreToggle !== 2) {
                scoreToggle = 2;
            }
        }
    };

    p.moveAI = function(player) {
        // player.moveRight = false;
        // player.moveLeft = false;
        // player.moveUp = false;
        // player.moveDown = false;
        // if (ball.x > player.head.x && ball.x > player.tail.x) {
        //     player.moveRight = true;
        //     // if(ball.y > player.head.y && ball.y < player.tail.y || 
        //     //     ball.y < player.head.y && ball.y > player.tail.y) {
        //     //     player.moveRight = true;
        //     //     player.moveLeft = false;
        //     // } else {
        //     //     player.moveRight = false;
        //     //     player.moveLeft = true;
        //     // }
        // }
    }

    p.createBall = function() {
        ball = new VerletParticle2D(new geom.Vec2D(w / 2, h / 2), 20);
        physics.addBehavior(new behaviors.AttractionBehavior(ball, 20, -0.0001));
        physics.addParticle(ball);
    }

    p.gameOver = function() {
        p.textSize(60);
        p.stroke(255);
        p.strokeWeight(2);
        p.fill(0);
        if (scoreLeft >= (w - 2 * margin)) {
            p1.Col = p.color(p.random(255), p.random(255), p.random(255));
            p.textAlign(p.CENTER);
            p.fill(0);
            p.text(`${p1.name} Wins!`, w / 2, h / 2);
        } else if (scoreRight >= (w - 2 * margin)) {
            p2.Col = p.color(p.random(255), p.random(255), p.random(255));
            p.textAlign(p.CENTER);
            p.fill(0);
            p.text(`${p2.name} Wins!`, w / 2, h / 2);
        }
    };

    p.createCenterGrav = function() {
        let weight = 500000;
        let topLeft = new VerletParticle2D(new geom.Vec2D(-10, -10), weight);
        let topRight = new VerletParticle2D(new geom.Vec2D(w, 0), weight);
        let bottomLeft = new VerletParticle2D(new geom.Vec2D(0, h), weight);
        let bottomRight = new VerletParticle2D(new geom.Vec2D(w, h), weight);
        let radius = 100;
        let repulsion = -1;
        physics.addBehavior(new behaviors.AttractionBehavior(topLeft, radius, repulsion));
        physics.addParticle(topLeft);
        physics.addBehavior(new behaviors.AttractionBehavior(topRight, radius, repulsion));
        physics.addParticle(topRight);
        physics.addBehavior(new behaviors.AttractionBehavior(bottomLeft, radius, repulsion));
        physics.addParticle(bottomLeft);
        physics.addBehavior(new behaviors.AttractionBehavior(bottomRight, radius, repulsion));
        physics.addParticle(bottomRight);
    }

    p.createPlayers = function() {
        p1 = PlayerFactory("Joe", p.random(125), physics, p).create(200, h / 2, p.color('rgb(41, 52, 255)'));
        p2 = PlayerFactory("Mali", p.random(125), physics, p).create(w - 200, h / 2, p.color('rgb(255, 41, 55)'));
    }

    p.drawPlayers = function() {
        p.textSize(36);
        p1.display();
        p2.display();
    }

    p.reset = function() {
        p.setup();
    }

    p.drawScoreBoard = function(){
        p.strokeWeight(1);
        p.textSize(48);
        p.fill(0);
        p.textAlign(p.CENTER);
        p.stroke(255);
        p.text("Friends with Two Ends", w / 2, margin);
        p.stroke(0);
        p.fill(teamLeft);
        p.text("Team Left", w / 6, margin);
        p.fill(teamRight);
        p.text("Team Right", (w * (5 / 6)), margin);
        //scores
        p.textSize(60);
        p.stroke(0);
        p.fill(teamLeft);
        p.text(p.round(scoreLeft / (w - 2 * margin) * 100), 2 * margin, margin);
        p.fill(teamRight);
        p.text(p.round(scoreRight / (w - 2 * margin) * 100), (w - 2 * margin), margin);
    }

    p.drawCourt = function() {
        teamLeft.setAlpha(50);
        teamRight.setAlpha(50);
        p.fill('#fff8e6');
        p.noStroke();
        p.rect(0, 0, w, h);
        p.strokeWeight(1);
        p.stroke(0);
        p.fill(teamLeft);
        p.arc(w / 2, h / 2, w - (2 * margin), h, p.HALF_PI, p.PI + p.HALF_PI);
        p.fill(teamRight);
        p.arc(w / 2, h/2, w - (2 * margin), h, -p.HALF_PI, p.HALF_PI);
        teamLeft.setAlpha(255);
        teamRight.setAlpha(255);
        p.scoreCalculator();
        p.fill(255);
        p.stroke(0);
        p.line(w / 2, 0, w / 2, h);
    }

    p.drawBall = function() {
        let Color = p.color('rgb(255, 212, 41)');
        p.stroke(Color);
        p.fill(Color);
        p.strokeWeight(1);
        p.ellipse(ball.x, ball.y, 100, 100);
    }

    p.scoreCalculator = function() {
        if (scoreToggle === 1 && scoreLeft <= (w - 2 * margin)) {
            scoreLeft += 2;
            if (scoreRight > 0) {
                scoreRight -= 1;
            }
        } else if (scoreToggle === 2 && scoreRight <= (w - 2 * margin)) {
            scoreRight += 2;
            if (scoreLeft > 0) {
                scoreLeft -= 1;
            }
        }
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        teamLeft.setAlpha(150);
        p.fill(teamLeft);
        p.arc(w / 2, h / 2, scoreLeft, h, p.HALF_PI, p.PI + p.HALF_PI);
        teamRight.setAlpha(150);
        p.fill(teamRight);
        p.arc(w / 2, h / 2, scoreRight, h, -p.HALF_PI, p.HALF_PI);
        teamLeft.setAlpha(255);
        teamRight.setAlpha(255);
    }

    p.growPlayers = function() {
        if (p1AddParticles) p1.appendParticle();
        if (p1RemoveParticles) p1.removeParticle();
        if (p2AddParticles) p2.appendParticle();
        if (p2RemoveParticles) p2.removeParticle();
    }

    p.keyPressed = function() {
        if (p.key === 'R') {
            p.reset();
        }

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
        if (p.key === 'e') {
            p1AddParticles = true;
        }
        if (p.key === 'q') {
            p1RemoveParticles = true;
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
        if (p.key === ',') {
            p2AddParticles = true;
        }
        if (p.key === '.') {
            p2RemoveParticles = true;
        }
    }

    p.keyReleased = function () {
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
        if (p.key === 'e') {
            p1AddParticles = false;
        }
        if (p.key === 'q') {
            p1RemoveParticles = false;
        }
        if (p.key === ',') {
            p2AddParticles = false;
        }
        if (p.key === '.') {
            p2RemoveParticles = false;
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

import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';
import { music } from '../../../utils/music';
import Effect from './Effect';
import Ball from './Ball';


export default function(p) {
    p.props = {};
    let w, h, margin;
    let ball;
    let physics;
    let teamLeft, teamRight;
    let p1, p2;
    let p1AddParticles, p1RemoveParticles, p2AddParticles, p2RemoveParticles;
    let scoreToggle, scoreLeft, scoreRight;
    let pMusic;
    let musicFile = music.game;
    let sketchStart;
    let filmGrain;

    p.playMusic = function () {
        pMusic.play();
    }

    p.setup = function() {
        sketchStart = p.millis();
        w = window.innerWidth;
        h = window.innerHeight / 100 * 94;
        margin = 60;

        teamLeft = p.color('rgb(255,255,255)');
        teamRight = p.color('rgb(0,0,0)');
        scoreToggle = 0;
        scoreLeft = 0;
        scoreRight = 0;

        p.createCanvas(w, h);
        p.frameRate(60);

        physics = new VerletPhysics2D();
        physics.setWorldBounds(new geom.Rect(margin, margin, w-margin*2, h-margin*2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);

        ball = new Ball(w/2, h/2, physics, p)
        p.createPlayers();
        if (!pMusic) {
            pMusic = p.loadSound(musicFile, p.playMusic)
        } else {
            pMusic.play();
        }
        filmGrain = new Effect(p);
    };

    p.draw = function() {
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawCourt();
        let timer = p.millis() - sketchStart;
        p.textSize(100);
        p.stroke(255);
        p.strokeWeight(2);
        p.fill(10)
        if (timer< 2000) {
            p.text('Ready?', w/2, h/2)
        }
        if (timer > 2000 && timer < 3000) {
            p.text('Set', w/2, h/2)
        }
        if (timer > 3000 && timer < 4000) {
            p.text('Go', w / 2, h / 2)
        }
        if (p.millis() - sketchStart > 4000) {
            p.drawPlayers();
            p.growPlayers();
            ball.display();
            physics.update();
            if (scoreLeft >= (w - 2 * margin) || scoreRight >= (w - 2 * margin)) {
                scoreToggle = 3;
                p.gameOver();
            }
            if (scoreToggle < 3) {
                if (ball.x < (w / 2) && scoreToggle !== 1) {
                    scoreToggle = 1;
                } else if (ball.x > (w / 2) && scoreToggle !== 2) {
                    scoreToggle = 2;
                }
            }
        }
        p.updatePlayerNames();
        p.drawScoreBoard();

        if(Math.floor(p.millis()) % 3 === 0) {
            filmGrain.displayFilmGrain();
        }
    };

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
        p1.dance();
        p2.dance();
        if(!p.props.gameOver) {
            p.props.gameOver = true;
        }
    };

    p.handleGameReset = function() {
        if(!!p.props.shouldReset) {
            p.removeElements();
            p.reset();
        }
    }

    p.createPlayers = function() {
        p1 = PlayerFactory('Player', p.random(125), physics, p).create(200, h / 2, teamLeft);
        p2 = PlayerFactory('AI', p.random(125), physics, p).create(w - 200, h / 2, teamRight);
        p1.shouldDrawTrail = true;
        p2.shouldDrawTrail = true;
    }

    p.updatePlayerNames = function() {
        if (p.props.players) {
            if (!p1.hasUpdatedName) {
                let p1Props = p.props.players.find(x => x.playerId === 1).attr;
                p1.name = p1Props.name;
                p1.strokeWeight = p1Props.big;
                p1.setNumParticles(p1Props.tall);
                p1.hasUpdatedName = true;
            }
            if (!p2.hasUpdatedName) {
                let p2Props = p.props.players.find(x => x.playerId === 2).attr;
                p2.name = p2Props.name;
                p2.strokeWeight = p2Props.big;
                p2.setNumParticles(p2Props.tall);
                p2.hasUpdatedName = true;
            }
        }
    }

    p.drawPlayers = function() {
        p.textSize(36);
        p1.display();
        p2.display();
    }

    p.reset = function() {
        p.setup();
        p.props.shouldReset = false;
        p.props.gameOver = false;
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
        p.text(p1.name, w / 8, margin);
        p.fill(teamRight);
        p.text(p2.name, w /1.15, margin);
        //scores
        p.textSize(60);
        p.stroke(0);
        p.fill(teamLeft);
        p.text(p.round(scoreLeft / (w - 2 * margin) * 100), w/2 - 2 * margin, 3 * margin);
        p.fill(teamRight);
        p.text(p.round(scoreRight / (w - 2 * margin) * 100), w/2 + 2 * margin, 3 * margin);
        p.textSize(36);
        p.stroke(255);
        p.text("Keep the ball on your side", w / 2, h - margin);
        p.text("WASD Keys", w / 8, h - margin);
        p.text("Arrow Keys", w / 1.15, h - margin);
    }

    p.drawCourt = function() {
        teamLeft.setAlpha(50);
        teamRight.setAlpha(50);
        p.fill('rgba(221, 204, 221, 0.75)');
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

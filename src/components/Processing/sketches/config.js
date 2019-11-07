import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';

export default function (p) {
    let w, h, margin;
    let canvas;
    let physics = new VerletPhysics2D();
    let players;
    let ball, ballBehavior;
    let mouse;
    let talkIndex, talkToggle, talkTimer;
    let teamLeft, teamRight;
    let scoreToggle, scoreLeft, scoreRight;

    let friends = ['Joey','Chandler','Ross','Phoebe','Rachel','Monica'];
    const getFriend = friends => {
        let i = Math.floor(Math.random() * friends.length);
        return friends[i];
    }

    let verbs = [
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

    p.setup = function () {
        p.clear();
        w = window.innerWidth;
        h = window.innerHeight/100 * 94;
        margin = 40;

        players = [];
        talkIndex = new Array(players.length);
        talkToggle = new Array(players.length);
        talkTimer = new Array(players.length);

        canvas = p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);
        teamLeft = p.color('#fff');
        teamRight = p.color('#000');
        scoreToggle = 0;
        scoreLeft = 0;
        scoreRight = 0;

        physics.setWorldBounds(new geom.Rect(margin, margin, w - margin * 2, h - margin * 2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);

        p.createBall();
        p.createPlayers();
        for (let i = 0; i < players.length; i++) {
            talkToggle[i] = false;
            talkTimer[i] = 0;
        }
    };

    p.draw = function () {
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawCourt();
        p.drawPlayers();
        p.updatePlayerNames();
        p.drawMouse();
        // if (ball) {
        //     p.drawBall();
        // }
        physics.update();
        if (scoreLeft >= (w - 2 * margin) || scoreRight >= (w - 2 * margin)) {
            p.setup();
            scoreToggle = 3;
        }
        if (scoreToggle < 3) {
            if (ball.x < (w / 2) && scoreToggle !== 1) {
                scoreToggle = 1;
            } else if (ball.x > (w / 2) && scoreToggle !== 2) {
                scoreToggle = 2;
            }
        }
        if (Math.floor(p.millis()) % 3 === 0) {
            p.applyFilmGrain();
        }
    };

    p.applyFilmGrain = function () {
        p.loadPixels();
        let d = p.pixelDensity(0.5);
        for (let i = 0; i < p.pixels.length; i += Math.floor(p.random(420))) {
            if (i % 4 === 0) {
                let color = p.color(255);
                p.pixels[i] = color;
                p.pixels[i + 1] = color;
                p.pixels[i + 2] = color;
                p.pixels[i + 3] = p.random(100, 200);
            }
        }
        p.updatePixels();
    }

    p.createBall = function () {
        ball = new VerletParticle2D(new geom.Vec2D(w / 2, h / 2), 1);
        ballBehavior = new behaviors.AttractionBehavior(ball, 20, -0.001)
        physics.addBehavior(ballBehavior);
        physics.addParticle(ball);
    }

    p.drawBall = function () {
        let Color = p.color('rgb(255, 0,0)');
        p.stroke('#000');
        p.fill(Color);
        p.strokeWeight(1);
        p.ellipse(ball.x, ball.y, 100, 100);
    }

    p.createPlayers = function () {
        players.push(PlayerFactory("", p.random(125), physics, p).create(200, h / 2, p.color('#fff')));
        players.push(PlayerFactory("", p.random(125), physics, p).create(w - 200, h / 2, p.color('#000')));
        players[0].moveSpeed = 10;
        players[1].moveSpeed = 10;
    }

    p.updatePlayerNames = function () {
        if (p.props && p.props.players) {
            let p1 = p.props.players.find(x => x.playerId === 1);
            let p2 = p.props.players.find(x => x.playerId === 2);
            players[0].name = p1.attr.name;
            players[1].name = p2.attr.name;
            players[0].strokeWeight = p1.attr.size;
            players[1].strokeWeight = p2.attr.size;
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
        p.scoreCalculator();
        p.fill(255);
        p.stroke(0);
        p.line(w / 2, 0, w / 2, h);
    }

    p.scoreCalculator = function () {
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

    p.drawMouse = function () {
        if (mouse) {
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

    p.talk = function (friend, i) {
        let saying = '';
        if (p.millis() - talkTimer[i] > 1000) {
            if (Math.random() > 0.99) {
                talkToggle[i] = !talkToggle[i];
                talkTimer[i] = p.millis();
                talkIndex[i] = null;
            }
        }
        if (talkToggle[i]) {
            if (!talkIndex[i] && talkIndex[i] !== 0) {
                talkIndex[i] = Math.floor(Math.random() * (verbs.length));
            }
            saying = verbs[talkIndex[i]];
        }
        if (mouse) {
            saying = 'MOUSE!!!!';
        }
        if (saying) {
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

    p.drawPlayers = function () {
        p.textSize(36);
        players.map(friend => friend.display());
        let attractor;
        if (mouse) {
            attractor = mouse;
        } else if (ball) {
            attractor = ball;
        }
        if (attractor) {
            players.map((friend, i) => {
                
                p.talk(friend, i);
                // if (friend.head) {
                //     if (attractor.x > friend.head.x + 100) {
                //         friend.moveRight = true;
                //         friend.moveLeft = false;
                //     }
                //     if (attractor.x < friend.head.x - 100) {
                //         friend.moveRight = false;
                //         friend.moveLeft = true;
                //     }
                //     if (attractor.y < friend.head.y - 100) {
                //         friend.moveUp = true;
                //         friend.moveDown = false;
                //     }
                //     if (attractor.y > friend.head.y + 100) {
                //         friend.moveUp = false;
                //         friend.moveDown = true;
                //     }
                // }
                return null;
            })
        }
    }
}

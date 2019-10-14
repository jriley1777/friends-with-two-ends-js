import VerletPhysics2D from 'toxiclibsjs/physics2d/VerletPhysics2D';
import * as behaviors from 'toxiclibsjs/physics2d/behaviors';
import * as geom from 'toxiclibsjs/geom';
import PlayerFactory from './PlayerFactory';

export default function(p) {
    let w, h, margin;
    const canvas = document.getElementById("app-p5_container");
    let physics = new VerletPhysics2D();
    let players = [];

    p.setup = function() {
        w = canvas.offsetWidth;
        h = canvas.offsetHeight;
        margin = 40;

        p.createCanvas(w, h);
        p.frameRate(120);
        p.background(255);

        physics.setWorldBounds(new geom.Rect(margin, margin, w-margin*2, h-margin*2));
        physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
        physics.setDrag(0.15);

        p.createPlayers();
    };

    p.draw = function() {
        p.background(255);
        p.textFont('Caveat Brush');
        p.drawPlayers();
        physics.update();
    };

    p.createPlayers = function() {
        for(let i=0; i<10; i++){
            players.push(PlayerFactory("", p.random(125), physics, p).create(i, h, p.color(p.random(255), p.random(255), p.random(255))));
        }
    }

    p.drawPlayers = function() {
        p.textSize(36);
        players.map(friend => {
            if (friend.head) {
                if (p.mouseX > friend.head.x + 100) {
                    friend.moveRight = true;
                    friend.moveLeft = false;
                } 
                if (p.mouseX < friend.head.x - 100) {
                    friend.moveRight = false;
                    friend.moveLeft = true;
                }
                if (p.mouseY < friend.head.y - 100) {
                    friend.moveUp = true;
                    friend.moveDown = false;
                }
                if (p.mouseY > friend.head.y + 100) {
                    friend.moveUp = false;
                    friend.moveDown = true;
                }
            }
            friend.display()
        })
    }
}

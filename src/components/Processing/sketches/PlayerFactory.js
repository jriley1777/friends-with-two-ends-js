import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import AttractionBehavior2D from 'toxiclibsjs/physics2d/behaviors/AttractionBehavior';
import VerletSpring2D from 'toxiclibsjs/physics2d/VerletSpring2D';
import * as geom from 'toxiclibsjs/geom';
import firebase from '../../../utils/firebase';

const defaultAtributes = {
    numParticles: 60,
    strokeWeight: 50
}

const PlayerFactory = (name, attr=defaultAtributes, physics, p) => {
    const player = {}
    player.particleArray = [];
    player.numArrays = 5;
    player.name = name;
    player.hasUpdatedName = false;
    player.numParticles = attr.numParticles || 60; //p.floor(p.random(100));
    player.minParticles = 20;
    player.maxParticles = 200;
    player.len = 1;
    player.strength = 0.225;
    player.particles = Array.apply(null, Array(player.numParticles));
    player.particleBehaviors = Array.apply(null, Array(player.numParticles));
    player.springs = Array.apply(null, Array(player.numParticles));
    player.hasCreated = false;
    player.Col = "#000";
    player.create = (startX, startY, color = player.Col) => {
        player.particles.map((x, i) => {
            let particle = new VerletParticle2D(new geom.Vec2D(startX, startY + i * player.len - (player.numParticles * player.len) / 2), 20);
            player.particles[i] = particle;
            physics.addParticle(particle);
            let particleBehavior = new AttractionBehavior2D(particle, 60, -0.2);
            player.particleBehaviors[i] = particleBehavior;
            physics.addBehavior(particleBehavior);
            if (i > 0) {
                let previous = player.particles[i-1];
                let spring = new VerletSpring2D(particle, previous, player.len, player.strength);
                physics.addSpring(spring);
                player.springs[i] = spring;
            }
            return null;
        })
        player.Col = color;
        player.hasCreated = true;
        return player;
    }
    player.setNumParticles = (num=player.numParticles) => {
        let numPart = num - player.numParticles;
        if(numPart > 0) {
            player.appendParticle(numPart);
        } else {
            player.removeParticle(Math.abs(numPart));
        }
    }
    player.appendParticle = (num=1) => {
        for (let i = 0; i < num; i++) {
            if ( player.numParticles < player.maxParticles ) {
                player.numParticles += 1;
                let lastParticle = player.particles[player.particles.length - 1];
                let particle = new VerletParticle2D(new geom.Vec2D(lastParticle.x, lastParticle.y), 20);
                player.particles.push(particle);
                physics.addParticle(particle);
                let particleBehavior = new AttractionBehavior2D(particle, 60, -0.2);
                player.particleBehaviors.push(particleBehavior)
                physics.addBehavior(particleBehavior);
                let spring = new VerletSpring2D(particle, lastParticle, player.len, player.strength);
                physics.addSpring(spring);
                player.springs.push(spring);
            }
        }
    }
    player.removeParticle = (num=1) => {
        for(let i=0;i<num;i++){
            if (player.numParticles > player.minParticles) {
                player.numParticles -= 1;
                let lastParticle = player.particles[player.particles.length - 1];
                let lastParticleBehavior = player.particleBehaviors[player.particleBehaviors.length - 1];
                let lastSpring = player.springs[player.springs.length - 1];
                physics.removeParticle(lastParticle);
                physics.removeSpring(lastSpring);
                physics.removeBehavior(lastParticleBehavior)
                player.particles.pop();
                player.particleBehaviors.pop();
                player.springs.pop();
            }
        }
    }
    player.head = player.particles[0];
    player.tail = player.particles[player.numParticles-1];
    player.mid = player.particles[24];
    player.updateBody = function() {
        player.head = player.particles[0];
        player.tail = player.particles[player.numParticles-1];
        player.mid = player.particles[Math.floor(player.numParticles)];
    }
    player.endMouth = p.random(p.PI+p.QUARTER_PI);
    player.strokeWeight = attr.strokeWeight || 50;
    player.sz = 40;
    player.moveToggle = true;
    player.toggleTime = 0;
    player.dance = function (toggle=500) {
        if (p.millis() - toggle > player.toggleTime) {
            player.moveToggle = !player.moveToggle;
            player.toggleTime = p.millis();
        }
        if (player.moveToggle) {
            player.moveLeft = true;
            player.moveUp = false;
            player.moveDown = false;
            player.moveRight = false;
        } else {
            player.moveLeft = false;
            player.moveUp = false;
            player.moveDown = false;
            player.moveRight = true;
        }
    }
    player.drawHUD = function (head) {
        p.textSize(36);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.stroke(255);
        p.text(player.name, head.x, head.y - player.sz);
    }
    player.drawBody = function() {
        p.noFill();
        p.stroke(player.Col);
        p.strokeWeight(player.strokeWeight);
        p.smooth();
        p.beginShape();
        player.particles.map(particle => {
            p.curveVertex(particle.x, particle.y);
            return null;
        })
        p.endShape();
        p.strokeWeight(50);
    }
    player.img = null;
    player.img2 = null;
    player.drawFaceCapture = (img) => {
        if(!player.img && img) {
           
            player.img = styleDiv(p.createDiv());
            // player.img2 = styleDiv(p.createDiv());
            // player.img.parent(x);
            function styleDiv(x) {
               x.style("height", `${player.strokeWeight}px`);
               x.style("width", `${player.strokeWeight*0.6875}px`);
               x.style("border-radius", "50%");
               x.style("position", "absolute");
               x.style(
                 "background",
                 `url(${img}) no-repeat 47% 33%`
               );
               x.style("background-size", `${player.strokeWeight*3.8}px ${player.strokeWeight*1.96}px`); 
               return x;
            }
        } else {
            player.img.position(
              player.particles[0].x - (player.strokeWeight * 0.6875)/2,
              player.particles[0].y - player.strokeWeight / 2
            );
            // player.img2.position(
            //   player.particles[player.particles.length - 1].x -
            //     (player.strokeWeight * 0.6875)/2,
            //   player.particles[player.particles.length - 1].y -
            //     player.strokeWeight / 2
            // );
        }
    }
    player.shouldDrawTrail = false;
    player.drawTrail = function() {
        let trailStrokeWeight = player.strokeWeight/2;
        player.particleArray.map((x, i) => {
            p.noFill();
            p.stroke(p.color(p.random(255), p.random(255), p.random(255), 1/(player.numArrays-(i+1)) * 255));
            p.strokeWeight(trailStrokeWeight);
            p.beginShape();
            x.map(particle => {
                p.curveVertex(particle.x, particle.y);
                return null;
            })
            p.endShape();
            // p.strokeWeight(50);
        })
    }
    player.eyeSize = 15;
    player.drawEyes = function(head, tail) {
        //eyes
        p.strokeWeight(1);
        p.stroke(0);
        p.fill(255);
        p.ellipse(head.x + player.eyeSize, head.y, player.sz, player.sz);
        p.ellipse(head.x - player.eyeSize, head.y, player.sz, player.sz);
        p.ellipse(tail.x + player.eyeSize, tail.y, player.sz, player.sz);
        p.ellipse(tail.x - player.eyeSize, tail.y, player.sz, player.sz);
        // p.line(head.x - 35, head.y, head.x + 35, head.y);
        // p.arc(tail.x, tail.y, player.sz, player.sz, 0, player.endMouth);

        //pupils
        p.strokeWeight(1);
        p.stroke(0);
        p.fill(0);
        p.ellipse(head.x + 10, head.y, 1, 3);
        p.ellipse(head.x - 10, head.y, 1, 3);
        p.ellipse(tail.x + 10, tail.y, 1, 3);
        p.ellipse(tail.x - 10, tail.y, 1, 3);
    }
    player.drawMouth = function(head, tail) {
        //mouth
        p.stroke(0);
        p.fill(0);
        p.arc(head.x, head.y + 20, 10, 10, 0, player.endMouth);
        p.arc(tail.x, tail.y + 20, 10, 10, 0, player.endMouth);
    }
    player.moveLeft = false;
    player.moveRight = false;
    player.moveUp = false;
    player.moveDown = false;
    player.moveSpeed = 30;
    player.move = function() {
        let head = player.head;
        let tail = player.tail;
        if(player.moveLeft){
            head.x = head.x - player.moveSpeed;
            tail.x = tail.x - player.moveSpeed;
        }
        if (player.moveRight) {
            head.x = head.x + player.moveSpeed;
            tail.x = tail.x + player.moveSpeed;
        }
        if (player.moveUp) {
            head.y = head.y - player.moveSpeed;
            tail.y = tail.y - player.moveSpeed;
        }
        if (player.moveDown) {
            head.y = head.y + player.moveSpeed;
            tail.y = tail.y + player.moveSpeed;
        }
    };
    player.display = (userImage=null) => {
        if (player.hasCreated) {
            player.head = player.particles[0];
            player.tail = player.particles[player.numParticles - 1];
            player.mid = player.particles[Math.floor((player.numParticles - 1)/2)];

            if (player.particleArray.length > player.numArrays) {
                player.particleArray.shift();
            }
            player.particleArray.push(player.particles.map(x => {
                return { x: x.x, y: x.y}
            }));

            //body
            p.stroke('#000');
            if(player.shouldDrawTrail){
                player.drawTrail();
            }
            player.drawBody();
            if (userImage) {
              player.drawFaceCapture(userImage);
            } else {
              player.drawEyes(player.head, player.tail);
              player.drawMouth(player.head, player.tail);
            }
            player.drawHUD(player.head);
            player.move();
        }
    }
    return player;
}

export default PlayerFactory;
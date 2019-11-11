import VerletParticle2D from 'toxiclibsjs/physics2d/VerletParticle2D';
import AttractionBehavior2D from 'toxiclibsjs/physics2d/behaviors/AttractionBehavior';
import * as geom from 'toxiclibsjs/geom';

let defaultConfig = {
    sz: 100,
    fillColor: 'rgb(255, 0, 0)',
    strokeColor: '#000',
    strokeWeight: 1,
    weight: 20,
    radius: 105,
    strength: -0.001
}

class Ball {
    constructor(x, y, physics, p, config=defaultConfig) {
        this.config = config;
        this.p = p;
        this.physics = physics;
        this.addPhysics(x, y);
    }
    changeLocation = function(x,y) {
        this.removePhysics();
        this.addPhysics(x, y);
    }
    addPhysics = function(x, y) {
        this.particle = new VerletParticle2D(new geom.Vec2D(x, y), this.config.weight);
        this.behavior = new AttractionBehavior2D(this.particle, this.config.radius, this.config.strength);
        this.physics.addBehavior(this.behavior);
        this.physics.addParticle(this.particle);
        this.x = this.particle.x;
        this.y = this.particle.y;
    }
    removePhysics = function () {
        this.physics.removeBehavior(this.behavior);
        this.physics.removeParticle(this.particle);
    }
    display = function() {
        this.x = this.particle.x;
        this.y = this.particle.y;
        this.p.stroke(this.p.color(this.config.strokeColor));
        this.p.fill(this.p.color(this.config.fillColor));
        this.p.strokeWeight(this.config.strokeWeight);
        this.p.ellipse(this.particle.x, this.particle.y, this.config.sz, this.config.sz);
    }
};

export default Ball;
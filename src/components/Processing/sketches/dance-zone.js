import VerletPhysics2D from "toxiclibsjs/physics2d/VerletPhysics2D";
import * as behaviors from "toxiclibsjs/physics2d/behaviors";
import * as geom from "toxiclibsjs/geom";
import PlayerFactory from "../classes/PlayerFactory";
import Effect from "../classes/Effect";
import TalkInterface, { VOCABULARY_TYPES } from "../classes/TalkInterface";

export default function(p) {
  let w, h, margin;
  let physics = new VerletPhysics2D();
  let players = [];
  let filmGrain;
  let talkInterface;

  p.setup = function() {
    p.clear();
    w = window.innerWidth;
    h = (window.innerHeight / 100) * 94;
    margin = 40;

    p.createCanvas(w, h);
    p.frameRate(120);
    p.background(255);

    physics.setWorldBounds(
      new geom.Rect(margin, margin, w - margin * 2, h - margin * 2)
    );
    physics.addBehavior(new behaviors.GravityBehavior(new geom.Vec2D(0, 0)));
    physics.setDrag(0.15);
    p.createPlayers();
    filmGrain = new Effect(p);
    talkInterface = new TalkInterface(p);
    talkInterface.setVocabulary(VOCABULARY_TYPES.GENERAL);
    talkInterface.setGroupSize(players.length);
  };

  p.draw = function() {
    p.background(245)
    p.textFont("Caveat Brush");
    if(p.props){
      players.map(friend => friend.display(p.props.userImage));
    }

    for (let i = 0; i < players.length; i++) {
      players[i].dance(p.random(200, 800));
    }
    physics.update();
    if (Math.floor(p.millis()) % 3 === 0) {
      filmGrain.displayFilmGrain();
    }
  };

  p.createPlayers = function() {
    for (let i = 0; i < 20; i++) {
      let attr = {
        strokeWeight: Math.floor(p.random(50, 160)),
        numParticles: Math.floor(p.random(20, 40))
      };
      players.push(
        PlayerFactory("", attr, physics, p).create(
          p.random(w),
          p.random(h),
          p.color(p.random(30, 200),p.random(30, 200),p.random(30, 200))
        )
      );
    }
  };  

}
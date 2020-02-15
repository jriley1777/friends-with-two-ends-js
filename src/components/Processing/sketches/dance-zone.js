import VerletPhysics2D from "toxiclibsjs/physics2d/VerletPhysics2D";
import VerletParticle2D from "toxiclibsjs/physics2d/VerletParticle2D";
import * as behaviors from "toxiclibsjs/physics2d/behaviors";
import * as geom from "toxiclibsjs/geom";
import PlayerFactory from "./PlayerFactory";
import { music } from "../../../utils/music";
import Effect from "./Effect";
import TalkInterface, { VOCABULARY_TYPES } from "./TalkInterface";

export default function(p) {
  let w, h, margin;
  let physics = new VerletPhysics2D();
  let players = [];
  let ball, ballResetTime;
  let mouse, mouseBehavior;
  let didMouseStop;
  let mouseStopLength = 1000;
  let lastMouseMove = 0;
  let sketchStart;
  let pMusic;
  let musicFile = music.danceZone;
  let showPlayersTime;
  let filmGrain;
  let talkInterface;

  p.setup = function() {
    p.clear();
    sketchStart = p.millis();
    ballResetTime = p.millis();
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
    pMusic = p.loadSound(musicFile, p.playMusic);
    filmGrain = new Effect(p);
    talkInterface = new TalkInterface(p);
    talkInterface.setVocabulary(VOCABULARY_TYPES.GENERAL);
    talkInterface.setGroupSize(players.length);
    showPlayersTime = 2000;
  };

  p.playMusic = function() {
    pMusic.play();
  };

  p.draw = function() {
      if (p.millis() % 1 === 0) {
        p.background(p.random(255), p.random(255), p.random(255))
      }
      p.background(p.random(255), p.random(255), p.random(255))
    // p.background("#dcd");

    // p.background(255);
    p.textFont("Caveat Brush");
    players.map(friend => friend.display());

    for (let i = 0; i < players.length; i++) {
      players[i].dance(p.random(400, 500));
    }
    physics.update();
    if (Math.floor(p.millis()) % 3 === 0) {
      filmGrain.displayFilmGrain();
    }
  };

  p.resetBall = function() {
    ballResetTime = p.millis();
    ball.changeLocation(p.random(w), p.random(h));
  };

  p.createPlayers = function() {
    for (let i = 0; i < 30; i++) {
      let attr = {
        strokeWeight: p.random(50, 125),
        numParticles: Math.floor(p.random(20, 30))
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

  p.mouseMoved = function() {
    talkInterface.showMouseText = true;
    players.map((friend, i) => {
        talkInterface.talk(friend, i);
    })
  };

  
}
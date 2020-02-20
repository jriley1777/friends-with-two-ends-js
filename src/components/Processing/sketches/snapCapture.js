
export default function(p) {
  let w, h;
  let capture;
  let canvas;
  p.props = {};

  p.setup = function() {
    w = 640;
    h = 480;

    canvas = p.createCanvas(w, h);
    p.frameRate(30);
    p.background(255);
    capture = p.createCapture(p.VIDEO);
    capture.size(640,480);
    capture.hide();

  };

  p.draw = function() {
    p.background("#dcd");
    p.translate(w,0);
    p.scale(-1.0, 1.0);
    p.image(capture, 0, 0, 640, 480);
    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();
    p.ellipse(320, 240, 240, 320);
    if(p.props.shouldCapture){
        p.saveFace();
    }
  }

  p.saveFace = async function() {
      p.props.setShouldCapture(false);
      canvas.canvas.toBlob(blob => {
        p.props.handleImageUpload(blob);
      })
      p.props.closeModal();
  }
}

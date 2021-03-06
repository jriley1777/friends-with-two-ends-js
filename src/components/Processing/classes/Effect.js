

class Effect {
    constructor(p){
        this.p = p;
        this.filmConfig = {
            pixelDensity: 0.5,
        }
    }

    displayFilmGrain(config=this.filmConfig){
        let p = this.p;
        p.loadPixels();
        p.pixelDensity(config.pixelDensity);
        for (let i = 0; i < p.pixels.length; i += Math.floor(p.random(800))) {
            if (i % 8 === 0) {
                let color = 50;
                p.pixels[i] = color;
                p.pixels[i + 1] = color;
                p.pixels[i + 2] = color;
                p.pixels[i + 3] = 230;
            }
        }
        p.updatePixels();
    }
}

export default Effect;
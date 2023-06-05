import { Application, BlurFilter, Container, Sprite } from 'pixi.js'

const app = new Application({
    resolution: 1,
    backgroundColor: 0x6495ed,
    width: 720,
    height: 1280
});
document.body.appendChild(app.view);

var container = new Container()
container.x = 200;
container.y = 200;
app.stage.addChild(container)

var clampy = Sprite.from("../assets/images/clampy.png");
clampy.x = 100;
clampy.y = 100;
container.addChild(clampy);
// Make your filter
var myBlurFilter = new BlurFilter();

// Add it to the `.filters` array of any DisplayObject
container.filters = [myBlurFilter];

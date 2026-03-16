// Like2D v2.4.0 Starter - Simple scene pattern with built-in startup screen
import {
  SceneRunner,
  StartupScene,
  type Scene,
  ImageHandle,
} from "like2d/scene";

// Main game scene
class GameScene implements Scene {
  private image: ImageHandle | null = null;
  private runner: SceneRunner;

  constructor(runner: SceneRunner) {
    this.runner = runner;
  }

  load(): void {
    this.image = this.runner.graphics.newImage("pepper.png");
    this.runner.graphics.setBackgroundColor([0.1, 0.1, 0.15, 1]);
  }

  draw(): void {
    const mousePos = this.runner.mouse.getPosition();
    this.runner.graphics.print("white", "Like2D v2.4.0", [20, 20]);
    if (this.image?.isReady()) {
      this.runner.graphics.draw(this.image, mousePos);
    }
  }
}

// Initialize
const container = document.getElementById("game-container")!;
const runner = new SceneRunner(container);
runner.setMode({ pixelResolution: [800, 600] });

const gameScene = new GameScene(runner);

// Create startup scene with built-in default draw (no custom draw function)
const startupScene = new StartupScene(
  runner.graphics,
  { nextScene: gameScene },
  () => {
    console.log("Game started!");
    runner.setScene(gameScene);
  }
);

// Fullscreen button handler
document.getElementById("fullscreen-btn")?.addEventListener("click", () => {
  const mode = runner.getMode();
  runner.setMode({ fullscreen: !mode.fullscreen });
});

// Start with the startup screen
await runner.start(startupScene);

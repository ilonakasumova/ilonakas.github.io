import {
  Application,
  Assets,
  Ticker,
  Container,
  Texture,
  Sprite,
  BitmapText
} from './pixi.mjs';


(async () => {
  const app = new Application();
  
  const APP_WIDTH = 300;
  const APP_HEIGHT = 600;
  const CELL_SIZE = 81;
  const GRID_SIZE_HORIZONTAL = 3;
  const GRID_SIZE_VERTICAL = 3;

  await app.init({ background: '#FFFFFF', width: APP_WIDTH, height: APP_HEIGHT, hello: false});

  document.body.appendChild(app.canvas);
  
  await Assets.load([
    '../sprites/topText.png',
    '../sprites/bottomText.png',
    '../sprites/icon.png',
    '../sprites/finger.png',
    '../sprites/ring1.png',
    '../sprites/ring2.png',
    '../sprites/ring3.png',
    '../sprites/ring4.png',
    '../sprites/earrings2.png',
    '../sprites/earrings1.png',
    '../sprites/earrings3.png',
    '../sprites/end.png',
    '../sprites/white.png',
    '../sprites/grid.png',
    '../sprites/promoBtn.png'
  ]);
  
  const moveTextures = [
    Texture.from('../sprites/ring1.png'),
    Texture.from('../sprites/earrings1.png'),
    Texture.from('../sprites/ring2.png'),
    Texture.from('../sprites/earrings2.png'),
    Texture.from('../sprites/ring3.png'),
    Texture.from('../sprites/earrings3.png'),
    Texture.from('../sprites/ring4.png'),
    Texture.from('../sprites/earrings1.png'),
    Texture.from('../sprites/ring1.png')
  ]
  
  Assets.addBundle('fonts', [
    { alias: 'Sokolov', src: '../fonts/sokolov.woff' },
  ]);

  await Assets.loadBundle('fonts');
  
  const backgroundTexture = Texture.from('../sprites/white.png')
  backgroundTexture.source.scaleMode = 'nearest';
  const backgroundImage = new Sprite(backgroundTexture);
  backgroundImage.anchor.set(0.5);
  backgroundImage.y = APP_HEIGHT /2
  backgroundImage.x = APP_WIDTH / 2;
  app.stage.addChild(backgroundImage);

  const endTexture = Texture.from('../sprites/end.png');
  endTexture.source.scaleMode = 'nearest';
  const endImage = new Sprite(endTexture);
  const endContainer = new Container();
  endContainer.addChild(endImage);
  endContainer.alpha = 0;

  const endTimer = new BitmapText({
      text: '43',
      style: {
          fontFamily: 'Sokolov',
          fontSize: 24,
          fill: 'white',
          align: 'center',
      }
  });
  endTimer.anchor.set(0.5);
  endTimer.x = APP_WIDTH / 2;
  endTimer.y = 420;
  endContainer.addChild(endTimer);
  
  function startTimer(num) {
    const timerTicker = new Ticker;
    timerTicker.start();
    
    let totalMS = 0;
    let totalS = 0;

    timerTicker.add(() => {
      totalMS += timerTicker.elapsedMS;
      totalS = Math.floor(totalMS / 1000);
      if (totalS <= num) {
        if (endTimer.text != num - totalS) {
          endTimer.text = num - totalS;
        }
      } else {
        timerTicker.destroy();
      }
    });
  }
  
  const promoBtnTexture = Texture.from('../sprites/promoBtn.png');
  promoBtnTexture.source.scaleMode = 'linear';
  const promoBtn = new Sprite(promoBtnTexture);
  promoBtn.anchor.set(0.5);
  promoBtn.y = APP_HEIGHT * 10 / 12;
  promoBtn.x = APP_WIDTH / 2;
  promoBtn.width = 237;
  promoBtn.height = 50;
  endContainer.addChild(promoBtn);

  function showBanner() {
    endContainer.eventMode = 'static';
    endContainer.cursor = 'pointer';
    endContainer.on('pointerdown', onClickEnd);
    app.stage.addChild(endContainer);
    fadeIn(endContainer, 120, null, 90);
    startTimer(17);
    promoBtn.loopSizeAnim = true;
    bumpSize(promoBtn, 1.05);
  }
  
  function onClickEnd() {
    document.getElementById("click_area").href = yandexHTML5BannerApi.getClickURLNum(1); 
  }
  
  for (let i = 0; i < moveTextures.length; i++) {
    moveTextures[i].source.scaleMode = 'nearest';
  }

  const cellTexture = Texture.from('../sprites/grid.png')

  const gridTexture = Texture.from('../sprites/grid.png');
  gridTexture.source.scaleMode = 'nearest';
  const gridImage = new Sprite(gridTexture);
  gridImage.anchor.set(0.5);
  gridImage.x = APP_WIDTH / 2;
  gridImage.y = APP_HEIGHT / 2;
  
  gridImage.alpha = 0;
  app.stage.addChild(gridImage);

  const topTextTexture = Texture.from('../sprites/topText.png');
  topTextTexture.source.scaleMode = 'nearest';
  const topText = new Sprite({
      texture: topTextTexture
    });
  topText.anchor.set(0.5); 
  topText.x = (APP_WIDTH / 2);
  topText.y = (APP_HEIGHT / 12) * 2;
  topText.width = 244;
  topText.height = 71;
  topText.scale.x = topText.scale.y = 1;
  app.stage.addChild(topText);
  topText.alpha = 0
  const bottomTextTexture = Texture.from('../sprites/bottomText.png');
  bottomTextTexture.source.scaleMode = 'nearest';
  const bottomText = new Sprite({
      texture: bottomTextTexture
    });
  bottomText.anchor.set(0.5);
  bottomText.x = (APP_WIDTH / 2);
  bottomText.y = (APP_HEIGHT / 12) * 10;
  bottomText.width = 244;
  bottomText.height = 44;
  bottomText.scale.x = bottomText.scale.y = 1;
  bottomText.alpha = 0
  app.stage.addChild(bottomText);
  
  const iconTexture = Texture.from('../sprites/icon.png');
  iconTexture.source.scaleMode = 'nearest';
  const icon = new Sprite ({
    texture: iconTexture
  })
  icon.x = APP_WIDTH - 2 * 23
  icon.y = 23
  icon.alpha = 0;
  app.stage.addChild(icon);
  
  
  let moveCount = 0;
  let gameOver = false;
  let playerOneTurn = true;
  let lastTurn = gridImage;

  const grid = [[], [], []];
  for (let i = 0; i < GRID_SIZE_VERTICAL; i++)
  {
    for (let j = 0; j < GRID_SIZE_HORIZONTAL; j++)
    {
      grid[i][j] = new Container();      
      const cell = new Sprite({
          texture: cellTexture,
          label: "cell"
        });
      cell.alpha = 0;
      cell.anchor.set(0.5);
      cell.width = CELL_SIZE;
      cell.height = CELL_SIZE;
      cell.x = ((APP_WIDTH - CELL_SIZE * GRID_SIZE_HORIZONTAL) / 2) + (j + 0.5) * CELL_SIZE
      cell.y = ((APP_HEIGHT - CELL_SIZE * GRID_SIZE_VERTICAL) / 2) + (i + 0.5) * CELL_SIZE
      grid[i][j].eventMode = 'static';
      grid[i][j].cursor = 'pointer';
      grid[i][j].on('pointerdown', onClick);
      grid[i][j].addChild(cell);
      app.stage.addChild(grid[i][j]);
    }
  }
  
  const fingerTexture = Texture.from('../sprites/finger.png');
  fingerTexture.source.scaleMode = 'linear';
  const finger = new Sprite ({
    texture: fingerTexture
  })
  finger.width = 50 * (4/3);
  finger.height = 50 * (4/3);
  finger.x = APP_WIDTH / 2;
  finger.y =  APP_HEIGHT / 2;
  finger.alpha = 0;
  app.stage.addChild(finger);

  fadeIn(icon, 30);
  fadeIn(topText, 60, icon);
  fadeIn(gridImage, 60, topText)
  fadeIn(bottomText, 60, gridImage);
  fadeIn(finger, 60, gridImage);
  finger.loopSizeAnim = true;
  shrinkSize(finger);
  
  function lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t
  }

  function easeInOut(t) {
    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
  }
  
  function easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }
  
  function fadeIn(sprite, length, waitAppear, delay) {
    sprite.fadeInTicker = new Ticker;
    sprite.fadeInTicker.start();
    let current = 0;
    let stop = false;
    
    if (!delay) {
      delay = 0;
    }

    sprite.fadeInTicker.add(() => {
      if (waitAppear) {
        if (waitAppear.alpha < 1) {
          stop = true;
        }
      }

      if (!stop) {
        if (delay > 0) {
          delay -= sprite.fadeInTicker.deltaTime;
        } else {
          if (sprite.alpha < 1) {
            current += sprite.fadeInTicker.deltaTime;
            var t = current / length;
            sprite.alpha = lerp(sprite.alpha, 1, easeInOut(t));
          } else {
            sprite.fadeInTicker.destroy();
            sprite.fadeInTicker = false;
          }
        }
      } else if (waitAppear.alpha >= 1) {
        stop = false;
      }
    });
  }
  
  function fadeOut(sprite, length) {
    const fadeOutTicker = new Ticker;
    fadeOutTicker.start();
    let current = 0;

    fadeOutTicker.add(() => {
      if (sprite.alpha >= 0) {
        if (!sprite.fadeInTicker) {
          current += fadeOutTicker.deltaTime
          var t = current / length;
          sprite.alpha = lerp(sprite.alpha, 0, easeInOut(t));
        }
      } else {
        fadeOutTicker.destroy();
        sprite.loopSizeAnim = false;
      }
    });
  }
  
  function fadeOutNonWinningMoves() {
    for (let i = 0; i < GRID_SIZE_VERTICAL; i++)
    {
      for (let j = 0; j < GRID_SIZE_HORIZONTAL; j++)
      {
        if (!grid[i][j].winMove) {
          fadeOut(grid[i][j], 60);
        } 
      }
    }
  }
  
  function bumpSize(sprite, scale) {
    sprite.bumpTicker = new Ticker;
    sprite.bumpTicker.start();
    let max = 120;
    let current = 0;
    
    if (!scale) {
      scale = (4/3);
    }
    
    const targetWidth = sprite.width * scale;
    const targetHeight = sprite.height * scale;

    sprite.bumpTicker.add(() => {
      if (sprite.width < targetWidth && sprite.height < targetHeight) {
        current += sprite.bumpTicker.deltaTime
        var t = current / max;
        sprite.width = lerp(sprite.width, targetWidth, easeOutQuint(t));
        sprite.height = lerp(sprite.height, targetHeight, easeOutQuint(t));
      } else {
        sprite.bumpTicker.destroy();
        shrinkSize(sprite, scale);
      }
    });
  }

  function shrinkSize(sprite, scale) {
    sprite.shrinkTicker = new Ticker;
    sprite.shrinkTicker.start();
    let max = 120;
    let current = 0;
    
    if (!scale) {
      scale = (4/3);
    }

    const targetWidth = sprite.width / scale;
    const targetHeight = sprite.height / scale;

    sprite.shrinkTicker.add(() => {
      if (sprite.width > targetWidth && sprite.height > targetHeight) {
        current += sprite.shrinkTicker.deltaTime
        var t = current / max;
        sprite.width = lerp(sprite.width, targetWidth, easeOutQuint(t));
        sprite.height = lerp(sprite.height, targetHeight, easeOutQuint(t));
      } else if (sprite.loopSizeAnim) {
        sprite.shrinkTicker.destroy();
        bumpSize(sprite, scale);
      } else {
        sprite.shrinkTicker.destroy();
      }
    });
  }

  function makeAMove(container, side) {
    const cell = container.getChildByLabel("cell")
    const turn = new Sprite({
      texture: moveTextures[moveCount],
      label: side
    });
    turn.anchor.set(0.5); 
    turn.x = cell.x;
    turn.y = cell.y;
    turn.width = CELL_SIZE;
    turn.height = CELL_SIZE;
    turn.alpha = 0;
    container.addChild(turn);
    fadeIn(turn, 60, lastTurn);
    moveCount++;
    if (!victoryCheck("x")) {
      victoryCheck("o");
    };
    lastTurn = turn;
  }
  
  function victoryCheck(side) {
    for (let i = 0; i < 3; i += 1) {
      if (grid[i][0].getChildByLabel(side) && grid[i][1].getChildByLabel(side) && grid[i][2].getChildByLabel(side))  {
        grid[i][0].winMove = true;
        grid[i][1].winMove = true;
        grid[i][2].winMove = true;
        fadeOutNonWinningMoves();
        showBanner();
        return gameOver = true;
      } else if (grid[0][i].getChildByLabel(side) && grid[1][i].getChildByLabel(side) && grid[2][i].getChildByLabel(side)) {
        grid[0][i].winMove = true;
        grid[1][i].winMove = true;
        grid[2][i].winMove = true;
        fadeOutNonWinningMoves();
        showBanner();
        return gameOver = true;
      } 
    }

    if (grid[1][1].getChildByLabel(side)) {
      if (grid[0][0].getChildByLabel(side) && grid[2][2].getChildByLabel(side)) {
        grid[1][1].winMove = true;
        grid[0][0].winMove = true;
        grid[2][2].winMove = true;
        fadeOutNonWinningMoves();
        showBanner();
        return gameOver = true;
      } 
      if (grid[0][2].getChildByLabel(side) && grid[2][0].getChildByLabel(side)) {
        grid[0][2].winMove = true;
        grid[1][1].winMove = true;
        grid[2][0].winMove = true;
        fadeOutNonWinningMoves();
        showBanner();
        return gameOver = true;
      }
    }

    if (moveCount > 8) {
      showBanner();
      return gameOver = true;
    }
    return false
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function getRandomGridContainer (grid) {
    let attempt = grid[getRandomInt(GRID_SIZE_HORIZONTAL)][getRandomInt(GRID_SIZE_VERTICAL)];
    while (attempt.getChildByLabel("x") || attempt.getChildByLabel("o")) {
      attempt = grid[getRandomInt(GRID_SIZE_HORIZONTAL)][getRandomInt(GRID_SIZE_VERTICAL)];     
    }
    return attempt;
  }
  
  function onClick() {
    if (!gameOver && playerOneTurn && gridImage.alpha == 1) {
      if (lastTurn.alpha < 1) {
        lastTurn.alpha = 1;
      }
      if (!finger.hidden) {
        finger.hidden = true
        fadeOut(finger, 10);
      }
      if (!this.getChildByLabel("x") && !this.getChildByLabel("o") && moveCount <= GRID_SIZE_HORIZONTAL * GRID_SIZE_VERTICAL) {
        makeAMove(this, "x");
        if (!gameOver && moveCount < GRID_SIZE_HORIZONTAL * GRID_SIZE_VERTICAL) {
          makeAMove(getRandomGridContainer(grid), "o");
        }
      }
    }
  }
})();

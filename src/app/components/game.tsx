// @ts-nocheck
'use client'
import Phaser from 'phaser';
import { useEffect, useRef } from 'react';

const PhaserGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    let game: Phaser.Game | undefined = undefined;

    if (gameRef.current) {
      game = new Phaser.Game(config);
    }

    let basket: Phaser.Physics.Arcade.Sprite;
    let coin: Phaser.Physics.Arcade.Sprite;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let score = 0;
    let scoreText: Phaser.GameObjects.Text;

    function preload(this: Phaser.Scene) {
      this.load.image('basket', 'https://examples.phaser.io/assets/sprites/platform.png');
      this.load.image('coin', 'https://examples.phaser.io/assets/sprites/coin.png');
    }

    function create(this: Phaser.Scene) {
      const basketWidth = 200;
      basket = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight - 30, 'basket')
          .setScale(basketWidth / this.textures.get('basket').getSourceImage().width)
          .refreshBody();
      basket.setCollideWorldBounds(true);

      coin = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, 'coin');
      coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

      this.physics.add.collider(basket, coin, collectCoin, undefined, this);

      cursors = this.input.keyboard.createCursorKeys();

      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

      this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
        basket.x = pointer.x;
      });
    }

    function update(this: Phaser.Scene) {
      if (cursors.left.isDown) {
        basket.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        basket.setVelocityX(160);
      } else {
        basket.setVelocityX(0);
      }

      if (coin.y > 600) {
        resetCoin();
      }
    }

    function collectCoin(basket: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
      coin.disableBody(true, true);
      score += 10;
      scoreText.setText('Score: ' + score);
      resetCoin();
    }

    function resetCoin() {
      coin.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
      coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return <div ref={gameRef} id="phaser-game" />;
};

export default PhaserGame;

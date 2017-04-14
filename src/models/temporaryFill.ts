/**
 * Created by nicolas on 14/04/17.
 */

export let datas = [
  {
    name: 'longBoard',
    object: {
      dimension: [77.8, 2.0, 12.2],
      position: [-100, 0, 50],
      texturePaths: [
        'side.png', 'side.png',
        'pion_table.png', 'side.png',
        'side.png', 'side.png'
      ]
    }
  },
  {
    name: 'Board',
    object: {
      dimension: [32.6, 2.0, 32.6],
      position: [100, 0, -50],
      texturePaths: [
        'side.png', 'side.png',
        'board.png', 'side.png',
        'side.png', 'side.png'
      ]
    }
  },
  {
    name: 'blackPawn',
    object: {
      dimension: [3.5, 3.5, 1.5],
      position: [-10, 10, 10],
      texturePaths: [
        'black.png'
      ]
    }
  },
  {
    name: 'longBoard',
    object: {
      dimension: [3.5, 3.5, 1.5],
      position: [10, 10, -10],
      texturePaths: [
        'white.png'
      ]
    }
  },
];
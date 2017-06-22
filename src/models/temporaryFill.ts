/**
 * Created by nicolas on 14/04/17.
 */

export let datas = [
  {
    name: 'longBoard',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [77.8, 2.0, 12.2],
      position: [-100, 0, 50],
      rules: [
        {id: 'rule1', conf: {}},
      ],
      texturesPaths: [
        'side.png', 'side.png',
        'pion_table.png', 'side.png',
        'side.png', 'side.png'
      ]
    }
  },
  {
    name: 'Board',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [32.6, 2.0, 32.6],
      position: [100, 0, -50],
      texturesPaths: [
        'side.png', 'side.png',
        'board.png', 'side.png',
        'side.png', 'side.png'
      ]
    }
  },
  {
    name: 'blackPawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      position: [-10, 10, 10],
      texturesPaths: [
        'black.png'
      ]
    }
  },
  {
    name: 'whitePawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: true,
      dimension: [3.5, 1.5, 3.5],
      position: [10, 10, -10],
      texturesPaths: [
        'white.png'
      ]
    }
  },
  {
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [10, 10, 1],
      position: [0, 0, 0]
    }
  }
];
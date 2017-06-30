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
      position: [5, 0, 20],
      rules: [
        {id: 'TestRuleTrue', conf: {}},
      ],
      texturesPaths: [
        'side.png', 'side.png',
        'pion_table.png', 'side.png',
        'side.png', 'side.png',
      ],
    },
  },
  {
    name: 'Board',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [32.6, 2.0, 32.6],
      position: [-10, 0, -20],
      texturesPaths: [
        'side.png', 'side.png',
        'board.png', 'side.png',
        'side.png', 'side.png',
      ],
    },
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
        'black.png',
      ],
      rules: [
        {id: 'TestRuleFalse', conf: {}},

      ],
    },
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
        'white.png',
      ],
      rules: [
        {id : 'ChangeColor', conf: { color : "0x0000FF"}},
        {id : 'MoveForward', conf: { movement : "1"}},
      ],
    },
  },
  {
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [10, 10, 1],
      position: [0, 0, 0],
    },
  },
  {
    name: 'grid',
    object: {
      type: 'grid',
      caseX: 5,
      caseY: 5,
      caseWidth: 10,
      caseHeight: 10,
      gap: 1,
      position: [-10, 1, -20],
    },
  },
];

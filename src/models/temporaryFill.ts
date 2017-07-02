/**
 * Created by nicolas on 14/04/17.
 */

export let datas = [
  {
    uuid: 'A',
    name: 'longBoard',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [77.8, 2.0, 12.2],
      position: [50, 0, 50],
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
    uuid: 'B',
    name: 'Board',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [39.15, 2.0, 39.15],
      position: [0, -0.1, 0],
      texturesPaths: [
        'side.png', 'side.png',
        'board.png', 'side.png',
        'side.png', 'side.png',
      ],
    },
  },
  {
    uuid: 'C',
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
        {id: 'MoveDiag', conf: { movement : 1}},

      ],
    },
  },
  {
    uuid: 'D',
    name: 'whitePawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      position: [10, 10, -10],
      texturesPaths: [
        'white.png',
      ],
      rules: [
        {id : 'ChangeColor', conf: { color : '0x0000FF'}},
        {id : 'MoveForward', conf: { movement : 1}},
      ],
    },
  },
  {
    uuid: 'Z',
    name: 'blackPawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      position: [0, 30, 0],
      texturesPaths: [
        'black.png',
      ],
    },
  },
  /*
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
  */
  {
    uuid: 'E',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [-10, 1, -10],
      coord: [0, 0],
    },
  },
  {
    uuid: 'F',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [0, 1, -10],
      coord: [1, 0],
    },
  },
  {
    uuid: 'G',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [10, 1, -10],
      coord: [2, 0],
    },
  },
  {
    uuid: 'H',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [-10, 1, 0],
      coord: [0, 1],
    },
  },
  {
    uuid: 'I',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [0, 1, 0],
      coord: [1, 1],
    },
  },
  {
    uuid: 'J',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [10, 1, 0],
      coord: [2, 1],
    },
  },
  {
    uuid: 'K',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [-10, 1, 10],
      coord: [0, 2],
    },
  },
  {
    uuid: 'L',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [0, 1, 10],
      coord: [1, 2],
    },
  },
  {
    uuid: 'M',
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [9.9, 9.9, 1],
      position: [10, 1, 10],
      coord: [2, 2],
    },
  },
];

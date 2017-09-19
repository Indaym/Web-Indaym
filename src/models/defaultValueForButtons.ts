/**
 * Created by Nicolas Delahaigue on 10/06/2017
 */

export const buttonsDefault = {
  'board3x3': {
    name: 'board3x3',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [32.6, 2.0, 32.6],
    },
  },
  'board1x9': {
    name: 'board1x9',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [77.8, 2.0, 12.2],
      texturesPaths: [
        'side.png', 'side.png',
        'pion_table.png', 'side.png',
        'side.png', 'side.png',
      ],
    },
  },
  'board10x10': {
    name: 'board10x10',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [90, 2, 90],
      texturesPaths: [
        'side.png', 'side.png',
        'board10.png', 'side.png',
        'side.png', 'side.png',
      ],
    },
  },
  'pawnWhite': {
    name: 'whitepawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
    },
  },
  'pawnBlack': {
    name: 'blackpawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      texturesPaths: ['black.png'],
    },
  },
  'case': {
    name: 'case',
    object: {
      type: 'case',
      draggable: false,
      droppable: true,
      dimension: [10, 10, 1],
      position: [0, 0, 0],
    },
  },
  'grid': {
    name: 'grid',
    object: {
      type: 'grid',
      draggable: false,
      droppable: false,
      position: [0, 0, 0],
      caseX: 3,
      caseY: 3,
      caseWidth: 8.2,
      caseHeight: 8.2,
      gap: 0.1,
    },
  },
  'grid10x10': {
    name: 'grid',
    object: {
      type: 'grid',
      draggable: false,
      droppable: false,
      position: [0, 1.01, 0],
      caseX: 10,
      caseY: 10,
      caseWidth: 8,
      caseHeight: 8,
      gap: 0.2,
    },
  },
};

/**
 * Created by Nicolas Delahaigue on 10/06/2017
 */

export const buttonsDefault = {
  'board': {
    name: 'board3x3',
    object: {
      type: 'board',
      draggable: false,
      droppable: true,
      dimension: [32.6, 2.0, 32.6],
      textureName: 'side.png',
    },
  },
  'pawnWhite': {
    name: 'whitepawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      textureName: 'white.png',
    },
  },
  'pawnBlack': {
    name: 'blackpawn',
    object: {
      type: 'pawn',
      draggable: true,
      droppable: false,
      dimension: [3.5, 1.5, 3.5],
      textureName: 'black.png',
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
};

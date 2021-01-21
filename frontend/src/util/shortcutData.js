import {
  DOT,
  BUCKET,
  PICKER,
  ERASER,
  MOVE,
  SAMECOLOR,
  DITHERING,
} from '../modules/paintTool';
export const initShortcut = {
  paintTools: {
    DOT: { key: 'Q', code: 'KeyQ', helpText: 'Pen tool' },
    BUCKET: { key: 'B', code: 'KeyB', helpText: 'Bucket tool' },
    PICKER: { key: 'P', code: 'KeyP', helpText: 'Color picker tool' },
    ERASER: { key: 'E', code: 'KeyE', helpText: 'Eraser tool' },
    MOVE: { key: 'M', code: 'KeyM', helpText: 'Move tool' },
    SAMECOLOR: {
      key: 'A',
      code: 'KeyA',
      helpText: 'Bucket all same colors pixel',
    },
    DITHERING: {
      key: 'D',
      code: 'KeyD',
      helpText: 'Dithering tool',
    },
    category: [DOT, BUCKET, PICKER, ERASER, MOVE, SAMECOLOR, DITHERING],
  },
  color: {
    SWAP: {
      key: 'X',
      code: 'KeyX',
      helpText: 'Swap first/second Color',
    },
    PALETTE_LINE_UP: {
      key: '↑',
      code: 'ArrowUp',
      helpText: 'Select palette line move up',
    },
    PALETTE_LINE_DOWN: {
      key: '↓',
      code: 'ArrowDown',
      helpText: 'Select palette line move down',
    },
    PALETTE_SELECT_1: {
      key: '1',
      code: 'Digit1',
      helpText: 'Select palette cell 1',
    },
    PALETTE_SELECT_2: {
      key: '2',
      code: 'Digit2',
      helpText: 'Select palette cell 2',
    },
    PALETTE_SELECT_3: {
      key: '3',
      code: 'Digit3',
      helpText: 'Select palette cell 3',
    },
    PALETTE_SELECT_4: {
      key: '4',
      code: 'Digit4',
      helpText: 'Select palette cell 4',
    },
    PALETTE_SELECT_5: {
      key: '5',
      code: 'Digit5',
      helpText: 'Select palette cell 5',
    },
    PALETTE_SELECT_6: {
      key: '6',
      code: 'Digit6',
      helpText: 'Select palette cell 6',
    },
    PALETTE_SELECT_7: {
      key: '7',
      code: 'Digit7',
      helpText: 'Select palette cell 7',
    },
    category: [
      'SWAP',
      'PALETTE_LINE_UP',
      'PALETTE_LINE_DOWN',
      'PALETTE_SELECT_1',
      'PALETTE_SELECT_2',
      'PALETTE_SELECT_3',
      'PALETTE_SELECT_4',
      'PALETTE_SELECT_5',
      'PALETTE_SELECT_6',
      'PALETTE_SELECT_7',
    ],
  },
  storage: {
    SAVE_DOTART: {
      key: 'ctrl + S',
      code: '$mod+KeyS',
      helpText: 'Save to localStorage',
    },
    LOAD_DOTART: {
      key: 'alt + L',
      code: 'Alt+KeyL',
      helpText: 'Open load dialog',
    },
    category: ['SAVE_DOTART', 'LOAD_DOTART'],
  },
  misc: {
    INCREASE_DOTSIZE: {
      key: '-',
      code: 'Equal',
      helpText: 'Increase dot size',
    },
    DECREASE_DOTSIZE: {
      key: '+',
      code: 'Minus',
      helpText: 'Decrease dot size',
    },
    INCREASE_COLUMN: {
      key: 'ctrl + →',
      code: '$mod+ArrowRight',
      helpText: 'Column + 1',
    },
    DECREASE_COLUMN: {
      key: 'ctrl + ←',
      code: '$mod+ArrowLeft',
      helpText: 'Column - 1',
    },
    INCREASE_ROW: {
      key: 'ctrl + ↓',
      code: '$mod+ArrowDown',
      helpText: 'Row + 1',
    },
    DECREASE_ROW: {
      key: 'ctrl + ↑',
      code: '$mod+ArrowUp',
      helpText: 'Row - 1',
    },
    UNDO: { key: 'ctrl + Z', code: '$mod+KeyZ', helpText: 'Undo' },
    REDO: {
      key: 'ctrl + shift + Z',
      code: '$mod+Shift+KeyZ',
      helpText: 'Redo',
    },
    MOVE_VIEWPORT_UP: {
      key: 'shift + ↑',
      code: 'Shift+ArrowUp',
      helpText: 'Move viewport up',
    },
    MOVE_VIEWPORT_RIGHT: {
      key: 'shift + →',
      code: 'Shift+ArrowRight',
      helpText: 'Move viewport right',
    },
    MOVE_VIEWPORT_DOWN: {
      key: 'shift + ↓',
      code: 'Shift+ArrowDown',
      helpText: 'Move viewport down',
    },
    MOVE_VIEWPORT_LEFT: {
      key: 'shift + ←',
      code: 'Shift+ArrowLeft',
      helpText: 'Move viewport left',
    },
    category: [
      'INCREASE_DOTSIZE',
      'DECREASE_DOTSIZE',
      'INCREASE_COLUMN',
      'DECREASE_COLUMN',
      'INCREASE_ROW',
      'DECREASE_ROW',
      'UNDO',
      'REDO',
      'MOVE_VIEWPORT_UP',
      'MOVE_VIEWPORT_RIGHT',
      'MOVE_VIEWPORT_DOWN',
      'MOVE_VIEWPORT_LEFT',
    ],
  },
};

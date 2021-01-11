export const initShortcut = {
  paintTools: {
    DOT: { key: 'Q', code: 'KeyQ', helpText: 'Pen tool' },
    BUCKET: { key: 'B', code: 'KeyB', helpText: 'Bucket tool' },
    PIKCER: { key: 'P', code: 'KeyP', helpText: 'Color picker tool' },
    ERASER: { key: 'E', code: 'KeyE', helpText: 'Eraser tool' },
    MOVE: { key: 'M', code: 'KeyM', helpText: 'Move tool' },
    SAMECOLOR: {
      key: 'A',
      code: 'KeyA',
      helpText: 'Bucket all same colors pixel',
    },
    category: ['DOT', 'BUCKET', 'PIKCER', 'ERASER', 'MOVE', 'SAMECOLOR'],
  },
  color: {
    SWAP: {
      key: 'X',
      code: 'KeyX',
      helpText: 'Swap first/second Color',
    },
    PALETTE_UP: {
      key: '↑',
      code: 'ArrowUp',
      helpText: 'Select palette move up',
    },
    PALETTE_DOWN: {
      key: '↓',
      code: 'ArrowDown',
      helpText: 'Select palette move down',
    },
    PALETTE_LEFT: {
      key: '←',
      code: 'ArrowLeft',
      helpText: 'Select palette move left',
    },
    PALETTE_RIGHT: {
      key: '→',
      code: 'ArrowRight',
      helpText: 'Select palette move right',
    },
    category: [
      'SWAP',
      'PALETTE_UP',
      'PALETTE_DOWN',
      'PALETTE_LEFT',
      'PALETTE_RIGHT',
    ],
  },
  storage: {
    SAVE_DOTART: {
      key: 'ctrl + S',
      code: '$mod+KeyS',
      helpText: 'Save to localStorage',
    },
    category: ['SAVE_DOTART'],
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

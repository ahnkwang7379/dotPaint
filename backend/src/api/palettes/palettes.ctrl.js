import shortid from 'shortid';

const palettes = [
  {
    id: shortid.generate(),
    nick: 'Forest',
    colors: [
      '#393b2d',
      '#75651a',
      '#775b1c',
      '#788260',
      '#bab887',
      '#dfd6c5',
      '#e6e6e6',
      '#eee6d1',
      '#f8eacf',
    ],
  },
];

/**
 * 신규 palette 추가
 * POST /api/palettes
 * { nick, colors }
 */
export const addPalette = (ctx) => {
  const { nick, colors } = ctx.request.body;
  const paletteId = shortid.generate();
  const palette = { id: paletteId, nick, colors };
  palettes.push(palette);
  ctx.body = palette;
};

/**
 * palette 전체 조회
 * GET /api/palettes
 */
export const palettesList = (ctx) => {
  ctx.body = palettes;
};

/**
 * nick 으로 검색
 * GET /api/palettes/:nick
 */
export const findPaletteWithNick = (ctx) => {
  const { nick } = ctx.params;
  const palettesFoundNick = palettes.find((palette) => palette.nick === nick);
  if (!palettesFoundNick) {
    ctx.body = {
      message: 'Not Fount Palette',
    };
    return;
  }
  ctx.body = palettesFoundNick;
};

/**
 * 특정 palette 제거
 * DELETE /api/palettes/:id
 */
export const removePaletteWithId = (ctx) => {
  const { id } = ctx.params;
  // 해당 id의 palette의 index확인
  const index = palettes.findIndex((palette) => palette.id === id);
  // 없으면 에러 반환
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 파레트입니다.',
    };
    return;
  }
  // palette 제거
  palettes.splice(index, 1);
  ctx.status = 204;
};

/**
 * palette 수정
 * PUT /api/palettes/:id
 * { nick, colors }
 */
export const replacePalette = (ctx) => {
  // 전체 정보를 교체한다
  const { id } = ctx.params;
  const index = palettes.findIndex((palette) => palette.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 파레트입니다.',
    };
    return;
  }
  // 전체 객체를 덮어 씌움
  palettes[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = palettes[index];
};

/**
 * palette nick, colors 수정
 * PATCH /api/palettes/:id
 * { nick, colors }
 */
export const updatePalette = (ctx) => {
  // PATCH 메서드는 주어진 필드만 교체하게
  const { id } = ctx.params;
  const index = palettes.findIndex((palette) => palette.id === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 파레트입니다.',
    };
    return;
  }
  // 기존 값에 덮어씌움
  palettes[index] = {
    ...palettes[index],
    ...ctx.request.body,
  };
  ctx.body = palettes[index];
};

export enum OrderType {
  DEFAULT,
  ASC,
  DESC,
}

export const glyphs = [];
glyphs[OrderType.DEFAULT] = 'glyphicon glyphicon-sort';
glyphs[OrderType.ASC] = 'glyphicon glyphicon-sort-by-alphabet';
glyphs[OrderType.DESC] = 'glyphicon glyphicon-sort-by-alphabet-alt';

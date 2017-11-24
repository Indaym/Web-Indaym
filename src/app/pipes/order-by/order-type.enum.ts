export enum OrderType {
  DEFAULT,
  ASC,
  DESC,
}

export const glyphs = {
  [OrderType.DEFAULT]: 'glyphicon glyphicon-sort',
  [OrderType.ASC]: 'glyphicon glyphicon-sort-by-alphabet',
  [OrderType.DESC]: 'glyphicon glyphicon-sort-by-alphabet-alt',
};

import { User }  from './user'

export interface Title{
  title: string;
  categorie: {categorieName: string, categorieSymbol: string};
  time: string;
  comment: {commentNb: number, commentLink: string};
  like: {likeNb: number, likeLink: string};
  game: {gameName: string, gameLink: string};
  currentUser: User;
}

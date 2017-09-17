import { User }  from '../../user'

export interface Reponse{
  time: { date: string, hour: number, minute: number};
  message: string;
  currentUser: User
}

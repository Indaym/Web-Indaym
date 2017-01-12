import { Reponse }  from './reponse-one';
import { User }  from '../../user';

export class DiscussionReponseOneService {
  getAll(): Reponse[] {
    return [
      {
        time: { date: "06/04/2016", hour: 16, minute: 42},
        message: "Ceci est le message de la première réponse",
        currentUser: { name: { nameName: "Tokiro", nameLink: "#" }, avatar: 'https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80' }
      },
      {
        time: { date: "30/12/2016", hour: 17, minute: 52},
        message: "C'est encore autre chose",
        currentUser: { name: { nameName: "Tokiro", nameLink: "#" }, avatar: 'https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80' }
      }
    ]
  }
}

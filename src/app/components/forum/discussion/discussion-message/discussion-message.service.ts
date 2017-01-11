import { Message }  from './message'

export class DiscussionMessageService {
    getAll(): Message[] {
        return [
            {
                message: "Test :D Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper auctor vestibulum. Curabitur posuere vel mi vitae scelerisque. Suspendisse ultrices quis erat in lobortis. Ut id est tortor. Duis eget rhoncus ligula.",
                commentNb: 2
            }
        ]
    }
}

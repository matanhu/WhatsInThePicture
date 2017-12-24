import { GroupGame } from 'app/Models/GroupGame';

export class UserGame {
    constructor(
        public id?: string,
        public email?: string,
        public password?: string,
        public token?: string,
        public groupGameList?: Array<GroupGame>
    ) {
        this.groupGameList = new Array<GroupGame>();
    }
}

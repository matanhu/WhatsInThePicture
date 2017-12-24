import { ImageGame } from './ImageGame';
export class GroupGame {
    constructor(
        public name?: string,
        public key?: string,
        public imageGameList?: Array<ImageGame>,
    ) {
        this.imageGameList = new Array<ImageGame>();
    }
}

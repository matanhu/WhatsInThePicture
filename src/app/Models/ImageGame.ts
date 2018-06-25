export class ImageGame {
    constructor(
        public imageUrl?: string,
        public name?: string,
        public hideme?: boolean
    ) {
      this.imageUrl = '';
      this.name = '';
      this.hideme = true;
    }
}


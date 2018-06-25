export class ImageGame {
    constructor(
        public imageUrl?: string,
        public name?: string,
        public hideme?: boolean
    ) {
      this.imageUrl = imageUrl || '';
      this.name = name || '';
      this.hideme = hideme || true;
    }
}


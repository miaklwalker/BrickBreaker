export declare class animatedBackground {
    frame: number;
    counter: number;
    sprites: HTMLImageElement[];
    numberOfSprites: number;
    constructor(numberOfSprites: number);
    addSprites(url: string, format: string): void;
    Sprite(fr: number): HTMLImageElement;
    staticSprite(index: number): HTMLImageElement;
}
//# sourceMappingURL=animatedBackground.d.ts.map
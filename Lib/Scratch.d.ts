declare function styler(): void;
interface styles {
    brick: string[];
    ball: [];
    text: [];
    color: number[][];
}
interface styleList {
    [index: string]: styles;
}
declare let index: string[];
declare let styles: styleList;

/**
 * @class Vector
 * @param x - Contains the x Value for the vector
 * @param y - Contains the y Value for the Vector
 */
export declare class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(v: Vector): void;
    mult(factor: Vector | number): this | undefined;
    div(divisor: Vector | number): void;
    limit(max: number): this;
}
//# sourceMappingURL=Vector.d.ts.map
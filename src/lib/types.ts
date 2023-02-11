/** @format */

export enum Tabs {
    Feed = 0,
    Liked,
    Unread,
}

export type JSONValue =
    | string
    | number
    | boolean
    | {[x: string]: JSONValue}
    | Array<JSONValue>;

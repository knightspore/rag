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

export type FeedControl = {
    after: string | null;
    setAfter: (a: FeedControl['after']) => void;
    cursorHist: string[];
    setCursorHist: (h: FeedControl['cursorHist']) => void;
    handleNextPage: (c: string | null) => void;
    handlePrevPage: () => void;
};

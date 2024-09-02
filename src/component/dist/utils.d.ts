declare function findKey<T>(map: {
    [key: string]: T;
}, fn: (item: T) => boolean): string | 0;
declare function findIndex<T>(arr: T[], fn: (item: T) => boolean): number;
declare function differenceBy(arr1: any[], arr2: any[], key: string): any[];
export { findKey, findIndex, differenceBy };

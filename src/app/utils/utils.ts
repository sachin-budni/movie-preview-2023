export const getRouteName = (path: string): string => {
    const f1 = path.indexOf('/', 1);
    const f2 = path.lastIndexOf('/');
    return path.substring(f1 + 1, f2);
}
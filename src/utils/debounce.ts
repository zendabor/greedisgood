type DebounceFunction<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
) => void | ReturnType<T>;

export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    ms: number,
): DebounceFunction<T> {
    let timeout: NodeJS.Timeout;

    return function (...args: Parameters<T>): void | ReturnType<T> {
        const fnCall = (): void | ReturnType<T> => {
            return fn.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
        return fnCall();
    };
}

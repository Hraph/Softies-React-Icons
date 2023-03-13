
export function toPascalCase(input: string): string {
    input = input.trim().toLowerCase();

    const words = input.split(/[\s_-]+/);
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join("");
}

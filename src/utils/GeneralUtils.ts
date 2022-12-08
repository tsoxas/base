export function trim(string: string) {
    return string.length > 1024 ? `${string.slice(0, 1000)} and more ... ` : string;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalizeFirstLetterfromMultipleWords(string: string) {
    const words: string[] = string.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let retwords: string = words.join(" ");
    return retwords;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
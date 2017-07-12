export interface WordCount {
    word: string;
    count: number;
}

export interface TopWords {
    timestamp: number;
    domain: string;
    words: WordCount[]
}
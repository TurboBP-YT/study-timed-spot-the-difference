declare global {
    export interface process {
        env: {
            [key: string]: string | undefined
        }
    }
}
declare module '*.glsl' {
    const content: string
    export default content
}

declare module '!!raw-loader!*.glsl' {
    const content: string
    export default content
} 
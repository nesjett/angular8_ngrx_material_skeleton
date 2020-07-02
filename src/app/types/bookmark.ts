

export interface Bookmark {
    id: number,
    name: string,
    url: string,
    group: string // TODO: Are this fixed groups or user created ones..? Maybe an enum..? Left as string to be able to handle both options easily
}

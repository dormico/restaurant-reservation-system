export interface Feedback{
    restaurantId: number,
    rating: number,
    experience: string,
    recommend: number,
    negative: string[],
    positive: string[]
}
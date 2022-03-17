export interface Order{
    id: number,
    guestEmail: string
    restaurantId: number,
    orders: OrderedDish[]
}
export interface OrderedDish{
    dishId: number,
    servings: number
}
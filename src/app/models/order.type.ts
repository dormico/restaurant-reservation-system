export interface Order{
    id: number,
    guestEmail: string
    restaurantId: number,
    orders: OrderedDish[]
}
interface OrderedDish{
    dishId: number,
    servings: number
}
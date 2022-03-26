import { MenuItem } from "./restaurant.type";

export interface Order{
    id: number,
    guestEmail: string
    restaurantId: number,
    orders: OrderedDish[]
}
export interface OrderedDish{
    dish: MenuItem,
    servings: number
}
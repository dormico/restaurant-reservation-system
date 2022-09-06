import { MenuItem } from "./restaurant.type";

export interface Order{
    id: number,
    guestEmail: string
    restaurantId: string,
    orders: OrderedDish[]
}
export interface OrderedDish{
    dish: MenuItem,
    servings: number
}
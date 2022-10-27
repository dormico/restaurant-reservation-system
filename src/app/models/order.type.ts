import { MenuItem, Map } from "./restaurant.type";

export interface Order {
    id: number,
    guestEmail: string
    restaurantId: string,
    takeaway: boolean,
    date?: string,
    hour?: string,
    min?: string,
    duration?: string,
    tables?: {row: number, col: number}[],
    orders: OrderedDish[]
}
export interface OrderedDish {
    dish: MenuItem,
    servings: number,
    price: number
}
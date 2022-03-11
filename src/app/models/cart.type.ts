import { MenuItem } from "./restaurant.type"

export interface Cart{
    email: string
    restaurantId: number
    orders: MenuItem[] 
}
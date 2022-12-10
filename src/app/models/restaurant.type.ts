export interface RestaurantResults{
    restaurants: Restaurant[]
}
export interface Restaurant {
    id: string
    name: string
    address: string
    phone: string
    email: string
    takeaway: boolean
    tables: Map
    pricing: number
    cardnum: string
    openingH: number
    openingM: number
    closingH: number
    closingM: number
    menu: MenuItem[]

    image?: string
    website?: string
    style?: string
    reviews?: Review[]
    rating?: number
}
export interface Map {
    name: string
    size: number
    image?: string
    fields: {type: string, data: number, reserved: {start: number, end: number}[]}[][]
}
export const FieldTypes = {
    tile: "../assets/icons/reservation-map/tile_5.png",
    wall: "../assets/icons/reservation-map/wall_1.png",
    table: "../assets/icons/reservation-map/table_6.png",
    door: "../assets/icons/reservation-map/door_2.png",
    window: "../assets/icons/reservation-map/window_0.png",
    toilet: "../assets/icons/reservation-map/toilet_3.png",
    stairs: "../assets/icons/reservation-map/stairs_1.png",
    food: "../assets/icons/reservation-map/food_2.png",
    reserved: "../assets/icons/reservation-map/table_7.png"
}
export interface MenuItem {
    dishId: string
    name: string
    description: string
    price: number
    image?: string
}
export interface Review {
    id: string,
    date: string
    rating: number
    text?: string
    answer?: string
}
export enum KitchenStyle {
    "chinese",
    "fine dining",
    "hungarian",
    "italian",
    "street food"
}
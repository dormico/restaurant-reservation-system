import { MenuComponent } from "../components/guest-components/menu/menu.component"

export interface Restaurant{
    id: number
    name: String
    address: string
    phone: string
    email: string
    takeaway: boolean
    pricing: number
    cardnum: number
    opening: number
    closing: number 
    menu: MenuItem[]

    image?: string
    website?: string
    type?: KitchenType[]
    reviews?: Review[],
    rating?: number
}

export interface MenuItem{
    name: string
    description: string
    price: number
    image?: string
}

export interface Review{
    rating: number
    text?: string
    answer?: string
}

export enum KitchenType{
    "chinese",
    "fine dining",
    "hungarian",
    "italian",
    "street food"
}
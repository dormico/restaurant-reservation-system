export interface Restaurant{
    id: number
    name: string
    address: string
    phone: string
    email: string
    takeaway: boolean
    pricing: number
    cardnum: string
    opening: number
    closing: number 
    menu: MenuItem[]

    image?: string
    website?: string
    style?: string
    reviews?: Review[],
    rating?: number
}

export interface MenuItem{
    dishId: number
    name: string
    description: string
    price: number
    image?: string
}

export interface MenuItemResponse{
    dishId: string
    name: string
    description: string
    price: number
    image?: string
}

export interface Review{
    date: string
    rating: number
    text?: string
    answer?: string
}

enum KitchenStyle{
    "chinese",
    "fine dining",
    "hungarian",
    "italian",
    "street food"
}
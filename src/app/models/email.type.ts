export interface OrderEmail{
    email: string
    restaurantName: string
    date: string
    hour: string
    mins: string
    address: string
    phone: string
    orders: {name: string, amount: number}[]
}
export interface InvoiceEmail{
    email: string
    restaurantName: string
    phone: string
    orders: {name: string, amount: number, price: number}[]
    sumPrice: number
}
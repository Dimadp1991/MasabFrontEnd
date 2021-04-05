export interface StandingOrder{
    id: number,
    user: number,
    billing_date: string,
    billing_start_period: string,
    billing_end_period: string,
    date_created: string,
    currency:string,
    activity_type:string,
    institution: string,
    customer_bill: any []
}
export type TSocket = {
    event: EventType
    module: Modules
    payload: IPayload
}

export type Modules =
    | "member"
    | "editor"
    | "admin";

export type EventType =
    | "cancel_reserve"
    | "approved"
    | "reserve";

export type IPayload = {
    b_id: number
    userId: number
    checking_date: Date
}

export interface IuserModel {
    _id?: string,
    username : string | undefined,
    fullname : string,
    password: string,
    role: string,
    email: string,
    token?: string
}
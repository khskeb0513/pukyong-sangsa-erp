import Account from "./account";

export default interface AccountData {
    all: Account[]
    assets: Account[]
    loan: Account[]
    capital: Account[]
    expenses: Account[]
    revenue: Account[]
}

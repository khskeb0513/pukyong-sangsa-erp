import AccountListForm from "./accountListForm"

const getAll = () => {
    const value = window.localStorage.getItem('accountList')
    if (!value) {
        return []
    } else {
        return JSON.parse(value)
    }
}

const findByName = (name: string) => {
    return getAll().find((v: AccountListForm) => {
        return v.name === name
    })
}

const put = (value: AccountListForm) => {
    return window.localStorage.setItem('accountList', JSON.stringify([...getAll(), value]))
}

const reset = (...value: string[]) => {
    switch (value.length) {
        case 0:
            window.localStorage.removeItem('accountList')
            break
        case 1:
            window.localStorage.setItem('accountList', value[0])
            break
    }
}

const AccountList = {
    getAll, put, findByName, reset
}

export default AccountList

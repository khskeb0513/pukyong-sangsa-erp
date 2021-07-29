import SlipListForm from "./slipListForm";
import AccountList from "../accountList/accountList";

const getAll = () => {
    const value = window.localStorage.getItem('slipList')
    if (!value) {
        return []
    } else {
        return JSON.parse(value)
    }
}

const put = (value: SlipListForm) => {
    return window.localStorage.setItem('slipList', JSON.stringify([...getAll(), value]))
}

const remove = (index: number) => {
    const value = getAll()
    value.splice(index, 1)
    return window.localStorage.setItem('slipList', JSON.stringify(value))
}

const accountList = () => {
    const value = getAll()
    return Array.from(new Set([...value.map((v: SlipListForm) => {
        return v.creditName
    }), ...value.map((v: SlipListForm) => {
        return v.debitName
    })])).filter((v: string) => !!v).map((v: string) => {
        return AccountList.findByName(v)
    }).filter(v => !!v)
}

const reset = (...value: string[]) => {
    switch (value.length) {
        case 0:
            window.localStorage.removeItem('slipList')
            break
        case 1:
            window.localStorage.setItem('slipList', value[0])
            break
    }
}

const SlipList = {
    getAll, put, remove, accountList, reset
}

export default SlipList

import EndTermListForm from "./endTermListForm";
import AccountList from "../accountList/accountList";

const getAll = () => {
    const value = window.localStorage.getItem('endTermList')
    if (!value) {
        return []
    } else {
        return JSON.parse(value)
    }
}

const put = (value: EndTermListForm) => {
    return window.localStorage.setItem('endTermList', JSON.stringify([...getAll(), value]))
}

const remove = (index: number) => {
    const value = getAll()
    value.splice(index, 1)
    return window.localStorage.setItem('endTermList', JSON.stringify(value))
}

const accountList = () => {
    const value = getAll()
    return Array.from(new Set([...value.map((v: EndTermListForm) => {
        return v.creditName
    }), ...value.map((v: EndTermListForm) => {
        return v.debitName
    })])).filter((v: string) => !!v).map((v: string) => {
        return AccountList.findByName(v)
    }).filter(v => !!v)
}

const reset = (...value: string[]) => {
    switch (value.length) {
        case 0:
            window.localStorage.removeItem('endTermList')
            break
        case 1:
            window.localStorage.setItem('endTermList', value[0])
    }
}

const EndTermList = {
    getAll, put, remove, accountList, reset
}

export default EndTermList

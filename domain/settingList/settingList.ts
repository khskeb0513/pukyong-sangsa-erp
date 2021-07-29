import SettingListForm from "./settingListForm";

const getAll = () => {
    const value = window.localStorage.getItem('settingList')
    if (!value) {
        return {}
    } else {
        return JSON.parse(value)
    }
}

const put = (value) => {
    return window.localStorage.setItem('settingList', JSON.stringify({...getAll(), ...value}))
}

const reset = (...value: string[]) => {
    switch (value.length) {
        case 0:
            window.localStorage.removeItem('settingList')
            break
        case 1:
            window.localStorage.setItem('settingList', value[0])
            break
    }
}

const SettingList = {
    getAll, put, reset
}

export default SettingList

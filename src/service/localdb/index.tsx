const Localdb = {
    get: (key: string) => {
        const body = localStorage.getItem(key)
        if (body && body !== '') {
            return JSON.parse(localStorage.getItem(key) as string)
        } else {
            return null
        }
    }, set: (key: string, value: object) => {
        localStorage.setItem(key, JSON.stringify(value))
    }, remove: (key: string) => {
        localStorage.removeItem(key)
    }
}

export default Localdb

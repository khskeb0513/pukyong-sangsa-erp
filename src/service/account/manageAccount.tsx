import Localdb from "../localdb";
import Account from "./account";

const makeNumberToThreeDigitsStr = (num: number) => {
    switch (String(num).length) {
        case 1: {
            return '00' + num
        }
        case 2: {
            return '0' + num
        }
        default: {
            return String(num)
        }
    }
}

const ManageAccount = {
    add: async (accountName: string, accountSort: string) => {
        if (await Localdb.get('accountList')) {
            let body: Array<Account> = await Localdb.get('accountList')
            const no = body[0] ? body.sort((a: Account, b: Account) => {
                return a.no - b.no
            })[body.length - 1]['no'] + 1 : 0
            body.push({
                no, accountName, accountSort
            })
            Localdb.set('accountList', body)
            return makeNumberToThreeDigitsStr(no)
        } else {
            Localdb.set('accountList', [{
                no: 0,
                accountName, accountSort
            }])
            return '000'
        }
    }, list: () => {
        if (!Localdb.get('accountList')) Localdb.set('accountList', [])
        const all = Localdb.get('accountList').map((v: Account) => {
            return {...v, no: makeNumberToThreeDigitsStr(v.no)}
        })
        return {
            all, assets: all.filter((v: Account) => {
                return v.accountSort === '자산'
            }), loan: all.filter((v: Account) => {
                return v.accountSort === '부채'
            }), capital: all.filter((v: Account) => {
                return v.accountSort === '자본'
            }), expenses: all.filter((v: Account) => {
                return v.accountSort === '비용'
            }), revenue: all.filter((v: Account) => {
                return v.accountSort === '수익'
            })
        }
    }, remove: (no:number) => {
        let body = Localdb.get('accountList')
        const index = body.findIndex((v:Account) => v.no === no)
        body.splice(index, 1)
        Localdb.set('accountList', body)
    }
}

export default ManageAccount

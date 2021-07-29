import Header from "../../components/header";
import erpStyle from '../../styles/erp.module.css'
import SlipList from "../../domain/slipList/slipList";
import AccountListForm from "../../domain/accountList/accountListForm";
import SlipListForm from "../../domain/slipList/slipListForm";
import {useEffect, useState} from "react";

const UnadjustedTrialBalance = () => {
    const [slipList, setSlipList] = useState([])
    const [accountList, setAccountList] = useState([])
    useEffect(() => {
        setSlipList(SlipList.getAll())
        setAccountList(SlipList.accountList())
        console.log(SlipList.accountList())
    }, [])
    const calc = (type: string, name: string) => {
        const debitList = slipList.filter((v: SlipListForm) => {
            return v.debitName === name
        }).map((v: SlipListForm) => {
            return v.debitAmount
        })
        const debitSum = debitList.length === 0 ? 0 : debitList.reduce((a, b) => a + b)
        const creditList = slipList.filter((v: SlipListForm) => {
            return v.creditName === name
        }).map((v: SlipListForm) => {
            return v.creditAmount
        })
        const creditSum = creditList.length === 0 ? 0 : creditList.reduce((a, b) => a + b)
        switch (type) {
            case 'DEBIT_SUM':
                return debitSum
            case 'CREDIT_SUM':
                return creditSum
            case 'BALANCE': {
                if (debitSum - creditSum < 0) {
                    return (-(debitSum - creditSum))
                } else {
                    return (debitSum - creditSum)
                }
            }
        }
    }
    const totalCalc = (type: string) => {
        const debitAccount = accountList.filter((v: AccountListForm) => {
            return v.type === '차변'
        })
        const creditAccount = accountList.filter((v: AccountListForm) => {
            return v.type === '대변'
        })
        switch (type) {
            case 'DEBIT_SUM':
                return slipList.map((v: SlipListForm) => {
                    return v.debitAmount
                }).reduce((a, b) => a + b)
            case 'CREDIT_SUM':
                return slipList.map((v: SlipListForm) => {
                    return v.creditAmount
                }).reduce((a, b) => a + b)
            case 'DEBIT_BALANCE':
                return debitAccount.map((v: AccountListForm) => {
                    return calc('BALANCE', v.name)
                }).reduce((a, b) => a + b)
            case 'CREDIT_BALANCE':
                return creditAccount.map((v: AccountListForm) => {
                    return calc('BALANCE', v.name)
                }).reduce((a, b) => a + b)
        }
    }
    return (
        <>
            <Header subtitle={'수정전시산표 생성'}/>
            <div className={erpStyle.container}>
                <table className={erpStyle.tg}>
                    <thead className={erpStyle.tableHead}>
                    <tr>
                        <th className={erpStyle.tg0lax}>차변잔액</th>
                        <th className={erpStyle.tg0lax}>차변합계</th>
                        <th className={erpStyle.tg0lax}>계정과목</th>
                        <th className={erpStyle.tg0lax}>대변합계</th>
                        <th className={erpStyle.tg0lax}>대변잔액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        accountList.map((account: AccountListForm, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        account.type === '차변' ?
                                            (
                                                <th className={erpStyle.tg0lax}>{calc('BALANCE', account.name).toLocaleString()}</th>) :
                                            (<th className={erpStyle.tg0lax}/>)
                                    }
                                    <th className={erpStyle.tg0lax}>{calc('DEBIT_SUM', account.name).toLocaleString()}</th>
                                    <th className={erpStyle.tg0lax}>{account.name}</th>
                                    <th className={erpStyle.tg0lax}>{calc('CREDIT_SUM', account.name).toLocaleString()}</th>
                                    {
                                        account.type === '대변' ?
                                            (
                                                <th className={erpStyle.tg0lax}>{calc('BALANCE', account.name).toLocaleString()}</th>) :
                                            (<th className={erpStyle.tg0lax}/>)
                                    }
                                </tr>
                            )
                        })
                    }
                    {
                        accountList.length !== 0 ?
                            (<tr>
                                <th className={erpStyle.tg0lax}
                                    style={{fontWeight: "bold"}}>{totalCalc('DEBIT_BALANCE').toLocaleString()}</th>
                                <th className={erpStyle.tg0lax}
                                    style={{fontWeight: "bold"}}>{totalCalc('DEBIT_SUM').toLocaleString()}</th>
                                <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>합계</th>
                                <th className={erpStyle.tg0lax}
                                    style={{fontWeight: "bold"}}>{totalCalc('CREDIT_SUM').toLocaleString()}</th>
                                <th className={erpStyle.tg0lax}
                                    style={{fontWeight: "bold"}}>{totalCalc('CREDIT_BALANCE').toLocaleString()}</th>
                            </tr>) :
                            null
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UnadjustedTrialBalance

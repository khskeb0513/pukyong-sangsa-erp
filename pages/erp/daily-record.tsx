import Header from "../../components/header";
import erpStyle from "../../styles/erp.module.css"
import {useEffect, useReducer} from "react";
import {getRegExp} from 'korean-regexp'
import AccountListForm from "../../domain/accountList/accountListForm";
import AccountList from "../../domain/accountList/accountList";
import SlipList from "../../domain/slipList/slipList";

const DailyRecord = () => {
        const initialState = {
            month: 1,
            date: 1,
            debitName: '',
            debitAmount: 0,
            debitDropdown: null,
            creditName: '',
            creditAmount: 0,
            creditDropdown: null,
            accountList: [],
            slipList: [],
            disableDebitName: false,
            disableCreditName: false,
            memo: ''
        }
        const makeDebitDropdown = (nameArray: AccountListForm[]) => {
            return nameArray.map((value, index) => {
                return (<li key={index} className={erpStyle.li}>
                    {
                        value.store
                            ? (<span onClick={() => selectDebit(value)}>[{value.type}] {value.name}</span>)
                            : (<span onClick={() => addDebit(value)}>[{value.type}계정 추가] {value.name}</span>)
                    }
                </li>)
            })
        }
        const makeCreditDropdown = (nameArray: AccountListForm[]) => {
            return nameArray.map((value, index) => {
                return (<li key={index} className={erpStyle.li}>
                    {
                        value.store
                            ? (<span onClick={() => selectCredit(value)}>[{value.type}] {value.name}</span>)
                            : (<span onClick={() => addCredit(value)}>[{value.type}계정 추가] {value.name}</span>)
                    }
                </li>)
            })
        }
        const selectDebit = (value: AccountListForm) => {
            dispatch({type: 'DEBIT_NAME', value: value.name})
            dispatch({type: 'DISABLE_DEBIT_NAME'})
        }
        const addDebit = (value: AccountListForm) => {
            addAccount(value)
            dispatch({type: 'DISABLE_DEBIT_NAME'})
        }
        const selectCredit = (value: AccountListForm) => {
            dispatch({type: 'CREDIT_NAME', value: value.name})
            dispatch({type: 'DISABLE_CREDIT_NAME'})
        }
        const addCredit = (value: AccountListForm) => {
            addAccount(value)
            dispatch({type: 'DISABLE_CREDIT_NAME'})
        }
        const reloadAccount = () => dispatch({type: 'ACCOUNT_LIST', value: AccountList.getAll()})
        const addAccount = (value: AccountListForm) => {
            AccountList.put({...value, store: true})
            reloadAccount()
        }
        const [state, dispatch] = useReducer(
            (state, action) => {
                switch (action.type) {
                    case 'MONTH':
                        return {...state, month: action.value}
                    case 'DATE':
                        return {...state, date: action.value}
                    case 'DEBIT_NAME':
                        return {...state, debitName: action.value}
                    case 'DEBIT_AMOUNT':
                        return {...state, debitAmount: Number(action.value.replace(/,/ig, ''))}
                    case 'DEBIT_DROPDOWN':
                        return {...state, debitDropdown: makeDebitDropdown(action.value)}
                    case 'MEMO':
                        return {...state, memo: action.value}
                    case 'CREDIT_NAME':
                        return {...state, creditName: action.value}
                    case 'CREDIT_AMOUNT':
                        return {...state, creditAmount: Number(action.value.replace(/,/ig, ''))}
                    case 'CREDIT_DROPDOWN':
                        return {...state, creditDropdown: makeCreditDropdown(action.value)}
                    case 'ACCOUNT_LIST':
                        return {...state, accountList: action.value}
                    case 'SLIP_LIST':
                        return {...state, slipList: action.value}
                    case 'DISABLE_DEBIT_NAME':
                        return {...state, disableDebitName: !state.disableDebitName}
                    case 'DISABLE_CREDIT_NAME':
                        return {...state, disableCreditName: !state.disableCreditName}
                    case 'RESET': {
                        return {...initialState, slipList: state.slipList, accountList: state.accountList}
                    }
                }
            }, initialState
        )
        useEffect(() => {
            dispatch({type: 'ACCOUNT_LIST', value: AccountList.getAll()})
            dispatch({type: 'SLIP_LIST', value: SlipList.getAll()})
        }, [])
        const onChangeMemo = (value: string) => {
            dispatch({type: 'MEMO', value})
        }
        const onChangeDebitName = (value: string) => {
            dispatch({type: 'DEBIT_NAME', value: value.replace(/ /ig, '')})
            if (value !== '') {
                const searchList = state.accountList.filter(v => {
                    return v.name.search(getRegExp(value)) !== -1
                })
                if (state.accountList.filter(v => {
                    return v.name === value
                }).length === 1) {
                    dispatch({type: 'DEBIT_DROPDOWN', value: searchList})
                } else {
                    searchList.push({name: value, type: '차변', store: false})
                    dispatch({type: 'DEBIT_DROPDOWN', value: searchList})
                }
            } else {
                dispatch({type: 'DEBIT_DROPDOWN', value: makeDebitDropdown([])})
            }
        }
        const onChangeCreditName = (value: string) => {
            dispatch({type: 'CREDIT_NAME', value: value.replace(/ /ig, '')})
            if (value !== '') {
                const searchList = state.accountList.filter(v => {
                    return v.name.search(getRegExp(value)) !== -1
                })
                if (state.accountList.filter(v => {
                    return v.name === value
                }).length === 1) {
                    dispatch({type: 'CREDIT_DROPDOWN', value: searchList})
                } else {
                    searchList.push({name: value, type: '대변', store: false})
                    dispatch({type: 'CREDIT_DROPDOWN', value: searchList})
                }
            } else {
                dispatch({type: 'CREDIT_DROPDOWN', value: makeCreditDropdown([])})
            }
        }
        const reloadSlip = () => dispatch({type: 'SLIP_LIST', value: SlipList.getAll()})
        const addSlip = () => {
            SlipList.put({
                month: state.month,
                date: state.date,
                debitName: state.debitName,
                debitAmount: state.debitAmount,
                memo: state.memo,
                creditName: state.creditName,
                creditAmount: state.creditAmount
            })
            reloadSlip()
            dispatch({type: 'RESET'})
        }
        const removeSlip = (index: number) => {
            console.log({index})
            SlipList.remove(index)
            reloadSlip()
        }
        return (
            <>
                <Header subtitle={'일상거래분개 기록'}/>
                <div className={erpStyle.container}>
                    <table className={erpStyle.tg}>
                        <thead className={erpStyle.tableHead}>
                        <tr>
                            <th className={erpStyle.tg0lax}>날짜</th>
                            <th className={erpStyle.tg0lax}>차변과목</th>
                            <th className={erpStyle.tg0lax}>차변금액</th>
                            <th className={erpStyle.tg0lax}>비고</th>
                            <th className={erpStyle.tg0lax}>대변과목</th>
                            <th className={erpStyle.tg0lax}>대변금액</th>
                            <th className={erpStyle.tg0lax}>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.slipList.map((v, i) => {
                            return (
                                <tr id={i} key={i}>
                                    <th className={erpStyle.tg0lax}>{`${v.month} / ${v.date}`}</th>
                                    <th className={erpStyle.tg0lax}>{v.debitName}</th>
                                    <th className={erpStyle.tg0lax}>{v.debitAmount.toLocaleString()}</th>
                                    <th className={erpStyle.tg0lax}>{v.memo}</th>
                                    <th className={erpStyle.tg0lax}>{v.creditName}</th>
                                    <th className={erpStyle.tg0lax}>{v.creditAmount.toLocaleString()}</th>
                                    <th className={erpStyle.tg0lax}>
                                        <a onClick={() => removeSlip(i)} href={`#${i + 1}`}>삭제</a>
                                    </th>
                                </tr>
                            )
                        })}
                        <tr>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="number"
                                    name="month"
                                    id="month"
                                    min={1}
                                    max={12}
                                    onChange={e => dispatch({type: 'MONTH', value: e.target.value})}
                                    autoComplete={'off'}
                                    placeholder={'1'}
                                />
                                {' '}/{' '}
                                <input
                                    type="number"
                                    name="date"
                                    id="date"
                                    min={1}
                                    max={31}
                                    onChange={e => dispatch({type: 'DATE', value: e.target.value})}
                                    placeholder={'1'}
                                    autoComplete={'off'}
                                />
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="text"
                                    name="debit_name"
                                    id="debit_name"
                                    value={state.debitName}
                                    autoComplete={'off'}
                                    onChange={e => onChangeDebitName(e.target.value)}
                                    disabled={state.disableDebitName}
                                />
                                {state.disableDebitName ? null : (<ul>{state.debitDropdown}</ul>)}
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="text"
                                    name="debit_amount"
                                    id="debit_amount"
                                    autoComplete={'off'}
                                    value={state.debitAmount.toLocaleString()}
                                    onChange={e => dispatch({type: 'DEBIT_AMOUNT', value: e.target.value})}
                                />
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="text"
                                    name="memo"
                                    id="memo"
                                    autoComplete={'off'}
                                    value={state.memo}
                                    onChange={e => onChangeMemo(e.target.value)}
                                />
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="text"
                                    name="credit_name"
                                    id="credit_name"
                                    autoComplete={'off'}
                                    value={state.creditName}
                                    onChange={e => onChangeCreditName(e.target.value)}
                                    disabled={state.disableCreditName}
                                />
                                {state.disableCreditName ? null : (<ul>{state.creditDropdown}</ul>)}
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <input
                                    type="text"
                                    name="credit_amount"
                                    id="credit_amount"
                                    autoComplete={'off'}
                                    value={state.creditAmount.toLocaleString()}
                                    onChange={e => dispatch({type: 'CREDIT_AMOUNT', value: e.target.value})}
                                />
                            </th>
                            <th className={erpStyle.tg0lax}>
                                <a onClick={addSlip} href={'#sum'}>추가</a>
                            </th>
                        </tr>
                        <tr id={'sum'}>
                            <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}} colSpan={2}>차변합계</th>
                            <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>
                                {
                                    state.slipList.length !== 0 ?
                                        state.slipList.map(v => {
                                            return v.debitAmount
                                        }).reduce((a, b) => a + b).toLocaleString() :
                                        null
                                }
                            </th>
                            <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}} colSpan={2}>대변합계</th>
                            <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>
                                {
                                    state.slipList.length !== 0 ?
                                        state.slipList.map(v => {
                                            return v.creditAmount
                                        }).reduce((a, b) => a + b).toLocaleString() :
                                        null
                                }
                            </th>
                            <th className={erpStyle.tg0lax}/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
;

export default DailyRecord

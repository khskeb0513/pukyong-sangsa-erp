import Header from "../../components/header";
import erpStyle from '../../styles/erp.module.css'
import {useEffect, useReducer} from "react";
import AccountListForm from "../../domain/accountList/accountListForm";
import AccountList from "../../domain/accountList/accountList";
import {getRegExp} from "korean-regexp";
import EndTermList from "../../domain/endTermList/endTermList";
import SlipListForm from "../../domain/slipList/slipListForm";
import SlipList from "../../domain/slipList/slipList";
import endTermListForm from "../../domain/endTermList/endTermListForm";

const EndTermRevision = () => {
    const initialState = {
        debitName: '',
        debitAmount: 0,
        debitDropdown: null,
        creditName: '',
        creditAmount: 0,
        creditDropdown: null,
        accountList: [],
        endTermList: [],
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
                case 'END_TERM_LIST':
                    return {...state, endTermList: action.value}
                case 'SLIP_LIST':
                    return {...state, slipList: action.value}
                case 'DISABLE_DEBIT_NAME':
                    return {...state, disableDebitName: !state.disableDebitName}
                case 'DISABLE_CREDIT_NAME':
                    return {...state, disableCreditName: !state.disableCreditName}
                case 'RESET': {
                    return {...initialState, endTermList: state.endTermList, accountList: state.accountList}
                }
            }
        }, initialState
    )
    useEffect(() => {
        dispatch({type: 'ACCOUNT_LIST', value: AccountList.getAll()})
        dispatch({type: 'END_TERM_LIST', value: EndTermList.getAll()})
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
    const reloadEndTermList = () => dispatch({type: 'END_TERM_LIST', value: EndTermList.getAll()})
    const addEndTermList = () => {
        EndTermList.put({
            debitName: state.debitName,
            debitAmount: state.debitAmount,
            memo: state.memo,
            creditName: state.creditName,
            creditAmount: state.creditAmount
        })
        reloadEndTermList()
        dispatch({type: 'RESET'})
    }
    const removeEndTermList = (index: number) => {
        console.log({index})
        EndTermList.remove(index)
        reloadEndTermList()
    }
    const calc = (name: string) => {
        const debitList = [...state.slipList.filter((v: SlipListForm) => {
            return v.debitName === name
        }).map((v: SlipListForm) => {
            return v.debitAmount
        }), ...state.endTermList.filter((v: endTermListForm) => {
            return v.debitName === name
        }).map((v: endTermListForm) => {
            return v.debitAmount
        })]
        const debitSum = debitList.length === 0 ? 0 : debitList.reduce((a, b) => a + b)
        const creditList = [...state.slipList.filter((v: SlipListForm) => {
            return v.creditName === name
        }).map((v: SlipListForm) => {
            return v.creditAmount
        }), ...state.endTermList.filter((v: SlipListForm) => {
            return v.creditName === name
        }).map((v: SlipListForm) => {
            return v.creditAmount
        })]
        const creditSum = creditList.length === 0 ? 0 : creditList.reduce((a, b) => a + b)
        if (debitSum - creditSum < 0) {
            return (-(debitSum - creditSum))
        } else {
            return (debitSum - creditSum)
        }
    }
    const getDebitBalance = () => {
        dispatch({type: 'DEBIT_AMOUNT', value: calc(state.debitName).toString()})
    }
    const getCreditBalance = () => {
        dispatch({type: 'CREDIT_AMOUNT', value: calc(state.creditName).toString()})
    }
    return (
        <>
            <Header subtitle={'기말수정분개 기록'}/>
            <div className={erpStyle.container}>
                <table className={erpStyle.tg}>
                    <thead className={erpStyle.tableHead}>
                    <tr>
                        <th className={erpStyle.tg0lax}>차변과목</th>
                        <th className={erpStyle.tg0lax}>차변금액</th>
                        <th className={erpStyle.tg0lax}>비고</th>
                        <th className={erpStyle.tg0lax}>대변과목</th>
                        <th className={erpStyle.tg0lax}>대변금액</th>
                        <th className={erpStyle.tg0lax}>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.endTermList.map((v, i) => {
                        return (
                            <tr id={i} key={i}>
                                <th className={erpStyle.tg0lax}>{v.debitName}</th>
                                <th className={erpStyle.tg0lax}>{v.debitAmount.toLocaleString()}</th>
                                <th className={erpStyle.tg0lax}>{v.memo}</th>
                                <th className={erpStyle.tg0lax}>{v.creditName}</th>
                                <th className={erpStyle.tg0lax}>{v.creditAmount.toLocaleString()}</th>
                                <th className={erpStyle.tg0lax}>
                                    <a onClick={() => removeEndTermList(i)} href={`#${i + 1}`}>삭제</a>
                                </th>
                            </tr>
                        )
                    })}
                    <tr>
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
                            {
                                state.disableDebitName ?
                                    (<span onClick={getDebitBalance}>
                                        <br/>
                                        [{state.debitName}] 잔액 가져오기: {calc(state.debitName).toLocaleString()}
                                    </span>):
                                    null
                            }
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
                            {
                                state.disableCreditName ?
                                    (<span onClick={getCreditBalance}>
                                        <br/>
                                        [{state.creditName}] 잔액 가져오기: {calc(state.creditName).toLocaleString()}
                                    </span>):
                                    null
                            }
                        </th>
                        <th className={erpStyle.tg0lax}>
                            <a onClick={addEndTermList} href={'#sum'}>추가</a>
                        </th>
                    </tr>
                    <tr id={'sum'}>
                        <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>차변합계</th>
                        <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>
                            {
                                state.endTermList.length !== 0 ?
                                    state.endTermList.map(v => {
                                        return v.debitAmount
                                    }).reduce((a, b) => a + b).toLocaleString() :
                                    null
                            }
                        </th>
                        <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}} colSpan={2}>대변합계</th>
                        <th className={erpStyle.tg0lax} style={{fontWeight: "bold"}}>
                            {
                                state.endTermList.length !== 0 ?
                                    state.endTermList.map(v => {
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

export default EndTermRevision

import erpStyle from '../../styles/erp.module.css'
import Header from "../../components/header";
import {useEffect, useState} from "react";
import SlipList from "../../domain/slipList/slipList";
import AccountList from "../../domain/accountList/accountList";
import EndTermList from "../../domain/endTermList/endTermList";
import SettingList from "../../domain/settingList/settingList";

const Setting = () => {
    const [slipList, setSlipList] = useState('')
    const [accountList, setAccountList] = useState('')
    const [endTermList, setEndTermList] = useState('')
    const [settingList, setSettingList] = useState({})
    useEffect(() => {
        setSlipList(JSON.stringify(SlipList.getAll()))
        setAccountList(JSON.stringify(AccountList.getAll()))
        setEndTermList(JSON.stringify(EndTermList.getAll()))
        setSettingList(SettingList.getAll())
    }, [])
    const onChangeSlipList = (value: string) => {
        SlipList.reset(value)
        setSlipList(value)
    }
    const onChangeAccountList = (value: string) => {
        AccountList.reset(value)
        setAccountList(value)
    }
    const onChangeEndTermList = (value: string) => {
        EndTermList.reset(value)
        setEndTermList(value)
    }
    const onChangeCompanyName = (value: string) => {
        SettingList.put({companyName: value})
        setSettingList({...settingList, companyName: value})
    }
    return (
        <>
            <Header subtitle={'설정'}/>
            <div className={erpStyle.container}>
                <table className={erpStyle.tg}>
                    <thead className={erpStyle.tableHead}>
                    <tr>
                        <th className={erpStyle.tg0lax}>키</th>
                        <th className={erpStyle.tg0lax}>값</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className={erpStyle.tg0lax}>회사이름(setting.companyName)</th>
                        <th className={erpStyle.tg0lax}>
                            <input
                                type="text"
                                value={settingList['companyName']}
                                onChange={e => onChangeCompanyName(e.target.value)}
                                placeholder={'부경상사'}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th className={erpStyle.tg0lax}>일상거래분개(slipList)</th>
                        <th className={erpStyle.tg0lax}>
                            <input
                                type="text"
                                value={slipList}
                                onChange={e => onChangeSlipList(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th className={erpStyle.tg0lax}>계정과목목록(accountList)</th>
                        <th className={erpStyle.tg0lax}>
                            <input
                                type="text"
                                value={accountList}
                                onChange={e => onChangeAccountList(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th className={erpStyle.tg0lax}>기말수정분개(endTermList)</th>
                        <th className={erpStyle.tg0lax}>
                            <input
                                type="text"
                                value={endTermList}
                                onChange={e => onChangeEndTermList(e.target.value)}
                            />
                        </th>
                    </tr>
                    </tbody>
                </table>
                <small>
                    * localStorage 기술을 통해 데이터 저장.
                </small>
            </div>
        </>
    )
}

export default Setting

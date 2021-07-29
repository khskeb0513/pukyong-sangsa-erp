import style from '../styles/header.module.css'
import Link from "next/link";
import {useEffect, useState} from "react";
import SettingList from "../domain/settingList/settingList";

const Header = ({subtitle}) => {
    const [companyName, setCompanyName] = useState('부경상사')
    useEffect(() => {
        setCompanyName(SettingList.getAll()['companyName'])
    }, [])
    return (
        <div>
            <header className={style.header}>
                <Link href={'/'} passHref={true}>
                    <a>
                        <h1 className={style.title}>
                            {companyName} ERP
                        </h1>
                    </a>
                </Link>
                <span>{subtitle}</span>
            </header>
            <hr/>
        </div>
    )
}

export default Header

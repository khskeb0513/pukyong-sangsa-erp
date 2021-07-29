import style from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../components/logo.png'
import {useEffect, useState} from "react";
import SettingList from '../domain/settingList/settingList';


const Home = () => {
    const [companyName, setCompanyName] = useState('부경상사')
    useEffect(() => {
        setCompanyName(SettingList.getAll()['companyName'] || '부경상사')
    }, [])
    return (
        <div className={style.container}>
            <Image src={logo} alt={'pukyong-logo'} width={100} height={100}/>
            <Link href={'/'} passHref={true}>
                <a>
                    <h1>
                        {companyName} ERP
                    </h1>
                </a>
            </Link>
            <span>
                : 일상거래분개, 수정전시산표, 기말수정분개, 수정후시산표, 정산표, 제무재표 작성 솔루션
            </span>
            <div className={style.menuBox}>
                <Link href={'/erp/daily-record'} passHref={true}>
                    <a>
                        일상거래분개 기록
                    </a>
                </Link>
                <span>
                    {' '}/{' '}
                </span>
                <Link href={'/erp/unadjusted-trial-balance'} passHref={true}>
                    <a>
                        수정전시산표 생성
                    </a>
                </Link>
                <span>
                    {' '}/{' '}
                </span>
                <Link href={'/erp/inventory-receipts'} passHref={true}>
                    <a>
                        상품재고장 기록
                    </a>
                </Link>
                <span>
                    {' '}/{' '}
                </span>
                <Link href={'/erp/end-term-revision'} passHref={true}>
                    <a>
                        기말수정분개 기록
                    </a>
                </Link>
                <span>
                    {' '}/{' '}
                </span>
                <Link href={'/erp/settlement-table'} passHref={true}>
                    <a>
                        8위식정산표 생성
                    </a>
                </Link>
                <span>
                    {' '}/{' '}
                </span>
                <Link href={'/erp/financial-statement'} passHref={true}>
                    <a>
                        재무제표 생성
                    </a>
                </Link>
            </div>
            <div>
                <Link href={'/erp/setting'} passHref={true}>
                    설정
                </Link>
            </div>
        </div>
    )
}

export default Home

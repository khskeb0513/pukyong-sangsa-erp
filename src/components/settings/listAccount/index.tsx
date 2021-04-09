import React from "react";
import {Button, Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import Account from "../../../service/account/account";
import AccountData from "../../../service/account/accountData";
import ManageAccount from "../../../service/account/manageAccount";

interface ListAccountProps {
    accountData: AccountData
    reloadAccountData: any
}

const removeAccount = (reloadAccountData:any, key:number) => {
    ManageAccount.remove(Number(key))
    reloadAccountData()
}

const tableForm = (reloadAccountData:any, accountData: Account[]) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>계정과목코드</th>
                    <th>계정과목명</th>
                    <th>계정과목분류</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {accountData.map((v: Account, index: number) => {
                    return (
                        <tr key={index}>
                            <td>#{v.no}</td>
                            <td>{v.accountName}</td>
                            <td>{v.accountSort}</td>
                            <td><Button variant={"danger"} size={"sm"} onClick={() => removeAccount(reloadAccountData, Number(v.no))}>삭제</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}

const ListAccount: React.FC<ListAccountProps> = ({accountData, reloadAccountData}) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>
                        우리회사 계정과목 목록
                    </h5>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="전체">
                            {tableForm(reloadAccountData, accountData.all)}
                        </Tab>
                        <Tab eventKey="assets" title="자산">
                            {tableForm(reloadAccountData, accountData.assets)}
                        </Tab>
                        <Tab eventKey="loan" title="부채">
                            {tableForm(reloadAccountData, accountData.loan)}
                        </Tab>
                        <Tab eventKey="capital" title="자본">
                            {tableForm(reloadAccountData, accountData.capital)}
                        </Tab>
                        <Tab eventKey="expenses" title="비용">
                            {tableForm(reloadAccountData, accountData.expenses)}
                        </Tab>
                        <Tab eventKey="revenue" title="수익">
                            {tableForm(reloadAccountData, accountData.revenue)}
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}

export default ListAccount

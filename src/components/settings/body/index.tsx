import React, {useState} from "react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Common from '../../common'
import AddAccount from "../addAccount";
import ListAccount from "../listAccount";
import ManageAccount from "../../../service/account/manageAccount";
import SystemSetting from "../systemSetting";

const Body = () => {
    const [accountData, setAccountData] = useState(ManageAccount.list())
    const reloadAccountData = () => {
        setAccountData(ManageAccount.list())
    }
    return (
        <Container>
            <Common.Blank/>
            <Row>
                <Col>
                    <h2>환경설정</h2>
                </Col>
            </Row>
            <Common.Blank/>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="manageAccount">
                        <Tab eventKey="manageAccount" title="계정과목 관리">
                            <Common.Blank/>
                            <AddAccount reloadAccountData={reloadAccountData}/>
                            <Common.Blank/>
                            <ListAccount reloadAccountData={reloadAccountData} accountData={accountData}/>
                        </Tab>
                        <Tab eventKey="companySetting" title="회사 설정">
                        </Tab>
                        <Tab eventKey="systemSetting" title="시스템 설정 (백업 및 복구)">
                            <Common.Blank/>
                            <SystemSetting/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Common.Blank/>
        </Container>
    )
}

export default Body

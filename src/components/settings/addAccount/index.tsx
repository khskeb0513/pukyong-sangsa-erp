import React, {useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import ManageAccount from "../../../service/account/manageAccount";

interface AddAccountProps {
    reloadAccountData: any
}

const AddRow: React.FC<AddAccountProps> = ({reloadAccountData}) => {
    const [accountName, setAccountName] = useState(''),
        [accountSort, setAccountSort] = useState('자산'),
        [blankAccountNameAlert, setBlankAccountNameAlert] = useState(false),
        [addAccountAlert, setAddAccountAlert] = useState(false),
        [addAccountAlertValue, setAddAccountAlertValue] = useState('')
    const addAccount = async () => {
        if (accountName === '') {
            setBlankAccountNameAlert(true)
            setAddAccountAlert(false)
        } else {
            setBlankAccountNameAlert(false)
            setAddAccountAlert(true)
            const no = await ManageAccount.add(accountName, accountSort)
            setAddAccountAlertValue(`계정과목 ${accountName}(이)가 ${accountSort}(으)로 추가되었습니다. [계정과목코드 ${no}]`)
        }
        reloadAccountData()
    }
    return (
        <>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="AddAccount.AccountName">
                            <Form.Label>계정과목명</Form.Label>
                            <Form.Control onChange={e => setAccountName(e.target.value)} type="text" placeholder="현금"/>
                        </Form.Group>
                        <Form.Group controlId="AddAccount.AccountSort">
                            <Form.Label>계정과목 분류</Form.Label>
                            <Form.Control onChange={e => setAccountSort(e.target.value)} as="select">
                                <option>자산</option>
                                <option>부채</option>
                                <option>자본</option>
                                <option>비용</option>
                                <option>수익</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={addAccount} variant={'primary'} size={"lg"}>
                        계정과목 추가
                    </Button>
                </Col>
                <Col>
                    <Alert show={blankAccountNameAlert} variant={"danger"}>
                        계정과목명이 비어있습니다.
                    </Alert>
                    <Alert show={addAccountAlert} variant={"success"}>
                        {addAccountAlertValue}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </>
    )
}

export default AddRow

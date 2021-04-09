import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import ManageAccount from "../../../service/account/manageAccount";
import Localdb from "../../../service/localdb";

const SystemSetting = () => {
    return (
        <>
            <Row>
                <Col>
                    <Form.Group>
                        <Form>
                            <Form.Group>
                                <Form.Label>CURRENT ACCOUNT CODE STATUS (JSON)</Form.Label>
                                <Form.Control value={JSON.stringify(ManageAccount.list().all)} type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>INPUT ACCOUNT CODE (JSON)</Form.Label>
                                <Form.Control onChange={e => Localdb.set('accountList', JSON.parse(e.target.value))}
                                              type="text" placeholder="JSON HERE"/>
                            </Form.Group>
                        </Form>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul>
                        <li>
                            Enter stringify JSON in {'<input>'}, value in localStorage will be immediately changed.
                        </li>
                        <li>
                            After modified value, refresh page. (F5)
                        </li>
                        <li>
                            Be Careful! Invalid JSON Format will be crash page.
                        </li>
                        <li>Something went wrong,
                            <ol>
                                <li>
                                    Refresh page. (F5)
                                </li>
                                <li>
                                    Clear localStorage (F12 {'>'} Application {'>'} localStorage)
                                </li>
                            </ol>
                        </li>
                    </ul>
                </Col>
            </Row>
        </>
    )
}

export default SystemSetting

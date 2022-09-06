import {Table, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useContext } from 'react';
import { WebSocketContext } from '../../WebSocket';

const RequestsTable = ({ requestList }) => {

    const ws = useContext(WebSocketContext);

    const confirmReq = (id) => {
        console.log(id)
        ws.confirm(id);
    };

    return (
        <div>
            <Table
                expandIcon={false}
                dataSource={requestList}
                pagination={{
                    hideOnSinglePage: true,
                }}
                rowKey={({ user }) => user.id}
            >
                <Column
                    title="Заказчик"
                    key="client"
                    render={({ user }) => <>{user?.firstName}{user?.lastName}</>}
                />
                <Column
                    title="Номер заказчика"
                    key="clientPhone"
                    render={({ user }) => <>{user?.phone}</>}
                />
                <Column
                    title="Агент"
                    key="guard"
                    render={({ guard }) => <>{guard?.firstName}{guard?.lastName}</>}
                />
                <Column
                    title="Номер агента"
                    key="guardPhone"
                    render={({ guard }) => <>{guard?.phone}</>}
                />

                <Column
                    title="Action"
                    key="action"
                    style={{ overflow: "auto" }}
                    render={({ id }) => (
                        <Button danger onClick={() => confirmReq(id)}>Завершить</Button>
                    )}
                />
            </Table>
        </div>
    );
};

export default RequestsTable;
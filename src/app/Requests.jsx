import React from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../components/PageLayout';
import RequestsTable from '../components/Tables/RequestsTable';

const Requests = () => {
    const { requestCount, requestList } = useSelector(state => state.socket);

    return (
        <PageLayout>
            {requestCount ? (
                <h3>Count: {requestCount}</h3>
            ) : (
                <h2>На данный момент запросов на завершение нет</h2>
            )}
            <div>
                <RequestsTable requestList={requestList} />
            </div>
        </PageLayout>
    );
};

export default Requests;

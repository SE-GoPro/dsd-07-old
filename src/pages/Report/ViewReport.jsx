import React, { useEffect, useState, useCallback } from 'react';
import { Card, Select, Modal, Spin, Button, Table } from 'antd';
import Axios from 'axios';

import ReportViewer from './ReportTemplate/ReportViewer';

const role = 'MANAGER';
// const role = 'USER';

export default function ViewReport() {
  const [reports, setReports] = useState([]);
  const [reportId, setReportId] = useState(null);

  const onReportView = useCallback((id) => {
    setReportId(id);
  }, []);

  useEffect(() => {
    Axios.get('https://dsd07.herokuapp.com/api/user-reports?role=author', {
      headers: {
        'Access-Control-Allow-Origin': true,
        'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
        'project-type': 'LUOI_DIEN',
      },
    })
      .then(response => {
        if (response.data.success)
        setReports(response.data.data)
      }).catch(err => {
        // handleShowModal()
      });
  }, []);

  return (
    <div>
      <Card
        className="u-shadow u-rounded"
        style={{ marginBottom: 16 }}
      >
        <h1>Báo cáo của tôi</h1>
        <Table
          size="small"
          columns={[
            { title: 'Ngày nộp', dataIndex: 'createdAt' },
            { title: 'Tên báo cáo', dataIndex: 'name' },
            {
              render: (value, record) => (
                <a onClick={() => onReportView(record.id)}>Xem</a>
              ),
            },
          ]}
          dataSource={reports}
          bordered
        />
      </Card>
      {reportId && (
        <ReportViewer
          reportId={reportId}
        />
      )}
    </div>
  );
}
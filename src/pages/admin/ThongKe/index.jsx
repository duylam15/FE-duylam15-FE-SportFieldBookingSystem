import { Card, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './Thongke.scss';
import axios from 'axios';
import { Column, Pie, Line } from '@ant-design/charts';
import XuatExcelComponet from '../XuatExcel/XuatExcelComponent';

export default function ThongKe() {
    const [error, setError] = useState(null);
    const [count, setCount] = useState(null);
    const [countFull, setCountFull] = useState(null);
    const [countCoupons, setCountFullCoupons] = useState(null);
    const [countUser, setCountFullUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Dữ liệu cho biểu đồ cột
    const [dataColumn, setDataColumn] = useState([]);
    // Dữ liệu cho biểu đồ tròn
    const [dataPie, setDataPie] = useState([]);
    // Dữ liệu cho biểu đồ doanh thu
    const [revenueData, setRevenueData] = useState([]);
    const [revenueQuarterData, setRevenueQuarterData] = useState([]);
    const [selectedYearRevenue, setSelectedYearRevenue] = useState('2024'); // State cho năm chọn doanh thu theo tháng
    const [selectedYearQuarter, setSelectedYearQuarter] = useState('2024'); // State cho năm chọn doanh thu theo quý
    const [mostBookedFields, setMostBookedFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:8080/api/fields/count/status', { params: { status: 'AVAILABLE' }, });
                setCount(response1.data);

                const response2 = await axios.get('http://localhost:8080/api/fields/count');
                setCountFull(response2.data);

                const response3 = await axios.get('http://localhost:8080/listCoupons');
                setCountFullCoupons(response3.data.data.length);


                const response4 = await axios.get('http://localhost:8080/user/count');
                setCountFullUser(response4.data.userCount);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    // API cho biểu đồ cột và tròn
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookedFieldsWithTime');
                const rawData = response.data.data;

                // Xử lý dữ liệu cho biểu đồ cột (nhóm theo fieldName)
                const groupedColumnData = rawData.reduce((acc, curr) => {
                    if (!acc[curr.fieldName]) {
                        acc[curr.fieldName] = 0;
                    }
                    acc[curr.fieldName]++;
                    return acc;
                }, {});

                const columnData = Object.entries(groupedColumnData).map(([fieldName, count]) => ({
                    fieldName,
                    count,
                }));
                setDataColumn(columnData);

                // Xử lý dữ liệu cho biểu đồ tròn (nhóm theo startTime)
                const groupedPieData = rawData.reduce((acc, curr) => {
                    if (!acc[curr.startTime]) {
                        acc[curr.startTime] = 0;
                    }
                    acc[curr.startTime]++;
                    return acc;
                }, {});

                const pieData = Object.entries(groupedPieData).map(([startTime, value]) => ({
                    time: startTime,
                    value,
                }));
                setDataPie(pieData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, []);

    // API cho biểu đồ doanh thu theo tháng
    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/revenueStatistics');
                const revenue = response.data.data;

                // Lọc doanh thu theo năm đã chọn
                const filteredRevenueData = revenue.filter((item) => item.year.toString() === selectedYearRevenue);

                // Chuyển đổi dữ liệu để phù hợp với biểu đồ
                const revenueChartData = filteredRevenueData.map((item) => ({
                    month: `${item.month}/${item.year}`,
                    revenue: item.totalRevenue,
                }));
                setRevenueData(revenueChartData);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };
        fetchRevenueData();
    }, [selectedYearRevenue]); // Gọi lại API khi người dùng thay đổi năm

    // API cho biểu đồ doanh thu theo quý
    useEffect(() => {
        const fetchRevenueQuarterData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/revenueByQuarter');
                const revenueQuarter = response.data.data;

                // Lọc doanh thu theo năm đã chọn
                const filteredQuarterRevenueData = revenueQuarter.filter((item) => item.year.toString() === selectedYearQuarter);

                // Chuyển đổi dữ liệu để phù hợp với biểu đồ
                const quarterRevenueChartData = filteredQuarterRevenueData.map((item) => ({
                    quarter: `Q${item.quarter}/${item.year}`,
                    revenue: item.totalRevenue,
                }));
                setRevenueQuarterData(quarterRevenueChartData);
            } catch (error) {
                console.error('Error fetching revenue by quarter data:', error);
            }
        };
        fetchRevenueQuarterData();
    }, [selectedYearQuarter]); // Gọi lại API khi người dùng thay đổi năm

    // Fetch most booked fields data
    useEffect(() => {
        const fetchMostBookedFields = async () => {
            try {
                const response = await axios.get('http://localhost:8080/mostBookedFields');
                if (response.data.statusCode === 0) {
                    setMostBookedFields(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching most booked fields:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMostBookedFields();
    }, []);

    // Config biểu đồ cột
    const configColumn = {
        data: dataColumn,
        xField: 'fieldName',
        yField: 'count',
        color: '#36cfc9',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            count: { alias: 'Số lần đặt' },
            fieldName: { alias: 'Tên sân' },
        },
    };

    // Config biểu đồ tròn
    const configPie = {
        appendPadding: 10,
        data: dataPie,
        angleField: 'value',
        colorField: 'time',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}: {value}',
        },
        interactions: [{ type: 'element-active' }],
    };

    // Config biểu đồ doanh thu theo tháng
    const configRevenue = {
        data: revenueData,
        xField: 'month',
        yField: 'revenue',
        color: '#ff7300',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            revenue: { alias: 'Doanh thu' },
            month: { alias: 'Tháng/Năm' },
        },
    };

    // Config biểu đồ doanh thu theo quý
    const configRevenueQuarter = {
        data: revenueQuarterData,
        xField: 'quarter',
        yField: 'revenue',
        color: '#ffb3e6',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            revenue: { alias: 'Doanh thu' },
            quarter: { alias: 'Quý/Năm' },
        },
    };

    return (
        <div className="thongke">
            <h2>THỐNG KÊ</h2>
            <div className="stats-container">
                <Card className="card orange" title="Tổng số khách hàng" bordered>
                    <div className="card-wrap">
                        {countUser}
                        <img
                            className="icon"
                            src="/public/icons/people-svgrepo-com.svg"
                            alt=""
                        />
                    </div>
                </Card>
                <Card className="card pink" title="Số sân có sẵn" bordered>
                    <div className="card-wrap">
                        {count}
                        <img
                            className="icon"
                            src="/public/icons/available-calendar-date-svgrepo-com (2).svg"
                            alt=""
                        />
                    </div>
                </Card>
                <Card className="card green" title="Tổng số sân" bordered>
                    <div className="card-wrap">
                        {countFull}
                        <img
                            className="icon"
                            src="/public/icons/field-football-svgrepo-com.svg"
                            alt=""
                        />
                    </div>
                </Card>
                <Card className="card blue" title="Số khuyến mãi" bordered>
                    <div className="card-wrap">
                        {countCoupons}
                        <img
                            className="icon"
                            src="/public/icons/flight-ticket-svgrepo-com.svg"
                            alt=""
                        />
                    </div>
                </Card>
            </div>

            <div className="bieudo">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div className='wrap'>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2>Thống kê số lần đặt sân</h2>
                                <Column {...configColumn} />
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2>Thống kê số lần đặt theo thời gian</h2>
                                <Pie {...configPie} />
                            </div>
                        </div>
                        <div className='wrap'>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2>Doanh thu theo tháng</h2>
                                <div style={{ marginBottom: '20px' }}>
                                    <Select
                                        value={selectedYearRevenue}
                                        onChange={(value) => setSelectedYearRevenue(value)}
                                        style={{ width: 200 }}
                                    >
                                        <Select.Option value="2022">2022</Select.Option>
                                        <Select.Option value="2023">2023</Select.Option>
                                        <Select.Option value="2024">2024</Select.Option>
                                        <Select.Option value="2025">2025</Select.Option>
                                    </Select>
                                </div>
                                <Line {...configRevenue} />
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2>Doanh thu theo Quý</h2>
                                <div style={{ marginBottom: '20px' }}>
                                    <Select
                                        value={selectedYearQuarter}
                                        onChange={(value) => setSelectedYearQuarter(value)}
                                        style={{ width: 200 }}
                                    >
                                        <Select.Option value="2022">2022</Select.Option>
                                        <Select.Option value="2023">2023</Select.Option>
                                        <Select.Option value="2024">2024</Select.Option>
                                        <Select.Option value="2025">2025</Select.Option>
                                    </Select>
                                </div>
                                <Column {...configRevenueQuarter} />
                            </div>
                        </div>
                        <div className='wrap'>
                            <div className="ranking-list">
                                <h2>Top 5 Sân Được Đặt Nhiều Nhất</h2>
                                {mostBookedFields.slice(0, 5).map((field, index) => {
                                    let rankClass = '';
                                    if (index === 0) {
                                        rankClass = 'top-ranking';
                                    } else if (index === 1) {
                                        rankClass = 'second-ranking';
                                    } else if (index === 2) {
                                        rankClass = 'third-ranking';
                                    }

                                    return (
                                        <div key={field.fieldId} className={`ranking-item ${rankClass}`}>
                                            <span className="field-name">{field.fieldName}</span>
                                            <span className="booking-count">{field.bookingCount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ranking-list">
                                <XuatExcelComponet></XuatExcelComponet>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

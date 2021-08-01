import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import moment from 'moment';
import { ButtonGroup, Button } from '@material-ui/core';

LineChart.propTypes = {};

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
  console.log({categories});
    return {
        // set chieu cao
        chart: {
            height: 500,
          },
          title: {
            text: 'Tổng ca nhiễm',
        },
          // truc nam ngang
          xAxis: {
            categories: categories,
            crosshair: true,
          },
         colors: ['#F3585B'],
        //   Truc ngam doc
          yAxis: {
            min: 0,
            title: {
              text: null,
            },
        },
        //   dung render
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        //   
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
            },
        },
          // Data ta truyen vo hien thi linechart
          series: [
            {
              name: 'Tổng ca nhiễm',
              data: data.map((item) => item.Confirmed),
            },
          ],
        };
      };      

function LineChart({data}) {
    // Update data
    const [options, setOptions] = useState({});
  const [reportStyle, setReportStyle] = useState('all');
  
 
  useEffect(() => {
    let customData = [];
       //  Xu ly khi tay doi style
      switch (reportStyle) {
        case 'all':
          customData = data;
          break;
        case '1':
          customData = data.slice(data.length - 1); // data.length => 50 => data.slice(50-30) = 20
          break;
          case '7':
          customData = data.slice(data.length -7); // data.length => 50 => data.slice(50-7) = 43
          break;
          case '30':
          customData = data.slice(data.length - 30); // data.length => 50 => data.slice(50-30) = 20
          break;
        default:
          customData = data;
          break;
      }
        setOptions(generateOptions(customData));
        // Truyen data de khi no reject generateOptions call again 
        // Truyen report style tranh truong hop khi co su thay doi no cung thay doi theo
    }, [data, reportStyle])
    
    return (
      <div>
        <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color={reportStyle === '1' ? 'secondary' : ''}  onClick = {() => setReportStyle('1')}>1 ngày</Button>
          <Button color={reportStyle === '7' ? 'secondary' : ''}   onClick = {() => setReportStyle('7')}>7 ngày</Button>
          <Button  color={reportStyle === '30' ? 'secondary' : ''}  onClick = {() => setReportStyle('30')}>30 ngày</Button>
          <Button color={reportStyle === 'all' ? 'secondary' : ''}   onClick = {() => setReportStyle('all')}>Tất cả</Button>
            </ButtonGroup>
            <HighchartsReact
                highchats={Highchart}
                options = {options}
            />
        </div>
    );
}

export default LineChart;
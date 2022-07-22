import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { Line } from 'react-chartjs-2'
import { getDatabase, ref, onValue } from 'firebase/database'
export default function WidgetsDropdown() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  }
  const [data1, setData1] = useState({
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [num3, setNum3] = useState(0)
  const [num4, setNum4] = useState(0)
  const [data2, setData2] = useState({
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })
  const [data3, setData3] = useState({
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })
  const [data4, setData4] = useState({
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })
  useEffect(() => {
    const db = getDatabase()
    const reference = ref(db, 'users')
    const reference2 = ref(db, 'placeA/zone1/data')

    onValue(reference, (snapshot) => {
      var lk = Object.keys(snapshot.val())
      var t = data1.datasets[0].data
      t.shift()
      t.push(lk.length)
      setNum1(lk.length)
      setData1({
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: '',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: getStyle('--cui-primary'),
            data: t,
          },
        ],
      })
      //console.log(lk.length);
    })
    onValue(reference2, (snapshot) => {
      var lk = Object.keys(snapshot.val()).reverse()[0]
      var t = data2.datasets[0].data
      t.shift()
      t.push(snapshot.val()[lk]['total'])
      setNum2(snapshot.val()[lk]['total'])
      setData2({
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: '',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: getStyle('--cui-primary'),
            data: t,
          },
        ],
      })
      //console.log(lk.length);
    })
    onValue(reference2, (snapshot) => {
      var lk = Object.keys(snapshot.val()).reverse()[0]
      var t = data3.datasets[0].data
      t.shift()
      t.push(snapshot.val()[lk]['mask'])
      setNum3(snapshot.val()[lk]['mask'])
      setData3({
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: '',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: getStyle('--cui-primary'),
            data: t,
          },
        ],
      })
      //console.log(lk.length);
    })
    onValue(reference2, (snapshot) => {
      var lk = Object.keys(snapshot.val()).reverse()[0]
      var t = data4.datasets[0].data
      t.shift()
      t.push(snapshot.val()[lk]['socialD'])
      setNum4(snapshot.val()[lk]['socialD'])
      setData4({
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: '',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: getStyle('--cui-primary'),
            data: t,
          },
        ],
      })
      //console.log(lk.length);
    })
  }, [])

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<> {num1} </>}
          title="Active Users"
          chart={<Line data={data1} options={options} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<> {num2} </>}
          title="Total Violations"
          chart={<Line data={data2} options={options} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<> {num3} </>}
          title="Mask Violations"
          chart={<Line data={data3} options={options} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={<> {num4} </>}
          title="Social distancing Violations"
          chart={<Line data={data4} options={options} />}
        />
      </CCol>
    </CRow>
  )
}

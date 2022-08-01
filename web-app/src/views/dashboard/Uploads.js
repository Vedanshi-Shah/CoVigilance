import React, { lazy, useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilCloudDownload,
  cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { getDatabase, ref, onValue } from 'firebase/database'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {storage, db} from "../../firebase";
import { ref as sRef,  uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { AppSidebar, AppHeader } from "src/components/index";
import { collection, addDoc } from "firebase/firestore"; 
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))
export default function Upload() {

  const [fileLink, setFileLink] = useState('');
  const [file,setFile]=useState('');
  const [percent,setPercent]=useState(0);
  const [switchDone, setSwitchDone] = useState(0);
  const [blobs, setBlobs] = useState([]);
  function upload(event){
      setFile(event.target.files[0]);
      // setUpload(false);
  }

  function handleUpload(){
      if(!file){
        alert("Please choose a file!");
      }
      console.log("I'm clicked");
      setBlobs([])
      const storageRef=sRef(storage,`/files/${file.name}`);
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const percent=Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
          );
          setPercent(percent);
        },
        (err)=>console.log(err),
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            setFileLink(url);
            const docRef = async () => {await addDoc(collection(db, "videos"), {
              file_name: file.name,
              file_url: url
            })};
            docRef();
            url = encodeURI(url);
            setPercent(0);
          });
        }
      );
    };

  return (
    
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            {/* <WidgetsBrand withCharts /> */}

            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader> Uploads </CCardHeader>
                  <CCardBody>

                  <input type="file" accept="video/*" onChange={upload}/>
                  <button onClick={handleUpload}>Upload</button>

                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </div>
      </div>
    </>
  )
}

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import CryptoJS from 'crypto-js';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-elements';
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    }
  },
})
export default function Analysis() {
  const [crowd1,setCrowd1]=useState('crowded');
  const [crowd2,setCrowd2]=useState('crowded');
  const [crowd3,setCrowd3]=useState('free');
  const [crowd4,setCrowd4]=useState('crowded');
  const [data,setData] = useState({

    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [0,0,0,0,0,0],
        color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Crowd Data"] // optional
  });
  const [data2,setData2] = useState({

    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [0,0,0,0,0,0],
        color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Crowd Data"] // optional
  });
  const [data3,setData3] = useState({

    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [0,0,0,0,0,0],
        color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Crowd Data"] // optional
  });
  const [data4,setData4] = useState({

    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [0,0,0,0,0,0],
        color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Crowd Data"] // optional
  });
  useEffect(()=>{
   
    const db = getDatabase();
    const reference1 = ref(db, 'placeA/zone1/data');
    const reference2 = ref(db, 'placeA/zone2/data');
    const reference3 = ref(db, 'placeA/zone3/data');
    const reference4 = ref(db, 'placeA/zone4/data');
    const ref1=ref(db,'placeA/zone1/count');
    const ref2=ref(db,'placeA/zone2/count');
    const ref3=ref(db,'placeA/zone3/count');
    const ref4=ref(db,'placeA/zone4/count');
    onValue(ref1,(snapshot)=>{
      if(snapshot.val()!=null){
        var lk=Object.keys(snapshot.val()).sort().reverse()[0];
        if(snapshot.val()[lk]['count']==0){
          setCrowd1('free');
          var title='Place A Notification';
          var body='Zone 1 is relatively free to visit.';
        }
        else{
          setCrowd1('crowded');
          var title='Place A Notification';
          var body='Zone 1 is crowded, not recommended to visit right now.';
        }
        Notifications.scheduleNotificationAsync({
         
          content: {
            title: title,
            body: body,
          },
          trigger: { seconds: 2 },
        })
      }
    });
    onValue(ref2,(snapshot)=>{

      if(snapshot.val()!=null){
        var lk=Object.keys(snapshot.val()).sort().reverse()[0];
        if(snapshot.val()[lk]['count']==0){
          setCrowd2('free');
          var title='Place A Notification';
          var body='Zone 2 is relatively free to visit.';
        }
        else{
          setCrowd2('crowded');
          var title='Place A Notification';
          var body='Zone 2 is crowded, not recommended to visit right now.';
        }
        Notifications.scheduleNotificationAsync({
         
          content: {
            title: title,
            body: body,
          },
          trigger: { seconds: 2 },
        })
      }
    });
    onValue(ref3,(snapshot)=>{
      if(snapshot.val()!=null){
        var lk=Object.keys(snapshot.val()).sort().reverse()[0];
        if(snapshot.val()[lk]['count']==0){
          setCrowd3('free');
          var title='Place A Notification';
          var body='Zone 3 is relatively free to visit.';
        }
        else{
          setCrowd3('crowded');
          var title='Place A Notification';
          var body='Zone 3 is crowded, not recommended to visit right now.';
        }
        Notifications.scheduleNotificationAsync({
         
          content: {
            title: title,
            body: body,
          },
          trigger: { seconds: 2 },
        })
      }
    });
    onValue(ref4,(snapshot)=>{
      if(snapshot.val()!=null){
        var lk=Object.keys(snapshot.val()).sort().reverse()[0];
        if(snapshot.val()[lk]['count']==0){
          setCrowd4('free');
          var title='Place A Notification';
          var body='Zone 4 is relatively free to visit.';
        }
        else{
          setCrowd4('crowded');
          var title='Place A Notification';
          var body='Zone 4 is crowded, not recommended to visit right now.';
        }
        Notifications.scheduleNotificationAsync({
         
          content: {
            title: title,
            body: body,
          },
          trigger: { seconds: 2 },
        })
      }
    });
    onValue(reference1, (snapshot) => {
      if(snapshot.val()!=null){
       
       var lastKey = Object.keys(snapshot.val()).sort().reverse()[0];
      
      var t=data.datasets[0].data;
      t.shift();
      //console.log(snapshot.val()[lastKey]);
      
      t.push(snapshot.val()[lastKey]["total"]);
      
      
      //console.log(t);
      setData({
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: t,
          color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Crowd Data"] // optional
    });
      //console.log(snapshot.val()[lastKey]);
      }
    });
    onValue(reference2, (snapshot) => {
      if(snapshot.val()!=null){
       
       var lastKey = Object.keys(snapshot.val()).sort().reverse()[0];
      
      var t=data2.datasets[0].data;
      t.shift();
      //console.log(snapshot.val()[lastKey]);
      
      t.push(snapshot.val()[lastKey]["total"]);
      
      
      //console.log(t);
      setData2({
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: t,
          color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Crowd Data"] // optional
    });
      //console.log(snapshot.val()[lastKey]);
      }
    });
    onValue(reference3, (snapshot) => {
      if(snapshot.val()!=null){
       
       var lastKey = Object.keys(snapshot.val()).sort().reverse()[0];
      
      var t=data3.datasets[0].data;
      t.shift();
      //console.log(snapshot.val()[lastKey]);
      
      t.push(snapshot.val()[lastKey]["total"]);
      
      
      //console.log(t);
      setData3({
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: t,
          color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Crowd Data"] // optional
    });
      //console.log(snapshot.val()[lastKey]);
      }
    });
    onValue(reference4, (snapshot) => {
      if(snapshot.val()!=null){
       
       var lastKey = Object.keys(snapshot.val()).sort().reverse()[0];
      
      var t=data4.datasets[0].data;
      t.shift();
      //console.log(snapshot.val()[lastKey]);
      
      t.push(snapshot.val()[lastKey]["total"]);
      
      
      //console.log(t);
      setData4({
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: t,
          color: (opacity = 1) => `rgba(0, 220, 0, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Crowd Data"] // optional
    });
      //console.log(snapshot.val()[lastKey]);
      }
    });
  },[]);
  return (
    <ScrollView style={styles.container}>
    <View style={styles.sliderContainer}>
      {/* <Text style={{textAlign:'center',fontSize:20}} >Zone Wise Crowd Management</Text> */}
      {/* <View style={styles.container1}>
        <BarChart 
          data={{
            labels: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width-40} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#396EB0",
            backgroundGradientTo: "#396EB0",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View> */}
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text style={{textAlign:'center',fontSize:20}} >Real Time Crowd Analysis</Text>
      <Text style={{textAlign:'left',fontSize:12}} >Zone 1</Text>
      <Text>{crowd1}</Text>
      <LineChart
        data={data}
        width={screenWidth-40}
        height={220}
        chartConfig={chartConfig}
      />
      
      <StatusBar style="auto" />
      <Text style={{textAlign:'left',fontSize:12}} >Zone 2</Text>
      <Text>{crowd2}</Text>
      <LineChart
        data={data2}
        width={screenWidth-40}
        height={220}
        chartConfig={chartConfig}
      />
      
      <StatusBar style="auto" />
      <Text style={{textAlign:'left',fontSize:12}} >Zone 3</Text>
      <Text>{crowd3}</Text>
      <LineChart
        data={data3}
        width={screenWidth-40}
        height={220}
        chartConfig={chartConfig}
      />
      
      <StatusBar style="auto" />
      <Text style={{textAlign:'left',fontSize:12}} >Zone 4</Text>
      <Text>{crowd4}</Text>
      <LineChart
        data={data4}
        width={screenWidth-40}
        height={220}
        chartConfig={chartConfig}
      />
      
      <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  sliderContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1:{
    padding: 20,
  }
});

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#FAEDF0",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#D3E4CD",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

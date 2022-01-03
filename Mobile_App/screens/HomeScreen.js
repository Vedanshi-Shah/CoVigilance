import React,{useEffect} from 'react'
import { ScrollView,StyleSheet,StatusBar, Text, View, Image,TouchableOpacity,Button} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen({navigation}){
  // function triggerLocalNotificationHandler () {
    
  // }
  // useEffect(() => {
  //   // Permission for iOS
  //   Permissions.getAsync(Permissions.NOTIFICATIONS)
  //     .then(statusObj => {
  //       // Check if we already have permission
  //       if (statusObj.status !== "granted") {
  //         // If permission is not there, ask for the same
  //         return Permissions.askAsync(Permissions.NOTIFICATIONS)
  //       }
  //       return statusObj
  //     })
  //     .then(statusObj => {
  //       // If permission is still not given throw error
  //       if (statusObj.status !== "granted") {
  //         throw new Error("Permission not granted")
  //       }
  //     })
  //     .catch(err => {
  //       return null
  //     })
      
  // }, []);

  
    const img1=require('../assets/doctor.png');
    return (
        <ScrollView style={styles.container}>
        <View style={styles.sliderContainer}>
            <Swiper autoplay height={200}>
            <View style={styles.slide}>
            <Image source={require("../assets/SunBurn.png")}
                style={{resizeMode:"cover"},styles.sliderImage}
                
                />
                
            </View>
            <View style={styles.slide}>
                <Image source={require("../assets/party.png")}
                style={{resizeMode:"cover"},styles.sliderImage}

                />
            </View>
            <View style={styles.slide}>
            <Image source={require("../assets/holi.png")}
                style={{resizeMode:"cover"},styles.sliderImage}

                />
            </View>
            </Swiper>
            </View>
            <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBtn} onPress={()=>{navigation.navigate("Vaccination")}}>
            <View style={styles.categoryIcon}>
                <Ionicons name="play-outline" size={40} color="#4DAFC0" />
            </View>
            <Text style={styles.categoryBtnTxt}>Subscribe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={()=>{navigation.navigate("Subscription")}}>
            <View style={styles.categoryIcon}>
                <Ionicons name="newspaper-outline" size={40} color="#4DAFC0" />
            </View>
            <Text style={styles.categoryBtnTxt}>Vaccination</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={()=>{navigation.navigate("FAQ")}}>
            <View style={styles.categoryIcon}>
                <Ionicons name="help-circle-outline" size={45} color="#4DAFC0" />
            </View>
            <Text style={styles.categoryBtnTxt}>FAQs</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.cardsWrapper}>
                <Text style={{
                    alignSelf:"center",
                    fontSize:18,
                    fontWeight:'bold',
                    color:'#333',
                }}>View Places</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Charts")}>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image source={{
                            uri:"https://www.alliancebernstein.com/sites/library/uploads/AB_DoestheAmericanMallHaveaFuture-1600x760.w.jpg?uuid=c1205f68-0cdb-11ea-8ac7-361ef04bc852"}} style={{resizeMode:"cover"},styles.cardImg}/>
                    </View>
                    <View style ={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Orion Mall</Text>
                        <Text style={styles.cardDetails}>Generally crowded on Tuesdays and Weekends</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Charts")}>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image source={{
                            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-mHE4ZO_hxRoyynf_jpg5HikTJAQTQqdJ1A&usqp=CAU"}} style={{resizeMode:"cover"},styles.cardImg}/>
                    </View>
                    <View style ={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Trinity Lecture Hall</Text>
                        <Text style={styles.cardDetails}>Generally crowded on Mondays</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Charts")}>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image source={{
                            uri:"https://cdn.aarp.net/content/dam/aarp/travel/travel_tips/2017/11/1140-pool-deck-cruise-myths.imgcache.rev1aa03cf70a257e606a0970f813e77244.jpg"}} style={{resizeMode:"cover"},styles.cardImg}/>
                    </View>
                    <View style ={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Pool</Text>
                        <Text style={styles.cardDetails}>Generally crowded on weekends</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Charts")}>
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image source={{
                            uri:"https://m.media-amazon.com/images/M/MV5BMTg5MTMyNDk1OV5BMl5BanBnXkFtZTcwNDY4NDYyNA@@._V1_.jpg"}} style={{resizeMode:"cover"},styles.cardImg}/>
                    </View>
                    <View style ={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Club</Text>
                        <Text style={styles.cardDetails}>Generally crowded on Weekends</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        
      },
    
      wrapper: {},
    
      slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
      sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
      },
      categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        
      },
      categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
      },
      categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#CDF0EA' /* '#FF6347' */,
        borderRadius: 50,
      },
      categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#4DAFC0',
      },
      cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
      },
      card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      cardImgWrapper: {
        flex: 1,
      },
      cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
      },
      cardTitle: {
        fontWeight: 'bold',
      },
      cardDetails: {
        fontSize: 12,
        color: '#444',
      },
});

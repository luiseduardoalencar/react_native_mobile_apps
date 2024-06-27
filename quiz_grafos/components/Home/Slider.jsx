import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from './../../configs/FirebaseConfig' ;
import { FlatList } from 'react-native';

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);
    useEffect(()=>{
       GetSliderList() 
    },[]);

    const GetSliderList = async () =>{
        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(prev=>[...prev, doc.data()])
        })
    }
  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom: 5
      }}>
        Vídeos para treinar
      </Text>
      <FlatList
      data={[...sliderList].reverse()}
      horizontal={true}
      style={{
        paddingTop:30,
        paddingLeft:20}}
      renderItem = {({item,index})=> (
        <Image source = {{uri:item.imageUrl}}
        style = {{
            width:300,
            height: 150,
            borderRadius:15,
            marginRight:15
        }}/>
      )}
      />
    </View>
  )
}
import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import LevelItem from './LevelItem';
import { useRouter } from 'expo-router';

export default function Levels() {

  const [LevelsList, setLevelsList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetLevelsList()
  }, []);

  const GetLevelsList = async () => {
    setLevelsList([])
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLevelsList(prev => [...prev, doc.data()])
    })
  }

  return (
    <View>
      <View style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={{

          fontSize: 20,
          fontFamily: "outfit-bold",
          display: 'flex',
        }}>Enfrente os desafios
        </Text>
      </View>
        
      <FlatList
        data={[...LevelsList].reverse()}
        horizontal={true}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <LevelItem level={item} key={index} onLevelPress={(level)=>router.push('/quizzes/'+item.name)}/>
        )}
      />

    </View>
  )
}
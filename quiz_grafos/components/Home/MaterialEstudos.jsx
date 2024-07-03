import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import MaterialItemList from './MaterialItemList';
import { useRouter } from 'expo-router';

export default function MaterialEstudos() {
  const [Materiallist, setMateriallist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetMaterialList();
  }, []);

  const GetMaterialList = async () => {
    setMateriallist([]);
    const q = query(collection(db, 'MaterialEstudos'));
    const querySnapshot = await getDocs(q);

    const materials = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      materials.push({ id: doc.id, ...doc.data() });
    });
    setMateriallist(materials);
  };

  const handleMaterialPress = (material) => {
    router.push(`/materialdetails/${material.id}`);
  };

  return (
    <View>
      <View style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
          display: 'flex',
        }}>Material de Estudo
        </Text>
      </View>

      <FlatList
        data={Materiallist}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MaterialItemList materiallist={item} onPress={() => handleMaterialPress(item)} />
        )}
      />
    </View>
  );
}

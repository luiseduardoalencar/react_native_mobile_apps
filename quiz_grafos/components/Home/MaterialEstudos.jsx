import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import MaterialItemList from './MaterialItemList';

export default function MaterialEstudos() {
  const [Materiallist, setMateriallist] = useState([]);

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
      materials.push(doc.data());
    });
    setMateriallist(materials);
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MaterialItemList materiallist={item} />
        )}
      />
    </View>
  );
}

import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';

export default function MaterialDetails() {
  const { materialdetails } = useLocalSearchParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Material Detalhes'
    });
    fetchMaterialDetails();
  }, []);

  const fetchMaterialDetails = async () => {
    const docRef = doc(db, 'MaterialEstudos', materialdetails);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setMaterial(docSnap.data());
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={{ padding: 20 }}>
      {material ? (
        <>
          <Image
            source={{ uri: material?.ImageUrl || material?.imageUrl }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 15,
              marginBottom: 20
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{material.name}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Nível: {material.nivel}</Text>
          <Text style={{ fontSize: 16 }}>{material.sobre}</Text>
        </>
      ) : (
        <Text>Material não encontrado.</Text>
      )}
    </View>
  );
}

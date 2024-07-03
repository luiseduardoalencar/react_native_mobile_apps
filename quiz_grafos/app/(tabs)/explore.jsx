import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import MaterialItemList from '../../components/Home/MaterialItemList';
import { useRouter } from 'expo-router';

export default function Explore() {
  const [materialList, setMaterialList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMaterialList, setFilteredMaterialList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getMaterialList();
  }, []);

  useEffect(() => {
    filterMaterialList();
  }, [searchQuery, materialList]);

  const getMaterialList = async () => {
    const q = query(collection(db, 'MaterialEstudos'));
    const querySnapshot = await getDocs(q);
    const materials = [];
    querySnapshot.forEach((doc) => {
      materials.push({ id: doc.id, ...doc.data() });
    });
    setMaterialList(materials);
  };

  const filterMaterialList = () => {
    const filteredList = materialList.filter((material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterialList(filteredList);
  };

  const handleItemPress = (item) => {
    router.push(`/materialdetails/${item.id}`);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 20 }}>Explore mais</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder='Procure por um material...'
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredMaterialList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <MaterialItemList materiallist={item} onPress={() => handleItemPress(item)} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  searchInput: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    flex: 1,
  },
  listItem: {
    flex: 1,
    transform: [{ scale: 0.7 }],
    width: '100%',
    alignItems: 'center', // Centraliza os itens na horizontal
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});

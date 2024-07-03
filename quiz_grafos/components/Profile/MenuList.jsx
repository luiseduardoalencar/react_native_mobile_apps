import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function MenuList() {
  const { signOut } = useAuth();  // Correção: chamando useAuth()

  const menuList = [
    {
      id: 1,
      name: 'Logout',
      icon: require('./../../assets/images/logout.png'),
      path: 'logout'
    },
  ];

  const router = useRouter();

  const onMenuClick = (item) => {
    if (item.path === 'logout') {
      signOut();
      return;
    }
    router.push(item.path);
  };

  return (
    <View style={{
      marginTop: 50
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: '#fff'
            }}>
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              flex: 1
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

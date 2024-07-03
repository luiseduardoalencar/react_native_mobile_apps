import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function MaterialItemList({ materiallist, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginLeft: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 15
    }}>
      <Image
        source={{ uri: materiallist?.ImageUrl || materiallist?.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15
        }}
      />
      <View style={{
        marginTop: 7
      }}>
        <Text style={{
          fontFamily: 'outfit-bold'
        }}>{materiallist.name}</Text>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text
          style={{
            fontFamily: 'outfit',
            backgroundColor: Colors.PRIMARY,
            color: '#fff',
            padding: 3,
            fontSize: 12,
            borderRadius: 10
          }}
        >{materiallist.nivel}</Text>
      </View>
    </TouchableOpacity>
  );
}

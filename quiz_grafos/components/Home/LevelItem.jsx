import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function LevelItem({level, onLevelPress}) {
  return (
    <TouchableOpacity onPress={()=>onLevelPress(level)}>
    <View>
        <View style= {{
            paddingLeft:30,
            paddingRight:30,
            paddingBottom:10,
            backgroundColor:Colors.ICON_BG,
            borderRadius:99,
            marginRigth:15
        }}>
        <Image source = {{uri:level.icon}}
        style = {{width:50,
            height:50
        }} />

        </View>
        <Text style = {{fontSize:20, 
          fontFamily: "outfit-medium",
          textAlign:'center',
          marginTop:5
        }}>{level.name}</Text>

    </View>
    </TouchableOpacity>
  )
}
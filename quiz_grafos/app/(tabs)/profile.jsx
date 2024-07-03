import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList.jsx'


export default function profile() {
  return (
    <View style = {{padding: 20}}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 20 }}>Perfil</Text>
      <UserIntro/>
      <MenuList/>

    </View>
  )
}
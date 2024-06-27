import { ScrollView, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Levels from '../../components/Home/Levels'
import MaterialEstudos from '../../components/Home/MaterialEstudos'

export default function home() {
  return (
   
      <ScrollView>
        
        <Header />
        
        <Slider />
        <Levels />
        <MaterialEstudos />
        
        <View style = {{height:100}}>
        
      </View>
      </ScrollView>

      
    
  )
}
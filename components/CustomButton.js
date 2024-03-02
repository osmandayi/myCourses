import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomButton({label, style, styleText, onPress}) {
  return (
  <Pressable onPress={onPress}>
    <View style={style}>
      <Text style={styleText}>
        {label}
      </Text>
    </View>
  </Pressable>
  )
}

const styles = StyleSheet.create({})
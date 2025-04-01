import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const NotFoundScreen = () => {
  return (
    <>
    <Stack.Screen options={{title:'Ooops! Not FOund'}}/>
    <View>
        <Link href="/">
        Go back to Home Screen!
        </Link>
    </View>
    </>
  )
}

export default NotFoundScreen

const styles = StyleSheet.create({})
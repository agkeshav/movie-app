import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

export default function LoadingIndicator() {
  return (
    <View className="flex-1 bg-neutral-800 align-middle justify-center">
      <ActivityIndicator color={"#eab308"} size={60} />
    </View>
  );
}
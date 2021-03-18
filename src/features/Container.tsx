import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import NavigationStack from 'components/navigation/Drawer';
import {colors} from 'utils';

export function Container() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <NavigationStack />
    </SafeAreaView>
  );
}

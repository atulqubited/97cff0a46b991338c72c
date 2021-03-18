import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import {StackNavigationProp} from '@react-navigation/stack';
import {Posts, PostDetails} from 'features/Posts';

// type ProfileScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Profile'
// >;

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };

type RootStackParamList = {
  Post: undefined;
  PostDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const options = {
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

export const Routes = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
        cardStyle: {backgroundColor: 'transparent'},
      }}
      initialRouteName="Post">
      <Stack.Screen name="Post" component={Posts} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={options}
      />
    </Stack.Navigator>
  );
};

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllCourses from './screens/AllCourses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageCourse from './screens/ManageCourse';
import RecentCourses from './screens/RecentCourses';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CoursesContextProvider from './store/coursesContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
  return (
    <Tab.Navigator screenOptions={({navigation}) => ({
      headerStyle: {
        backgroundColor: 'pink',
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: 'pink',
      },
      tabBarActiveTintColor: 'darkblue',
      headerRight: () => (
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={() => {navigation.navigate("Manage")}}>
          <View style={styles.iconContainer}>
          <AntDesign name="plus" size={24} color="white" />
          </View>
        </Pressable>
      ),
    })}
    >
      <Tab.Screen name="RecentCourses" component={RecentCourses} options={{
        title: 'Yakın Zamanda Kaydolunanlar',
        tabBarLabel: 'Yakın Zamanda',
        tabBarIcon: ({color, size}) => (<AntDesign name="hourglass" size={size} color={color} />),
      }} />
      <Tab.Screen name="AllCourses" options={{
        title: 'Tüm Kurslar',
        tabBarLabel: 'Tüm Kurslar',
        tabBarIcon: ({color, size}) => (<Entypo name="list" size={size} color={color} />),
      }} component={AllCourses} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CoursesContextProvider>
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="CourseOverview" component={CourseOverview} />
        <Stack.Screen name="Manage" component={ManageCourse} />
      </Stack.Navigator>
    </NavigationContainer>
    </CoursesContextProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: .55,
  },
});

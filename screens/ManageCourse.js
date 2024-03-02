import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'
import CourseForm from '../components/form/CourseForm';

export default function ManageCourse({route, navigation}) {
  const coursesContext = useContext(CoursesContext)

  const courseId = route.params?.courseId;
  let isEditing = false;


  if(courseId){
    isEditing=true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Kursu Güncelle" : 'Kurs Ekle'
    })
  }, [navigation, isEditing]);


  const deleteCourse = () => {
    navigation.goBack();
    coursesContext.deleteCourse(courseId);
  }
  
  const cancelHandler = () => {
    navigation.goBack();
  }
  
  const addOrUpdateHandler = () => {
    if(isEditing){
      coursesContext.updateCourse(courseId, {description: 'Calm Down', amount: 55, date: new Date()});
    }
    else{
      coursesContext.addCourse({description: 'Calm Down, I added', amount: 75, date: new Date()});
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <CourseForm />
      <View style={styles.buttons}>
      <CustomButton onPress={cancelHandler} style={styles.cancel} styleText={styles.cancelText} label={"İptal Et"} />
      <CustomButton onPress={addOrUpdateHandler} style={styles.addOrUpdate} styleText={styles.addOrUpdateText} label={isEditing ? "Güncelle" : "Ekle"} />
      </View>
      {
        isEditing && <View style={styles.deleteContainer}>
          <EvilIcons name="trash" size={36} color="black" onPress={deleteCourse}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  deleteContainer: {
    alignItems:'center',
    borderTopWidth: 2,
    borderTopColor: 'blue',
    paddingTop: 10,
    marginTop: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  cancel: {
    backgroundColor: 'red',
    minWidth: 120,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color:'white',
  },
  addOrUpdate: {
    backgroundColor: 'blue',
    minWidth: 120,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOrUpdateText: {
    color:'white',
  },
})
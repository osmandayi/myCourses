import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'
import CourseForm from '../components/form/CourseForm';
import { deletedCourse, storeCourse, updateCourse } from '../helper/http';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function ManageCourse({route, navigation}) {
  const coursesContext = useContext(CoursesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const courseId = route.params?.courseId;
  let isEditing = false;

  const selectedCourse = coursesContext.courses.find((course) => course.id === courseId);


  console.log("SELECTED COURSE :", selectedCourse);


  if(courseId){
    isEditing=true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Kursu Güncelle" : 'Kurs Ekle'
    })
  }, [navigation, isEditing]);




  const deleteCourse = async() => {
    setIsSubmitting(true);
    setError(null);
    try {
      coursesContext.deleteCourse(courseId);
      await deletedCourse(courseId);
      navigation.goBack();
    } catch (error) {
      setError('Kurs silinemedi !');
      setIsSubmitting(false);
    }
  }
  
  const cancelHandler = () => {
    navigation.goBack();
  }
  
  const addOrUpdateHandler = async(courseData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if(isEditing){
        coursesContext.updateCourse(courseId, courseData);
        await updateCourse(courseId, courseData);
      }
      else{
        const id = await storeCourse(courseData);
        coursesContext.addCourse({...courseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Kurs ekleme veya güncellemede bir problem oluştu !');
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting){
    return <ErrorText message={error} />
  }

  if(isSubmitting){
    return <LoadingSpinner />
  }
  return (
    <View style={styles.container}>
      <CourseForm cancelHandler={cancelHandler} defaultValues={selectedCourse} onSubmit={addOrUpdateHandler} buttonLabel={isEditing ? "Güncelle" : "Ekle"} />
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
})
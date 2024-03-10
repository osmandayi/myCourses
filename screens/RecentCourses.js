import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Courses from '../components/Courses'

import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'
import { getLastWeek } from '../helper/date'
import { getCourses } from '../helper/http'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorText from '../components/ErrorText'

export default function RecentCourses() {
  const coursesContext = useContext(CoursesContext);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {
    const takeCourses = async() => {
      setError(null);
      setLoading(true);
      try {
        const courses = await getCourses();
      coursesContext.setCourses(courses);
      } catch (error) {
        setError('Kursları çekemedik !');
      }
      setLoading(false);
    }
    takeCourses();
  }, []);


  if(error && !loading){
    return <ErrorText message={error} />
  }

  if(loading){
    return <LoadingSpinner />
  }

  const recentCourses = coursesContext?.courses?.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);
    return course.date >= dateLastWeek && course.date <= today;
  })

  return (
    <Courses courses={recentCourses} coursesPeriod="Son 1 Hafta" nullText={"Yakın zamanda herhangi bir kursa kayıt olmadınız !"} />
  )
}

const styles = StyleSheet.create({})
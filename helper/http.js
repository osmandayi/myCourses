import axios from "axios";

const URL = 'https://reactnative-mycourses-default-rtdb.firebaseio.com'

export const storeCourse = async(courseData) => {
   const response = await axios.post(URL+'/courses.json', courseData);
 
   const id = response.data.name;

   return id;
}

export const getCourses = async() => {
    const response = await axios.get(URL+'/courses.json');
    const courses = [];
    for(const key in response.data){
        const courseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }

        courses.push(courseObj);
    }


    return courses;
}


export const updateCourse = (id, courseData) => {
    return axios.put(URL+`/courses/${id}.json`, courseData);
 }
 export const deletedCourse = async(id) => {
    return axios.delete(URL+`/courses/${id}.json`);
 }
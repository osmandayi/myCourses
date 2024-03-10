import { createContext, useReducer } from "react";




export const CoursesContext = createContext({
    courses: [],
    addCourse: ({description, amount, date}) => {},
    deleteCourse: (id) => {},
    setCourses: (courses) => {},
    updateCourse: (id, {description, amount, date}) => {},
})


function coursesReducer(state, action){
    switch(action.type){
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();

            return [action.payload, ...state];
        case 'UPDATE':
            const updatableCourseIndex = state.findIndex((course) => course.id === action.payload.id);
            const updatableCourse = state[updatableCourseIndex];
            const updatedItem = {...updatableCourse, ...action.payload.data}; // id dışındakiler değişmiş olacak
            const updatedCourses = [...state];
            updatedCourses[updatableCourseIndex] = updatedItem;
            return updatedCourses;
        case 'DELETE':
        return state.filter((course) => course.id !== action.payload)
        case 'SET':
          const reversedData = action.payload.reverse();
          return reversedData;
        default:
            return state;
    }
}


function CoursesContextProvider({children}){

    const [coursesState, dispatch] = useReducer(coursesReducer, []);

    function addCourse(courseData){
        dispatch({type: "ADD", payload: courseData})
    }
    function deleteCourse(id){
        dispatch({type: "DELETE", payload: id})
    }
    function setCourses(courses){
        dispatch({type: "SET", payload: courses})
    }
    function updateCourse(id,courseData){
        dispatch({type: "UPDATE", payload: {id: id, data: courseData}})
    }


    const value = {
        courses: coursesState,
        setCourses: setCourses,
        addCourse: addCourse,
        deleteCourse: deleteCourse,
        updateCourse: updateCourse,
    }

    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    )
}


export default CoursesContextProvider
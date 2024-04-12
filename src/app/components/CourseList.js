"use client"
import { useState, useEffect } from 'react'
import CourseItem from "@/app/components/CourseItem";
import Loader from "@/app/components/Loader";

export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        fetch('/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data.courses)).
            finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="p-3">
            <h1 className="text-4xl font-medium text-center mt-2 mb-4">Liste des cours</h1>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                {courses.map(course => (
                    <CourseItem key={course.id} course={course} />
                ))}
            </ul>
        </div>
    )
}
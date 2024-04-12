"use client"
import { useState, useEffect } from 'react'
import CourseItem from "@/app/components/CourseItem";

export default function CourseList() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data.courses))
    }, [])

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
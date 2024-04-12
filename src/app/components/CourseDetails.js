"use client"
import { useState, useEffect } from 'react'
import Loader from "@/app/components/Loader";

export default function CourseDetails({ courseId }) {

    const [course, setCourse] = useState(null)
    useEffect(() => {
        fetch(`/api/courses/${courseId}`)
            .then(res => res.json())
            .then(data => setCourse(data.course))
    }, [courseId])

    return (
        <div>
            {course ? (
                <div className="max-w-5xl mx-auto mt-14 flex flex-col gap-6">
                    <h1 className="text-3xl">TITRE: {course.title}</h1>
                    <p>DESCRIPTION: {course.description}</p>
                    <p>AUTEUR: {course.teacher.name}</p>
                    <p>NB DE LEÇONS: {course.lessons.length}</p>
                    <ul className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                        {course.lessons.map(lesson => (
                            <li key={lesson.id} className="border border-slate-200 shadow p-4 rounded">
                                <h2 className="text-lg font-medium mb-4">{lesson.order}: {lesson.title}</h2>
                                <a href="" className="btn">Commencer</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}
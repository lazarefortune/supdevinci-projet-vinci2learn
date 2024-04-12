import Link from "next/link.js";


export default function CourseItem({ course }) {
    return (
        <li className="bg-white shadow p-4 rounded-lg flex flex-col gap-6 border border-slate-100">
            <h1 className="text-xl font-bold">{course.title}</h1>
            <p className="text-slate-500">
                <span className="text-slate-500 italic text-sm">Auteur: </span>
                {course.teacher.name}</p>
            <p>Nombres de leçons: {course.lessons.length}</p>
            <Link className="btn" href={`/courses/${course.id}`}>
                Voir le cours
            </Link>
        </li>
    )
}
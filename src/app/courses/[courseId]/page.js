import CourseDetails from "@/app/components/CourseDetails";

export default function CourseDetailsPage({params}) {
    const {courseId} = params
    return (
        <div>
            <CourseDetails courseId={courseId} />
        </div>
    )
}
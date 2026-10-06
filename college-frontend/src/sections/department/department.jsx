import { useEffect, useState } from 'react';
import { getCourses } from '../../api/courseApi';
import './department.css';

function CourseIcon() {
    return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="8" y="7" width="32" height="25" rx="3" />
            <path d="m18 16-5 4 5 4" />
            <path d="m30 16 5 4-5 4" />
            <path d="m27 14-6 12" />
            <path d="M5 37h38l-4 5H9l-4-5Z" />
            <path d="M19 37h10" />
        </svg>
    );
}

export default function Department() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadCourses() {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                console.error('Failed to load courses:', err);
                setError(
                    'Unable to load academic programmes right now.'
                );
            } finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, []);

    return (
        <section className="academic-section" id="departments">
            <div className="academic-inner">
                <header className="academic-header">
                    <div className="academic-eyebrow">
                        <span />
                        Our Academic Programmes
                        <span />
                    </div>

                    <h2>
                        Explore Our <em>Courses</em>
                    </h2>

                    <p>
                        Discover the academic programmes offered by
                        our college and find the path that interests you.
                    </p>
                </header>

                {loading ? (
                    <p className="course-status" role="status">
                        Loading academic programmes...
                    </p>
                ) : error ? (
                    <p className="course-status" role="alert">
                        {error}
                    </p>
                ) : courses.length === 0 ? (
                    <p className="course-status">
                        No academic programmes are available yet.
                    </p>
                ) : (
                    <div className="academic-grid">
                        {courses.map((course) => (
                            <article
                                className="department-card"
                                key={course.id}
                            >
                                <div className="department-card-top">
                                    <div className="department-icon">
                                        <CourseIcon />
                                    </div>

                                    <div className="department-title-group">
                                        <span className="department-level">
                                            {course.programmeType}
                                        </span>

                                        <h3>{course.name}</h3>
                                    </div>
                                </div>

                                <div className="department-divider" />

                                <p className="department-description">
                                    {course.description}
                                </p>

                                <div className="department-courses">
                                    <span className="programme-label">
                                        Programme Duration
                                    </span>

                                    <ul>
                                        <li>
                                            <span className="course-bullet">
                                                →
                                            </span>
                                            {course.duration}
                                        </li>
                                    </ul>
                                </div>

                                <div className="department-card-wave" />
                            </article>
                        ))}
                    </div>
                )}

                <footer className="academic-footer">
                    <span />
                    <p>
                        Knowledge builds careers,
                        <br />
                        but character builds the future.
                    </p>
                    <span />
                </footer>
            </div>
        </section>
    );
}

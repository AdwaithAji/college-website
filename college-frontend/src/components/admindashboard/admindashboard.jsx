import { useState, useEffect } from "react";
import "./admindashboard.css";

import RankAdmin from "../rankadmin/RankAdmin";

import {
    getNotices,
    addNotice,
    deleteNotice,
} from "../../api/noticeApi";

import {
    getCourses,
    addCourse,
    deleteCourse,
} from "../../api/courseApi";

import {
    getPendingImages,
    approveGalleryImage,
    rejectGalleryImage,
} from "../../api/galleryApi";


const sections = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "notices", label: "Notices", icon: "▤" },
    { id: "gallery", label: "Gallery", icon: "▧" },
    { id: "departments", label: "Departments", icon: "▥" },
    { id: "rankholders", label: "Rank Holders", icon: "★" },
];


function NoticeManagement() {

    const [notices, setNotices] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    async function loadNotices() {

        setLoading(true);
        setError("");

        try {

            const data = await getNotices();

            setNotices(data);

        } catch (err) {

            setError(
                err.message || "Failed to load notices."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadNotices();
    }, []);


    async function handleSubmit(event) {

        event.preventDefault();

        setSaving(true);
        setError("");
        setMessage("");

        try {

            const result = await addNotice({
                title: title.trim(),
                description: description.trim(),
                category: category.trim(),
            });

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message || "Could not create notice."
                );
            }

            if (result.data) {

                setNotices((current) => [
                    result.data,
                    ...current,
                ]);

            } else {

                await loadNotices();
            }

            setTitle("");
            setDescription("");
            setCategory("General");

            setMessage(
                "Notice created successfully."
            );

        } catch (err) {

            setError(
                err.message || "Failed to create notice."
            );

        } finally {

            setSaving(false);
        }
    }


    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this notice?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);
        setError("");
        setMessage("");

        try {

            const result = await deleteNotice(id);

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message || "Could not delete notice."
                );
            }

            setNotices((current) =>
                current.filter(
                    (notice) => notice.id !== id
                )
            );

            setMessage(
                "Notice deleted successfully."
            );

        } catch (err) {

            setError(
                err.message || "Failed to delete notice."
            );

        } finally {

            setDeletingId(null);
        }
    }


    return (
        <div className="notice-management">

            <div className="notice-management-heading">

                <div>

                    <h2>Notice Management</h2>

                    <p>
                        Create and manage college announcements.
                    </p>

                </div>

                <button
                    type="button"
                    className="notice-refresh-button"
                    onClick={loadNotices}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            <form
                className="notice-form"
                onSubmit={handleSubmit}
            >

                <h3>Create a notice</h3>

                <label htmlFor="notice-title">
                    Title
                </label>

                <input
                    id="notice-title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Enter notice title"
                    maxLength={200}
                    required
                />


                <label htmlFor="notice-category">
                    Category
                </label>

                <select
                    id="notice-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value)
                    }
                    required
                >
                    <option value="General">
                        General
                    </option>

                    <option value="Academic">
                        Academic
                    </option>

                    <option value="Examination">
                        Examination
                    </option>

                    <option value="Events">
                        Events
                    </option>

                    <option value="Admissions">
                        Admissions
                    </option>
                </select>


                <label htmlFor="notice-description">
                    Description
                </label>

                <textarea
                    id="notice-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Write the notice details"
                    rows={4}
                    maxLength={5000}
                    required
                />


                {error && (
                    <p
                        className="notice-feedback error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}


                {message && (
                    <p
                        className="notice-feedback success"
                        role="status"
                    >
                        {message}
                    </p>
                )}


                <button
                    type="submit"
                    className="notice-submit-button"
                    disabled={saving}
                >
                    {saving
                        ? "Publishing..."
                        : "Publish Notice"}
                </button>

            </form>


            <div className="notice-list">

                <div className="notice-list-heading">

                    <h3>
                        Published notices
                    </h3>

                    <span>
                        {notices.length} notices
                    </span>

                </div>


                {loading ? (

                    <p className="notice-empty">
                        Loading notices...
                    </p>

                ) : error && notices.length === 0 ? (

                    <p className="notice-empty">
                        Could not load notices. Check your
                        connection and try Refresh.
                    </p>

                ) : notices.length === 0 ? (

                    <p className="notice-empty">
                        No notices published yet.
                    </p>

                ) : (

                    <div className="notice-list-items">

                        {notices.map((notice) => (

                            <article
                                className="notice-admin-card"
                                key={notice.id}
                            >

                                <div className="notice-admin-card-content">

                                    <span className="notice-category">
                                        {notice.category}
                                    </span>

                                    <h4>
                                        {notice.title}
                                    </h4>

                                    <p>
                                        {notice.description}
                                    </p>

                                    <small>
                                        {notice.publishedAt
                                            ? new Date(
                                                notice.publishedAt
                                            ).toLocaleString()
                                            : "Publication date unavailable"}
                                    </small>

                                </div>


                                <button
                                    type="button"
                                    className="notice-delete-button"
                                    onClick={() =>
                                        handleDelete(notice.id)
                                    }
                                    disabled={
                                        deletingId === notice.id
                                    }
                                >
                                    {deletingId === notice.id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}



function DepartmentManagement() {

    const [courses, setCourses] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [programmeType, setProgrammeType] = useState("UG");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    async function loadCourses() {

        setLoading(true);
        setError("");

        try {

            const data = await getCourses();

            setCourses(data);

        } catch (err) {

            setError(
                err.message || "Failed to load courses."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadCourses();
    }, []);


    async function handleSubmit(event) {

        event.preventDefault();

        setSaving(true);
        setError("");
        setMessage("");

        try {

            const result = await addCourse({
                name: name.trim(),
                description: description.trim(),
                duration: duration.trim(),
                programmeType: programmeType.trim(),
            });

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message || "Could not create course."
                );
            }

            if (result.data) {

                setCourses((current) => [
                    ...current,
                    result.data,
                ]);

            } else {

                await loadCourses();
            }

            setName("");
            setDescription("");
            setDuration("");
            setProgrammeType("UG");

            setMessage(
                "Course added successfully."
            );

        } catch (err) {

            setError(
                err.message || "Failed to add course."
            );

        } finally {

            setSaving(false);
        }
    }


    async function handleDelete(id, courseName) {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${courseName}"?`
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);
        setError("");
        setMessage("");

        try {

            const result = await deleteCourse(id);

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message || "Could not delete course."
                );
            }

            setCourses((current) =>
                current.filter(
                    (course) => course.id !== id
                )
            );

            setMessage(
                "Course deleted successfully."
            );

        } catch (err) {

            setError(
                err.message || "Failed to delete course."
            );

        } finally {

            setDeletingId(null);
        }
    }


    return (
        <div className="department-management">

            <div className="department-management-heading">

                <div>

                    <h2>
                        Department Management
                    </h2>

                    <p>
                        Add academic programmes and manage
                        existing courses.
                    </p>

                </div>

                <button
                    type="button"
                    className="notice-refresh-button"
                    onClick={loadCourses}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            <form
                className="notice-form"
                onSubmit={handleSubmit}
            >

                <h3>
                    Add an academic programme
                </h3>


                <label htmlFor="course-name">
                    Course name
                </label>

                <input
                    id="course-name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="e.g. Bachelor of Computer Applications"
                    maxLength={200}
                    required
                />


                <label htmlFor="course-description">
                    Description
                </label>

                <textarea
                    id="course-description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    placeholder="Describe the academic programme"
                    rows={3}
                    maxLength={3000}
                    required
                />


                <div className="department-form-row">

                    <div>

                        <label htmlFor="course-duration">
                            Duration
                        </label>

                        <input
                            id="course-duration"
                            value={duration}
                            onChange={(event) =>
                                setDuration(event.target.value)
                            }
                            placeholder="e.g. 3 Years"
                            maxLength={100}
                            required
                        />

                    </div>


                    <div>

                        <label htmlFor="course-programme-type">
                            Programme type
                        </label>

                        <select
                            id="course-programme-type"
                            value={programmeType}
                            onChange={(event) =>
                                setProgrammeType(event.target.value)
                            }
                            required
                        >
                            <option value="FYUGP">
                                FYUGP
                            </option>

                            <option value="PG">
                                PG
                            </option>

                            <option value="UG">
                                UG
                            </option>

                            <option value="Research Programmes">
                                Research Programmes
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                    </div>

                </div>


                {error && (
                    <p
                        className="notice-feedback error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}


                {message && (
                    <p
                        className="notice-feedback success"
                        role="status"
                    >
                        {message}
                    </p>
                )}


                <button
                    type="submit"
                    className="notice-submit-button"
                    disabled={saving}
                >
                    {saving ? "Adding..." : "Add Course"}
                </button>

            </form>


            <div className="department-course-list">

                <div className="notice-list-heading">

                    <h3>
                        Existing courses
                    </h3>

                    <span>
                        {courses.length} courses
                    </span>

                </div>


                {loading ? (

                    <p className="notice-empty">
                        Loading courses...
                    </p>

                ) : courses.length === 0 ? (

                    <p className="notice-empty">
                        No courses have been added yet.
                    </p>

                ) : (

                    <div className="department-course-items">

                        {courses.map((course) => (

                            <article
                                className="department-admin-card"
                                key={course.id}
                            >

                                <div className="department-admin-card-content">

                                    <span className="department-admin-type">
                                        {course.programmeType}
                                    </span>

                                    <h4>
                                        {course.name}
                                    </h4>

                                    <p>
                                        {course.description}
                                    </p>

                                    <small>
                                        Duration: {course.duration}
                                    </small>

                                </div>


                                <button
                                    type="button"
                                    className="notice-delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            course.id,
                                            course.name
                                        )
                                    }
                                    disabled={
                                        deletingId === course.id
                                    }
                                >
                                    {deletingId === course.id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}



function GalleryManagement() {

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    async function loadPendingImages() {

        setLoading(true);
        setError("");

        try {

            const result = await getPendingImages();

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message ||
                    "Could not load pending images."
                );
            }

            setImages(
                Array.isArray(result.data)
                    ? result.data
                    : []
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to load pending images."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadPendingImages();
    }, []);


    async function handleReview(id, action) {

        const actionLabel =
            action === "approve"
                ? "approve"
                : "reject";

        if (
            !window.confirm(
                `Are you sure you want to ${actionLabel} this image?`
            )
        ) {
            return;
        }

        setProcessingId(id);
        setError("");
        setMessage("");

        try {

            const result =
                action === "approve"
                    ? await approveGalleryImage(id)
                    : await rejectGalleryImage(id);

            if (
                result.status?.toLowerCase() !==
                "success"
            ) {

                throw new Error(
                    result.message ||
                    `Could not ${actionLabel} image.`
                );
            }

            setImages((current) =>
                current.filter(
                    (image) =>
                        image.imageId !== id
                )
            );

            setMessage(
                action === "approve"
                    ? "Image approved successfully."
                    : "Image rejected successfully."
            );

        } catch (err) {

            setError(
                err.message ||
                `Failed to ${actionLabel} image.`
            );

        } finally {

            setProcessingId(null);
        }
    }


    return (
        <div className="gallery-management">

            <div className="gallery-management-heading">

                <div>

                    <h2>
                        Gallery Review
                    </h2>

                    <p>
                        Review submitted photos before they
                        appear in the public gallery.
                    </p>

                </div>

                <button
                    type="button"
                    className="notice-refresh-button"
                    onClick={loadPendingImages}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            {error && (
                <p
                    className="notice-feedback error"
                    role="alert"
                >
                    {error}
                </p>
            )}


            {message && (
                <p
                    className="notice-feedback success"
                    role="status"
                >
                    {message}
                </p>
            )}


            <div className="gallery-pending-heading">

                <h3>
                    Pending images
                </h3>

                <span>
                    {images.length} awaiting review
                </span>

            </div>


            {loading ? (

                <p className="notice-empty">
                    Loading pending images...
                </p>

            ) : images.length === 0 ? (

                <p className="notice-empty">
                    There are no images waiting for approval.
                </p>

            ) : (

                <div className="gallery-pending-grid">

                    {images.map((image) => (

                        <article
                            className="gallery-pending-card"
                            key={image.imageId}
                        >

                            <img
                                src={`http://localhost:8080/gallery/image/${image.imageId}`}
                                alt={
                                    image.caption ||
                                    "Submitted gallery image"
                                }
                                loading="lazy"
                            />


                            <div className="gallery-pending-card-body">

                                <p className="gallery-pending-caption">
                                    {image.caption ||
                                        "No caption provided"}
                                </p>

                                <small>
                                    {image.uploadedAt
                                        ? new Date(
                                            image.uploadedAt
                                        ).toLocaleString()
                                        : "Upload date unavailable"}
                                </small>


                                <div className="gallery-review-actions">

                                    <button
                                        type="button"
                                        className="gallery-approve-button"
                                        onClick={() =>
                                            handleReview(
                                                image.imageId,
                                                "approve"
                                            )
                                        }
                                        disabled={
                                            processingId ===
                                            image.imageId
                                        }
                                    >
                                        {processingId ===
                                        image.imageId
                                            ? "Please wait..."
                                            : "Approve"}
                                    </button>


                                    <button
                                        type="button"
                                        className="gallery-reject-button"
                                        onClick={() =>
                                            handleReview(
                                                image.imageId,
                                                "reject"
                                            )
                                        }
                                        disabled={
                                            processingId ===
                                            image.imageId
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </div>
    );
}



export default function AdminDashboard({
    onLogout,
    onClose,
}) {

    const [activeSection, setActiveSection] =
        useState("dashboard");


    const activeItem = sections.find(
        (section) =>
            section.id === activeSection
    );


    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                <div className="admin-sidebar-brand">

                    <div className="admin-sidebar-logo">
                        N
                    </div>

                    <div>

                        <h2>
                            NSS COLLEGE
                        </h2>

                        <p>
                            ADMINISTRATION
                        </p>

                    </div>

                </div>


                <div className="admin-sidebar-label">
                    MAIN MENU
                </div>


                <nav className="admin-sidebar-nav">

                    {sections.map((section) => (

                        <button
                            key={section.id}
                            type="button"
                            className={
                                activeSection === section.id
                                    ? "admin-nav-item active"
                                    : "admin-nav-item"
                            }
                            onClick={() =>
                                setActiveSection(
                                    section.id
                                )
                            }
                        >

                            <span className="admin-nav-icon">
                                {section.icon}
                            </span>

                            {section.label}

                        </button>

                    ))}

                </nav>


                <div className="admin-sidebar-footer">

                    <div className="admin-user-avatar">
                        A
                    </div>


                    <div className="admin-user-info">

                        <strong>
                            Administrator
                        </strong>

                        <span>
                            College Admin
                        </span>

                    </div>


                    <button
                        type="button"
                        className="admin-close-button"
                        onClick={onClose}
                        title="Exit Admin Panel"
                        aria-label="Exit Admin Panel"
                    >
                        ✕
                    </button>


                    <button
                        type="button"
                        className="admin-logout-button"
                        onClick={() => {

                            const confirmed =
                                window.confirm(
                                    "Are you sure you want to log out?"
                                );

                            if (confirmed) {
                                onLogout();
                            }

                        }}
                        title="Logout"
                        aria-label="Logout"
                    >
                        ↪
                    </button>

                </div>

            </aside>


            <main className="admin-main">

                <header className="admin-topbar">

                    <div>

                        <p className="admin-breadcrumb">
                            Administration /{" "}
                            {activeItem.label}
                        </p>

                        <h1>
                            {activeItem.label}
                        </h1>

                    </div>


                    <div className="admin-topbar-right">

                        <span className="admin-status-dot" />

                        <span>
                            Admin Workspace
                        </span>

                    </div>

                </header>


                <section className="admin-content">

                    {activeSection === "dashboard" && (

                        <>

                            <div className="admin-welcome">

                                <div>

                                    <h2>
                                        Welcome back, Admin
                                    </h2>

                                    <p>
                                        Manage your college website
                                        content from one place.
                                    </p>

                                </div>


                                <div className="admin-welcome-symbol">
                                    N
                                </div>

                            </div>


                            <div className="admin-section-heading">

                                <h2>
                                    Website Management
                                </h2>

                                <p>
                                    Select a section to manage its
                                    content.
                                </p>

                            </div>


                            <div className="admin-management-grid">

                                {sections
                                    .filter(
                                        (section) =>
                                            section.id !==
                                            "dashboard"
                                    )
                                    .map((section) => (

                                        <button
                                            key={section.id}
                                            type="button"
                                            className="admin-management-card"
                                            onClick={() =>
                                                setActiveSection(
                                                    section.id
                                                )
                                            }
                                        >

                                            <span className="admin-card-icon">
                                                {section.icon}
                                            </span>

                                            <h3>
                                                {section.label}
                                            </h3>

                                            <p>
                                                Manage college{" "}
                                                {section.label.toLowerCase()}
                                            </p>

                                            <span className="admin-card-arrow">
                                                →
                                            </span>

                                        </button>

                                    ))}

                            </div>

                        </>

                    )}


                    {activeSection === "notices" && (
                        <NoticeManagement />
                    )}


                    {activeSection === "gallery" && (
                        <GalleryManagement />
                    )}


                    {activeSection === "departments" && (
                        <DepartmentManagement />
                    )}


                    {activeSection === "rankholders" && (
                        <RankAdmin />
                    )}

                </section>

            </main>

        </div>
    );
}
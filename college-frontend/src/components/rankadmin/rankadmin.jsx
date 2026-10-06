import { useEffect, useState } from "react";
import "./rankadmin.css";

import {
    getRankHolders,
    addRankHolder,
    deleteRankHolder,
} from "../../api/rankApi";


function RankAdmin() {

    const [rankHolders, setRankHolders] = useState([]);

    const [name, setName] = useState("");
    const [rank, setRank] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    async function loadRankHolders() {

        setLoading(true);
        setError("");

        try {

            const result = await getRankHolders();

            console.log("Rank API response:", result);

            if (result.status?.toLowerCase() !== "success") {
                throw new Error(
                    result.message ||
                    "Could not load rank holders."
                );
            }

            const data = Array.isArray(result.data)
                ? result.data
                : [];

            console.log("Rank holders received:", data);

            setRankHolders(data);

        } catch (err) {

            setError(
                err.message ||
                "Failed to load rank holders."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadRankHolders();
    }, []);


    async function handleSubmit(event) {

        event.preventDefault();

        setSaving(true);
        setError("");
        setMessage("");

        if (!image) {

            setError("Please select a student image.");
            setSaving(false);

            return;
        }

        try {

            const formData = new FormData();

            formData.append("name", name.trim());
            formData.append("rank", rank.trim());
            formData.append("year", year);
            formData.append("department", department.trim());
            formData.append("image", image);

            const result = await addRankHolder(formData);

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message ||
                    "Could not create rank holder."
                );
            }

            setName("");
            setRank("");
            setYear("");
            setDepartment("");
            setImage(null);

            event.target.reset();

            await loadRankHolders();

            setMessage(
                "Rank holder added successfully."
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to add rank holder."
            );

        } finally {

            setSaving(false);
        }
    }


    async function handleDelete(userId, studentName) {
   
        if (!userId) {
            setError("Rank holder ID is missing.");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${studentName}"?`
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(userId);
        setError("");
        setMessage("");

        try {

            const result = await deleteRankHolder(userId);

            if (result.status?.toLowerCase() !== "success") {

                throw new Error(
                    result.message ||
                    "Could not delete rank holder."
                );
            }

            setRankHolders((current) =>
                current.filter(
                    (rankHolder) =>
                        rankHolder.userId !== userId
                )
            );

            setMessage(
                "Rank holder deleted successfully."
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to delete rank holder."
            );

        } finally {

            setDeletingId(null);
        }
    }


    return (
        <div className="rank-admin-management">

            {/* Header */}

            <div className="rank-admin-heading">

                <div>

                    <h2>
                        Rank Holder Management
                    </h2>

                    <p>
                        Add and manage university rank holders
                        displayed on the college website.
                    </p>

                </div>

                <button
                    type="button"
                    className="notice-refresh-button"
                    onClick={loadRankHolders}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            {/* Add Rank Holder */}

            <form
                className="rank-admin-form"
                onSubmit={handleSubmit}
            >

                <h3>
                    Add a University Topper
                </h3>


                <label htmlFor="rank-name">
                    Student Name
                </label>

                <input
                    id="rank-name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Enter student name"
                    maxLength={200}
                    required
                />


                <div className="rank-admin-form-row">

                    <div>

                        <label htmlFor="rank-position">
                            Rank
                        </label>

                        <input
                            id="rank-position"
                            value={rank}
                            onChange={(event) =>
                                setRank(event.target.value)
                            }
                            placeholder="e.g. 1st Rank"
                            maxLength={50}
                            required
                        />

                    </div>


                    <div>

                        <label htmlFor="rank-year">
                            Year
                        </label>

                        <input
                            id="rank-year"
                            type="number"
                            value={year}
                            onChange={(event) =>
                                setYear(event.target.value)
                            }
                            placeholder="e.g. 2026"
                            min="1900"
                            max="2100"
                            required
                        />

                    </div>

                </div>


                <label htmlFor="rank-department">
                    Department
                </label>

                <input
                    id="rank-department"
                    value={department}
                    onChange={(event) =>
                        setDepartment(event.target.value)
                    }
                    placeholder="e.g. BCA"
                    maxLength={200}
                    required
                />


                <label htmlFor="rank-image">
                    Student Photo
                </label>

                <input
                    id="rank-image"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(event) =>
                        setImage(
                            event.target.files[0] || null
                        )
                    }
                    required
                />


                {image && (
                    <p className="rank-selected-file">
                        Selected: {image.name}
                    </p>
                )}


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
                        ? "Adding..."
                        : "Add Rank Holder"}
                </button>

            </form>


            {/* Existing Rank Holders */}

            <div className="rank-admin-list">

                <div className="notice-list-heading">

                    <h3>
                        Existing Rank Holders
                    </h3>

                    <span>
                        {rankHolders.length} rank holders
                    </span>

                </div>


                {loading ? (

                    <p className="notice-empty">
                        Loading rank holders...
                    </p>

                ) : error && rankHolders.length === 0 ? (

                    <p className="notice-empty">
                        Could not load rank holders.
                        Check your connection and try Refresh.
                    </p>

                ) : rankHolders.length === 0 ? (

                    <p className="notice-empty">
                        No rank holders have been added yet.
                    </p>

                ) : (

                    <div className="rank-admin-list-items">

                        {rankHolders.map((rankHolder) => {

                            console.log(
                                "Rank holder:",
                                rankHolder
                            );

                            return (

                                <article
                                    className="rank-admin-card"
                                    key={rankHolder.userId}
                                >

                                    <img
                                        className="rank-admin-card-image"
                                        src={`http://localhost:8080${rankHolder.imageUrl}`}
                                        alt={rankHolder.name}
                                    />


                                    <div className="rank-admin-card-content">

                                        <span className="rank-admin-card-rank">
                                            ★ {rankHolder.rank}
                                        </span>

                                        <h4>
                                            {rankHolder.name}
                                        </h4>

                                        <p>
                                            {rankHolder.department}
                                        </p>

                                        <small>
                                            Academic Year: {rankHolder.year}
                                        </small>

                                    </div>


                                    <button
                                        type="button"
                                        className="notice-delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                rankHolder.userId,
                                                rankHolder.name
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            rankHolder.userId
                                        }
                                    >
                                        {deletingId ===
                                        rankHolder.userId
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>

                                </article>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
}


export default RankAdmin;
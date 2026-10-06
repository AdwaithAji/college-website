import { useEffect, useState } from "react";
import "./rankholders.css";

import { getRankHolders } from "../../api/rankApi";


function RankHolders() {

    const [rankHolders, setRankHolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false);


    async function loadRankHolders() {

        setLoading(true);
        setError("");

        try {

            const result = await getRankHolders();

            if (result.status?.toLowerCase() !== "success") {
                throw new Error(
                    result.message ||
                    "Could not load university toppers."
                );
            }

            setRankHolders(
                Array.isArray(result.data)
                    ? result.data
                    : []
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to load university toppers."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadRankHolders();
    }, []);


    /*
     * Get all unique years from the backend.
     *
     * Example:
     * [2026, 2025, 2024]
     */

    const years = [
        ...new Set(
            rankHolders.map((rankHolder) =>
                Number(rankHolder.year)
            )
        )
    ].sort((a, b) => b - a);


    /*
     * Only the latest year is displayed
     * in the normal section.
     */

    const latestYear = years.slice(0, 1);


    return (
        <section className="rankholders-section">

            <div className="rankholders-header">

                <span className="rankholders-eyebrow">
                    ACADEMIC EXCELLENCE
                </span>

                <h2>
                    University Toppers
                </h2>

                <p>
                    Celebrating excellence, dedication, and outstanding
                    academic achievement.
                </p>

            </div>


            <div className="rankholders-content">

                {loading ? (

                    <p className="rankholders-status">
                        Loading university toppers...
                    </p>

                ) : error ? (

                    <p className="rankholders-status rankholders-error">
                        {error}
                    </p>

                ) : rankHolders.length === 0 ? (

                    <p className="rankholders-status">
                        No university toppers have been added yet.
                    </p>

                ) : (

                    latestYear.map((year) => {

                        const yearRankHolders =
                            rankHolders.filter(
                                (rankHolder) =>
                                    Number(rankHolder.year) === year
                            );

                        return (

                            <div
                                className="rankholders-year-group"
                                key={year}
                            >

                                <h3 className="rank-year">
                                    {year}
                                </h3>


                                <div className="rankholders-grid">

                                    {yearRankHolders.map(
                                        (rankHolder) => (

                                            <article
                                                className="rankholder-card"
                                                key={
                                                    rankHolder.userId
                                                }
                                            >

                                                <div className="rankholder-image">

                                                    <img
                                                        src={`http://localhost:8080${rankHolder.imageUrl}`}
                                                        alt={
                                                            rankHolder.name
                                                        }
                                                    />

                                                </div>


                                                <div className="rankholder-info">

                                                    <span className="rank-badge">
                                                        ★{" "}
                                                        {
                                                            rankHolder.rank
                                                        }
                                                    </span>

                                                    <h4>
                                                        {
                                                            rankHolder.name
                                                        }
                                                    </h4>

                                                    <p>
                                                        {
                                                            rankHolder.department
                                                        }
                                                    </p>

                                                </div>

                                            </article>

                                        )
                                    )}

                                </div>

                            </div>

                        );
                    })

                )}

            </div>


            {!loading &&
                !error &&
                years.length > 1 && (

                    <div className="rankholders-action">

                        <button
                            type="button"
                            onClick={() => setShowAll(true)}
                        >
                            View All Toppers
                        </button>

                    </div>

                )}


            {/* 
             * Full-screen toppers overlay.
             * This opens when "View All Toppers" is clicked.
             */}

            {showAll && (

                <div className="rankholders-overlay">

                    <button
                        type="button"
                        className="rankholders-close"
                        onClick={() => setShowAll(false)}
                        aria-label="Close"
                    >
                        ×
                    </button>


                    <div className="rankholders-overlay-content">

                        <div className="rankholders-overlay-header">

                            <span className="rankholders-eyebrow">
                                ACADEMIC EXCELLENCE
                            </span>

                            <h2>
                                University Toppers
                            </h2>

                            <p>
                                Celebrating excellence, dedication,
                                and outstanding academic achievement.
                            </p>

                        </div>


                        {years.map((year) => {

                            const yearRankHolders =
                                rankHolders.filter(
                                    (rankHolder) =>
                                        Number(rankHolder.year) === year
                                );

                            return (

                                <div
                                    className="rankholders-year-group"
                                    key={year}
                                >

                                    <h3 className="rank-year">
                                        {year}
                                    </h3>


                                    <div className="rankholders-grid">

                                        {yearRankHolders.map(
                                            (rankHolder) => (

                                                <article
                                                    className="rankholder-card"
                                                    key={
                                                        rankHolder.userId
                                                    }
                                                >

                                                    <div className="rankholder-image">

                                                        <img
                                                            src={`http://localhost:8080${rankHolder.imageUrl}`}
                                                            alt={
                                                                rankHolder.name
                                                            }
                                                        />

                                                    </div>


                                                    <div className="rankholder-info">

                                                        <span className="rank-badge">
                                                            ★{" "}
                                                            {
                                                                rankHolder.rank
                                                            }
                                                        </span>

                                                        <h4>
                                                            {
                                                                rankHolder.name
                                                            }
                                                        </h4>

                                                        <p>
                                                            {
                                                                rankHolder.department
                                                            }
                                                        </p>

                                                    </div>

                                                </article>

                                            )
                                        )}

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            )}

        </section>
    );
}


export default RankHolders;
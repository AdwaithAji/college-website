import { useEffect, useState } from 'react';
import './notices.css';
import { getNotices } from '../../api/noticeApi';

export default function Notices() {

    const [notices, setNotices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotices()
            .then((response) => {
                setNotices(
                    [...response].sort(
                        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                )
            })
            .catch((error) => { setError(error.message) })
    }, [])


    return (
        <div className="hero-notices">
            <div className="notices-header">
                <div className="notices-heading">
                    <span className="notices-icon">📢</span>
                    <h3>Latest Notices</h3>
                </div>

                <a href="/notices" className="notices-view-all">
                    View All →
                </a>
            </div>

            {error && (
                <p>Failed to load notices: {error}</p>
            )}

            {!error && notices.length === 0 && (
                <p>No notices available.</p>
            )}

            {!error && notices.length > 0 && (
                <div className="notice-list">
                    {notices.map((notice) => (
                        <div className="notice-item" key={notice.id}>
                            <div className="notice-meta">
                                <span className="notice-category">
                                    {notice.category}
                                </span>

                                <span className="notice-date">
                                    {new Date(
                                        notice.publishedAt
                                    ).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>

                            <h4>{notice.title}</h4>
                            <p>{notice.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}
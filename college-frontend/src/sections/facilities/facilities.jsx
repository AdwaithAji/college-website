import './facilities.css';

const facilities = [
    {
        id: 1,
        name: 'Library',
        description:
            'A rich collection of books, journals and digital resources to support your learning and research.',
        icon: 'library',
    },
    {
        id: 2,
        name: 'Computer Lab',
        description:
            'Well-equipped computer labs with technology for hands-on learning and practical computing.',
        icon: 'computer',
    },
    {
        id: 3,
        name: 'Electronics Lab',
        description:
            'Laboratory facilities for exploring electronics, conducting experiments and developing technical skills.',
        icon: 'electronics',
    },
    {
        id: 4,
        name: 'Sports Facilities',
        description:
            'Indoor and outdoor sports activities that encourage fitness, teamwork and a healthy lifestyle.',
        icon: 'sports',
    },
    {
        id: 5,
        name: 'Canteen / Hostels',
        description:
            'Canteen services and hostel facilities to support students’ daily needs and campus life.',
        icon: 'canteen',
    },
    {
        id: 6,
        name: 'NSS / NCC Units',
        description:
            'Opportunities to serve society, develop leadership skills and build a sense of responsibility.',
        icon: 'community',
    },
];

function FacilityIcon({ type }) {
    switch (type) {
        case 'library':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <path d="M24 15c-5-5-11-5-17-3v25c6-2 12-2 17 3" />
                    <path d="M24 15c5-5 11-5 17-3v25c-6-2-12-2-17 3" />
                    <path d="M24 15v25" />
                    <path d="M12 19c3-1 6-1 9 1" />
                    <path d="M12 25c3-1 6-1 9 1" />
                    <path d="M36 19c-3-1-6-1-9 1" />
                    <path d="M36 25c-3-1-6-1-9 1" />
                </svg>
            );

        case 'computer':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <rect x="8" y="7" width="32" height="25" rx="3" />
                    <path d="M5 37h38l-4 5H9l-4-5Z" />
                    <path d="M19 37h10" />
                </svg>
            );

        case 'electronics':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <rect x="13" y="13" width="22" height="22" rx="3" />
                    <rect x="18" y="18" width="12" height="12" rx="1" />
                    <path d="M18 7v6M24 7v6M30 7v6" />
                    <path d="M18 35v6M24 35v6M30 35v6" />
                    <path d="M7 18h6M7 24h6M7 30h6" />
                    <path d="M35 18h6M35 24h6M35 30h6" />
                </svg>
            );

        case 'sports':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="18" />
                    <path d="m24 6 5 12-5 6-12-1" />
                    <path d="m24 24 7 12-7 6" />
                    <path d="m24 24 12-8 6 8" />
                    <path d="m24 24-13 9" />
                    <path d="m11 9 7 9-5 11" />
                    <path d="m29 18 10 3" />
                </svg>
            );

        case 'canteen':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="25" r="15" />
                    <circle cx="24" cy="25" r="10" />
                    <path d="M6 10v13M10 10v13M14 10v13M10 23v15" />
                    <path d="M39 10v28M35 10v12c0 3 4 3 4 0" />
                </svg>
            );

        case 'community':
            return (
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="13" r="6" />
                    <circle cx="10" cy="19" r="4" />
                    <circle cx="38" cy="19" r="4" />
                    <path d="M12 39v-4c0-7 5-12 12-12s12 5 12 12v4H12Z" />
                    <path d="M4 36v-3c0-5 3-8 8-8 2 0 4 1 5 2" />
                    <path d="M44 36v-3c0-5-3-8-8-8-2 0-4 1-5 2" />
                </svg>
            );

        default:
            return null;
    }
}

export default function Facilities() {
    return (
        <section className="facilities-section" id="facilities">
            <div className="facilities-inner">
                <header className="facilities-header">
                    <div className="facilities-eyebrow">
                        <span />
                        Campus Life
                        <span />
                    </div>

                    <h2>
                        Campus <em>Facilities</em>
                    </h2>

                    <p>
                        Explore the facilities that support your
                        academic journey, personal growth and
                        overall campus experience.
                    </p>
                </header>

                <div className="facilities-grid">
                    {facilities.map((facility) => (
                        <article
                            className="facility-card"
                            key={facility.id}
                        >
                            <div className="facility-card-top">
                                <div className="facility-icon">
                                    <FacilityIcon type={facility.icon} />
                                </div>

                                <div className="facility-title-group">
                                    <h3>{facility.name}</h3>
                                    <span className="facility-title-line" />
                                </div>
                            </div>

                            <p className="facility-description">
                                {facility.description}
                            </p>

                            <div className="facility-card-wave" />
                        </article>
                    ))}
                </div>

                <footer className="facilities-footer">
                    <span />
                    <p>Better Facilities, Brighter Futures</p>
                    <span />
                </footer>
            </div>
        </section>
    );
}

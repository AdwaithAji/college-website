import './about.css';

const highlights = [
    {
        icon: 'graduation-cap',
        title: 'Quality Education',
        description: 'Building knowledge and practical skills for the future.',
    },
    {
        icon: 'users',
        title: 'Supportive Community',
        description: 'Learning, collaboration and a shared campus experience.',
    },
    {
        icon: 'sprout',
        title: 'Personal Growth',
        description: 'Opportunities to develop beyond the classroom.',
    },
    {
        icon: 'mountain',
        title: 'A Unique Setting',
        description: 'A hilltop campus surrounded by the landscapes of Idukki.',
    },
];

export default function About() {
    return (
        <section className="about-section" id="about">
            <div className="about-inner">
                <div className="about-heading">
                    <span className="about-eyebrow">
                        GET TO KNOW US
                    </span>

                    <h2>
                        Rooted in the Highlands.
                        <br />
                        <span>Focused on the Future.</span>
                    </h2>

                    <p className="about-subtitle">
                        A place to discover your potential, build knowledge
                        and prepare for what comes next.
                    </p>
                </div>

                <div className="about-main">
                    <div className="about-image-wrap">
                        <img
                            src="/images/nss-college-old.png"
                            alt="NSS College Rajakumari campus"
                            className="about-image"
                        />

                        <div className="about-image-label">
                            <span className="about-label-line"></span>
                            <span>A journey since 1995</span>
                        </div>
                    </div>

                    <div className="about-content">
                        <span className="about-eyebrow">OUR STORY</span>

                        <h3>A College with a Purpose</h3>

                        <p>
                            Established in June 1995 under the Nair Service
                            Society, NSS College Rajakumari was founded to
                            extend higher education opportunities to the
                            High Ranges of Idukki.
                        </p>

                        <p>
                            Set on a hilltop near Kulapparachal, the college
                            is affiliated with Mahatma Gandhi University,
                            Kottayam. It offers undergraduate and postgraduate
                            programmes in areas including computer applications,
                            electronics, business administration and commerce.
                        </p>

                        <p>
                            Beyond academic learning, college life offers
                            opportunities to develop practical skills,
                            explore interests and grow through shared
                            experiences.
                        </p>

                        <a href="#college-highlights" className="about-link">
                            Discover what defines us
                            <span aria-hidden="true"> →</span>
                        </a>
                    </div>
                </div>

                <div className="about-values" id="college-highlights">
                    {highlights.map((item) => (
                        <article className="about-value" key={item.title}>
                            <div className="about-value-icon" aria-hidden="true">
                                {item.icon === 'graduation-cap' && (
                                    <svg viewBox="0 0 24 24">
                                        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
                                        <path d="M6 12v5c4 3 8 3 12 0v-5" />
                                        <path d="M22 10v6" />
                                    </svg>
                                )}

                                {item.icon === 'users' && (
                                    <svg viewBox="0 0 24 24">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="10" cy="7" r="4" />
                                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                )}

                                {item.icon === 'sprout' && (
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 22V12" />
                                        <path d="M12 13C5 13 3 8 3 3c5 0 10 2 9 10Z" />
                                        <path d="M12 17c0-6 4-9 9-9 0 5-2 9-9 9Z" />
                                    </svg>
                                )}

                                {item.icon === 'mountain' && (
                                    <svg viewBox="0 0 24 24">
                                        <path d="m3 20 7-14 4 8 2-4 5 10H3Z" />
                                        <path d="m8 10 2 2 2-1" />
                                    </svg>
                                )}
                            </div>

                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>

                <div className="about-facts">
                    <div className="about-fact">
                        <span className="about-fact-label">ESTABLISHED</span>
                        <strong>1995</strong>
                        <span className="about-fact-detail">
                            Under the Nair Service Society
                        </span>
                    </div>

                    <div className="about-fact">
                        <span className="about-fact-label">AFFILIATION</span>
                        <strong>MG University</strong>
                        <span className="about-fact-detail">
                            Kottayam, Kerala
                        </span>
                    </div>

                    <div className="about-fact">
                        <span className="about-fact-label">LOCATION</span>
                        <strong>Kulapparachal</strong>
                        <span className="about-fact-detail">
                            Idukki, Kerala
                        </span>
                    </div>

                    <div className="about-fact">
                        <span className="about-fact-label">LEARNING</span>
                        <strong>UG &amp; PG</strong>
                        <span className="about-fact-detail">
                            Multiple academic disciplines
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
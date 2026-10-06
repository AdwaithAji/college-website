import { useState, useEffect } from 'react';
import './hero.css';
import Notices from '../notices/notices';

const images = [
    '/images/college-images/c1.png',
    '/images/college-images/c2.png',
    '/images/college-images/c3.png',
    '/images/college-images/c4.png',
    '/images/college-images/c5.png',
]

export default function Hero() {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-container"
            style={{
                backgroundImage: `url(${images[currentImage]})`
            }}
        >
            <Notices/>

            <div className="hero-content">
                <h3>WELCOME TO NSS COLLEGE</h3>
                <h2>Learn. Grow. Achieve.</h2>
                <button>Explore Departments</button>
            </div>
        </div>
    )
}
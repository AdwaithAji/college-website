import { useEffect, useState } from "react";
import {
getApprovedImages,
uploadGalleryImage
} from "../../api/galleryApi";
import "./gallery.css";

const IMAGE_LIMIT = 3;
const API_URL = "http://localhost:8080";

export default function Gallery() {
const [images, setImages] = useState([]);
const [showAll, setShowAll] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [caption, setCaption] = useState("");
const [loading, setLoading] = useState(true);
const [uploading, setUploading] = useState(false);
const [error, setError] = useState("");
const [message, setMessage] = useState("");

async function loadImages() {
    setLoading(true);
    setError("");

    try {
        const response = await getApprovedImages();
        const data = response.data ?? response;

        if (!Array.isArray(data)) {
            throw new Error("Unexpected gallery response format");
        }

        setImages(data);
    } catch (err) {
        console.error("Failed to load gallery images:", err);
        setError("Unable to load gallery images.");
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    loadImages();
}, []);

useEffect(() => {
    if (!showAll) return;

    function handleKeyDown(event) {
        if (event.key === "Escape") {
            setShowAll(false);
        }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
    };
}, [showAll]);

function getImageUrl(image) {
    if (!image.imageUrl) return "";

    return image.imageUrl.startsWith("http")
        ? image.imageUrl
        : `${API_URL}${image.imageUrl.startsWith("/") ? "" : "/"}${image.imageUrl}`;
}

async function handleUpload(event) {
    event.preventDefault();

    if (!selectedImage) {
        setError("Please select an image.");
        return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
        await uploadGalleryImage(selectedImage, caption);

        setMessage(
            "Image submitted successfully! It will appear after approval."
        );

        setSelectedImage(null);
        setCaption("");
        event.currentTarget.reset();
    } catch (err) {
        console.error("Gallery upload failed:", err);
        setError(err.message || "Image upload failed. Please try again.");
    } finally {
        setUploading(false);
    }
}

function renderImageCard(image, index) {
    const imageUrl = getImageUrl(image);

    return (
        <article
            className="gallery-card"
            key={image.id ?? imageUrl ?? index}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={image.caption || "College gallery"}
                    loading="lazy"
                />
            ) : (
                <div className="gallery-image-placeholder">
                    Image URL unavailable
                </div>
            )}

            {image.caption && (
                <p>{image.caption}</p>
            )}
        </article>
    );
}

return (
    <section className="gallery-section" id="gallery">
        <div className="gallery-heading">
            <p className="gallery-eyebrow">CAMPUS LIFE</p>
            <h2>Our Gallery</h2>
            <p>
                Moments, memories, and experiences from our college.
            </p>
        </div>

        {loading ? (
            <p className="gallery-message">Loading gallery...</p>
        ) : error && images.length === 0 ? (
            <p className="gallery-message">{error}</p>
        ) : images.length === 0 ? (
            <p className="gallery-message">
                No approved images yet. Be the first to contribute!
            </p>
        ) : (
            <>
                <div className="gallery-grid">
                    {images
                        .slice(0, IMAGE_LIMIT)
                        .map(renderImageCard)}
                </div>

                {images.length > IMAGE_LIMIT && (
                    <button
                        type="button"
                        className="gallery-view-button"
                        onClick={() => setShowAll(true)}
                    >
                        View All Photos
                    </button>
                )}
            </>
        )}

        <div className="gallery-upload">
            <h3>Share a Campus Moment</h3>
            <p>
                Have a photo from a college event or activity?
                Submit it for review.
            </p>

            <form onSubmit={handleUpload}>
                <label htmlFor="gallery-image">
                    Choose an image
                </label>

                <input
                    id="gallery-image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => {
                        setSelectedImage(
                            event.target.files?.[0] ?? null
                        );
                        setError("");
                        setMessage("");
                    }}
                    required
                />

                {selectedImage && (
                    <p className="gallery-selected-file">
                        Selected: {selectedImage.name}
                    </p>
                )}

                <label htmlFor="gallery-caption">Caption</label>

                <input
                    id="gallery-caption"
                    name="caption"
                    type="text"
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Describe this moment"
                />

                <button
                    type="submit"
                    className="gallery-upload-button"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Submit Image"}
                </button>
            </form>

            {message && (
                <p className="gallery-success">{message}</p>
            )}

            {error && (
                <p className="gallery-error">{error}</p>
            )}
        </div>

        {showAll && (
            <div
                className="gallery-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="All college gallery images"
            >
                <div className="gallery-overlay-header">
                    <div>
                        <p className="gallery-eyebrow">CAMPUS LIFE</p>
                        <h2>Our Gallery</h2>
                        <p>{images.length} photos</p>
                    </div>

                    <button
                        type="button"
                        className="gallery-close-button"
                        onClick={() => setShowAll(false)}
                        aria-label="Close gallery"
                    >
                        ×
                    </button>
                </div>

                <div className="gallery-overlay-grid">
                    {images.map(renderImageCard)}
                </div>
            </div>
        )}
    </section>
);

}

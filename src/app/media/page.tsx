"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "@/layout/wrapper";
import { Copy, Plus, Trash, UploadCloud } from "lucide-react";

interface CloudinaryImage {
    asset_id: string;
    public_id: string;
    secure_url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function MediaManager() {
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const fetchImages = async (cursor?: string, append = false) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/cloudinary/images`, {
                params: { next_cursor: cursor },
            });

            if (append) {
                setImages((prev) => [...prev, ...res.data.resources]);
            } else {
                setImages(res.data.resources);
            }
            setNextCursor(res.data.next_cursor);
        } catch (error) {
            console.error(error);
            showToast("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const deleteImage = async (public_id: string) => {
        try {
            await axios.delete(`${API_URL}/api/cloudinary/img-delete`, {
                data: { public_id },
            });
            setImages((prev) => prev.filter((img) => img.public_id !== public_id));
            showToast("Image deleted successfully!");
        } catch (error) {
            console.error(error);
            showToast("Failed to delete image");
        }
    };

    const copyLink = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast("Image URL copied!");
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await axios.post(`${API_URL}/api/cloudinary/media-multiple-img`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setImages((prev) => [...res.data.images, ...prev]);
            showToast("Images uploaded successfully!");
        } catch (error) {
            console.error(error);
            showToast("Upload failed");
        } finally {
            setUploading(false);
            e.target.value = ""; // Reset input
        }
    };

    const SkeletonCard = () => (
        <div className="animate-pulse bg-success h-40 rounded-xl"></div>
    );

    return (
        <Wrapper>
            <div className="p-6 relative">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Media Management</h1>

                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                        <UploadCloud size={18} />
                        {uploading ? "Uploading..." : "Upload Images"}
                        <input
                            type="file"
                            multiple
                            onChange={handleUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow-md z-50 animate-fade-in">
                        {toast}
                    </div>
                )}

                {/* Uploading Overlay */}
                {uploading && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
                            <p className="text-white font-medium">Uploading...</p>
                        </div>
                    </div>
                )}
                {loading && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
                            <p className="text-white font-medium">loading...</p>
                        </div>
                    </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img) => (
                            <div
                                key={img.asset_id}
                                className="relative group border rounded-xl overflow-hidden shadow-md"
                            >
                                <img
                                    src={img.secure_url}
                                    alt={img.public_id}
                                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Actions */}
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => copyLink(img.secure_url)}
                                        className="bg-blue-600 px-3 py-1 text-white rounded-md text-sm"
                                    >
                                        <Copy size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteImage(img.public_id)}
                                        className="bg-red px-3 py-1 text-white rounded-md text-sm"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Load More Button */}
                {nextCursor && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => fetchImages(nextCursor, true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

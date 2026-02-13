"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

interface ProductImageProps {
  productId: number;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export default function ProductImage({
  productId,
  alt,
  fill,
  className,
  width,
  height,
}: ProductImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    const token = Cookies.get("token");
    const imageEndpoint = `http://localhost:5000/api/products/${productId}/image`;

    const fetchImage = async () => {
      try {
        const headers: HeadersInit = {
          accept: "image/png",
        };

        // Add authorization token if available
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(imageEndpoint, { headers });

        if (!res.ok) {
          throw new Error(`Failed to load image: ${res.status}`);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        objectUrl = url;

        if (isMounted) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(`Error loading image for product ${productId}:`, err);
        if (isMounted) {
          setError(true);
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    // Cleanup function to revoke blob URL when component unmounts
    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [productId]); // ✅ Only depend on productId, NOT on imageUrl

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`${className} bg-slate-100 flex items-center justify-center`}
      >
        <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Error state - show placeholder
  if (error || !imageUrl) {
    return (
      <div
        className={`${className} bg-slate-100 flex items-center justify-center`}
      >
        <span className="text-slate-400 text-sm">No image</span>
      </div>
    );
  }

  // Success - show image
  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      unoptimized // Required for blob URLs
    />
  );
}

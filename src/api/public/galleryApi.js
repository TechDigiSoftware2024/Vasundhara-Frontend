// src/api/public/galleryApi.js

import { API_BASE_URL, ENDPOINTS, IMAGES } from "../../utils/constants";

/** Resolve image field whether API sends a string or an object with common keys */
function resolveImageRef(ref) {
  if (ref == null || ref === "") return "";
  if (typeof ref === "string") return IMAGES.url(ref);
  if (typeof ref === "object") {
    const v =
      ref.image ??
      ref.imageUrl ??
      ref.url ??
      ref.photo ??
      ref.src ??
      ref.coverImage ??
      ref.mainImage ??
      ref.picture ??
      ref.thumbnail ??
      ref.banner ??
      ref.slideImage ??
      ref.backgroundImage ??
      "";
    return IMAGES.url(v);
  }
  return "";
}

export const getGalleryData = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}${ENDPOINTS.GALLERY_ROUTES.LIST}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const raw = await res.json();
    console.log("GALLERY API RAW:", raw);

    const data = {
      heroSlides: (raw.heroSlides || [])
        .map((item) =>
          typeof item === "string" || typeof item === "number"
            ? IMAGES.url(item)
            : resolveImageRef(item)
        )
        .filter(Boolean),

      beforeAfter: {
        before: IMAGES.url(raw?.beforeAfter?.before),
        after: IMAGES.url(raw?.beforeAfter?.after),
      },

      featured: (raw.featured || []).map((f) => ({
        ...f,
        computedImageUrl: resolveImageRef(f),
      })),

      stories: (raw.stories || []).map((s) => ({
        ...s,
        computedImageUrl: resolveImageRef(s),
      })),

      timeline: (raw.timeline || []).map((t) => ({
        ...t,
        computedImageUrl: resolveImageRef(t),
      })),

      stats: (raw.stats || []).map((s) => ({
        ...s,
        computedImageUrl: resolveImageRef(s),
        value: s.value ?? s.n ?? s.number ?? "",
      })),
    };

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return { success: false, error: error.message };
  }
};

export default {
  getAll: getGalleryData,
};
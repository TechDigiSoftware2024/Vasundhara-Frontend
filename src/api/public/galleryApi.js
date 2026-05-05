// src/api/public/galleryApi.js

import { API_BASE_URL, ENDPOINTS, IMAGES } from "../../utils/constants";

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
heroSlides: (raw.heroSlides || []).map((img) =>
  IMAGES.url(img)
),

  beforeAfter: {
    before: IMAGES.url(raw?.beforeAfter?.before),
    after: IMAGES.url(raw?.beforeAfter?.after),
  },

  featured: (raw.featured || []).map((f) => ({
    ...f,
    computedImageUrl: IMAGES.url(f.image),
  })),

  stories: (raw.stories || []).map((s) => ({
    ...s,
    computedImageUrl: IMAGES.url(s.image),
  })),

  timeline: (raw.timeline || []).map((t) => ({
    ...t,
    computedImageUrl: IMAGES.url(t.image),
  })),

  stats: (raw.stats || []).map((s) => ({
    ...s,
    computedImageUrl: IMAGES.url(s.image),
    
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
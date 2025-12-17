"use client";

// JSONBin configuration for testimonials
const JSONBIN_BIN_ID = "694298a043b1c97be9f452cc";
const JSONBIN_API_KEY = "$2a$10$DGdIiQX2OHGhInucF5qPbu/ODUF1e.2gyuiFWiiknr7T/qo34ssCW";
const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3/b";

export interface Testimonial {
    id: string;
    name: string;
    review: string;
    location: string;
    avatar?: string;
    createdAt: string;
    userId?: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

// Fetch all testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const response = await fetch(`${JSONBIN_BASE_URL}/${JSONBIN_BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": JSONBIN_API_KEY,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch testimonials:", response.statusText);
            return [];
        }

        const data = await response.json();
        return data.record?.testimonials || [];
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
};

// Add a new testimonial
export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "createdAt">): Promise<boolean> => {
    try {
        // First, get existing testimonials
        const existingTestimonials = await getTestimonials();

        // Create new testimonial with ID and timestamp
        const newTestimonial: Testimonial = {
            ...testimonial,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
        };

        // Add to beginning of array (newest first)
        const updatedTestimonials = [newTestimonial, ...existingTestimonials];

        // Update the bin
        const response = await fetch(`${JSONBIN_BASE_URL}/${JSONBIN_BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": JSONBIN_API_KEY,
            },
            body: JSON.stringify({ testimonials: updatedTestimonials }),
        });

        if (!response.ok) {
            console.error("Failed to add testimonial:", response.statusText);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error adding testimonial:", error);
        return false;
    }
};

// Delete a testimonial (by ID)
export const deleteTestimonial = async (testimonialId: string): Promise<boolean> => {
    try {
        const existingTestimonials = await getTestimonials();
        const updatedTestimonials = existingTestimonials.filter(t => t.id !== testimonialId);

        const response = await fetch(`${JSONBIN_BASE_URL}/${JSONBIN_BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": JSONBIN_API_KEY,
            },
            body: JSON.stringify({ testimonials: updatedTestimonials }),
        });

        return response.ok;
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return false;
    }
};

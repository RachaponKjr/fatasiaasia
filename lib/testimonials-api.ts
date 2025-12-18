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
    status: "pending" | "approved" | "declined";
}

// Fetch all testimonials (all statuses)
export const getAllTestimonials = async (): Promise<Testimonial[]> => {
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

// Fetch only approved testimonials (for public display)
export const getApprovedTestimonials = async (): Promise<Testimonial[]> => {
    const all = await getAllTestimonials();
    return all.filter(t => t.status === "approved");
};

// Fetch pending testimonials (for admin)
export const getPendingTestimonials = async (): Promise<Testimonial[]> => {
    const all = await getAllTestimonials();
    return all.filter(t => t.status === "pending");
};

// Legacy function for backward compatibility
export const getTestimonials = getApprovedTestimonials;

// Add a new testimonial (starts as pending)
export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "createdAt" | "status">): Promise<boolean> => {
    try {
        const existingTestimonials = await getAllTestimonials();

        // Create new testimonial with pending status
        const newTestimonial: Testimonial = {
            ...testimonial,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            status: "pending",
        };

        const updatedTestimonials = [newTestimonial, ...existingTestimonials];

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
        console.error("Error adding testimonial:", error);
        return false;
    }
};

// Update testimonial status (approve/decline)
export const updateTestimonialStatus = async (
    testimonialId: string,
    newStatus: "approved" | "declined"
): Promise<boolean> => {
    try {
        const allTestimonials = await getAllTestimonials();
        const updatedTestimonials = allTestimonials.map(t =>
            t.id === testimonialId ? { ...t, status: newStatus } : t
        );

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
        console.error("Error updating testimonial status:", error);
        return false;
    }
};

// Delete a testimonial permanently
export const deleteTestimonial = async (testimonialId: string): Promise<boolean> => {
    try {
        const existingTestimonials = await getAllTestimonials();
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

// Get user's testimonial status
export const getUserTestimonialStatus = async (userId: string): Promise<Testimonial | null> => {
    const all = await getAllTestimonials();
    return all.find(t => t.userId === userId) || null;
};

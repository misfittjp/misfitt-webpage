"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ReadReviewsContextType {
    readReviews: Set<string>;
    markAsRead: (id: string) => void;
    isRead: (id: string) => boolean;
}

const ReadReviewsContext = createContext<ReadReviewsContextType | undefined>(undefined);

const STORAGE_KEY = "misfitt_read_reviews";

export function ReadReviewsProvider({ children }: { children: ReactNode }) {
    const [readReviews, setReadReviews] = useState<Set<string>>(new Set());

    // localStorage から既読情報を読み込み
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setReadReviews(new Set(JSON.parse(stored)));
            }
        } catch (error) {
            console.error("Failed to load read reviews:", error);
        }
    }, []);

    // レビューを既読としてマーク
    const markAsRead = (id: string) => {
        setReadReviews((prev) => {
            const updated = new Set(prev);
            updated.add(id);

            // localStorage に保存
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated)));
            } catch (error) {
                console.error("Failed to save read reviews:", error);
            }

            return updated;
        });
    };

    // レビューが既読かチェック
    const isRead = (id: string) => readReviews.has(id);

    return (
        <ReadReviewsContext.Provider value={{ readReviews, markAsRead, isRead }}>
            {children}
        </ReadReviewsContext.Provider>
    );
}

export function useReadReviews() {
    const context = useContext(ReadReviewsContext);
    if (!context) {
        throw new Error("useReadReviews must be used within ReadReviewsProvider");
    }
    return context;
}

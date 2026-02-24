// ============================
// Project / Product Types
// ============================

export interface Author {
    name: string;
    avatar: string;
    rating: number;
    projects: number;
}

export interface Preview {
    title: string;
    image: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    previews: Preview[];
    tags: string[];
    requirements: string[];
    includes: string[];
    rating: number;
    downloads: number;
    reviews: number;
    author: Author;
    sourceCodeUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// ============================
// Transaction / Order Types
// ============================

export type TransactionStatus = 'pending' | 'success' | 'failed';

export interface Transaction {
    id: string;
    email: string;
    projectId: string;
    projectName: string;
    price: number;
    status: TransactionStatus;
    createdAt: number;
    updatedAt: number;
    userId: string;
}

// ============================
// User Types
// ============================

export type UserRole = 'user' | 'admin';

export interface UserData {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role: UserRole;
    createdAt: any; // Firestore Timestamp
}

// ============================
// Auth Context Types
// ============================

export interface AuthContextValue {
    currentUser: import('firebase/auth').User | null;
    userData: UserData | null;
    isAdmin: boolean;
    loading: boolean;
}

// ============================
// Component Props Types
// ============================

export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}

export interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
    guestEmail: string;
    setGuestEmail: (email: string) => void;
}

export interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

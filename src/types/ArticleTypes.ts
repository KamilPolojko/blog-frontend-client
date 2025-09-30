export type CommentType={
    id: string;
    content: string;
    createdAt: string;
    parent: CommentType | null;
    children: CommentType[];
    author: AutorType;
    likes: LikeType[];
}

export type LikeType={
    id: string;
    createdAt: string;
    user:AutorType;
}

export type ProfileType = {
    id: string;
    firstName: string;
    lastName: string;
    gender: string,
    dateOfBirth: string;
    linkIImage: string;
    cloudinaryPublicId: string;
}

export type AutorType = {
    id: string;
    email: string;
    username: string;
    password: string;
    profile: ProfileType;
}

export type articleType={
    id: string;
    title: string;
    content: string;
    description: string;
    linkIImage: string;
    cloudinaryPublicId: string;
    categories: string[];
    author: AutorType;
    comments: CommentType[];
    likes: LikeType[];
    savedByCount: number;
    savedBy: AutorType[];
    isActive: boolean;
    readingTime: number;
    createdAt: Date;
}
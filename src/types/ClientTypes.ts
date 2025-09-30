export type ProfileType = {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    linkIImage: string;
    cloudinaryPublicId: string;
}

export type clientType={
    id: string;
    email: string;
    username: string;
    password: string;
    profile: ProfileType;

}
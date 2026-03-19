import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        email: string;
        name: string;
        password: string;
        interests: string[];
        savedArticles: mongoose.Types.ObjectId[];
        role: "user" | "admin";
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        email: string;
        name: string;
        password: string;
        interests: string[];
        savedArticles: mongoose.Types.ObjectId[];
        role: "user" | "admin";
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    name: string;
    password: string;
    interests: string[];
    savedArticles: mongoose.Types.ObjectId[];
    role: "user" | "admin";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;

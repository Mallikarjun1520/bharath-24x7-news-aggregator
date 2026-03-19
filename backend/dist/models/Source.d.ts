import mongoose from 'mongoose';
declare const Source: mongoose.Model<{
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
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
        name: string;
        credibilityScore: number;
        language: string;
        country: string;
        isActive: boolean;
        url?: string | null | undefined;
        category?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        name: string;
        credibilityScore: number;
        language: string;
        country: string;
        isActive: boolean;
        url?: string | null | undefined;
        category?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    credibilityScore: number;
    language: string;
    country: string;
    isActive: boolean;
    url?: string | null | undefined;
    category?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Source;

import mongoose from "mongoose";
declare const Article: mongoose.Model<{
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
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
        title: string;
        content: string;
        url: string;
        imageUrl: string;
        category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
        tags: string[];
        hashId: string;
        gravityScore: number;
        importance: number;
        interactionCount: number;
        publishedAt: NativeDate;
        source?: mongoose.Types.ObjectId | null | undefined;
        summary?: string | null | undefined;
        sourceName?: string | null | undefined;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        title: string;
        content: string;
        url: string;
        imageUrl: string;
        category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
        tags: string[];
        hashId: string;
        gravityScore: number;
        importance: number;
        interactionCount: number;
        publishedAt: NativeDate;
        source?: mongoose.Types.ObjectId | null | undefined;
        summary?: string | null | undefined;
        sourceName?: string | null | undefined;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    content: string;
    url: string;
    imageUrl: string;
    category: "home" | "india" | "business" | "cinema" | "sports" | "technology" | "startups" | "jobs" | "local" | "world";
    tags: string[];
    hashId: string;
    gravityScore: number;
    importance: number;
    interactionCount: number;
    publishedAt: NativeDate;
    source?: mongoose.Types.ObjectId | null | undefined;
    summary?: string | null | undefined;
    sourceName?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Article;

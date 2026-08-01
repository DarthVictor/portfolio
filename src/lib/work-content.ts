import { getCollection, type CollectionEntry } from "astro:content";

import {
    createWorkStaticPaths,
    getSortedVisibleWorkEntries,
    type WorkStaticPath,
} from "./work-entries";

export type WorkEntry = CollectionEntry<"work">;

export async function getVisibleWorkEntries(): Promise<WorkEntry[]> {
    return getSortedVisibleWorkEntries(await getCollection("work"));
}

export async function getWorkStaticPaths(): Promise<
    WorkStaticPath<WorkEntry>[]
> {
    return createWorkStaticPaths(await getCollection("work"));
}

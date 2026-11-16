import { getCollection, type CollectionEntry } from "astro:content";

import {
    createWritingStaticPaths,
    getSortedVisibleWritingEntries,
    type WritingStaticPath,
} from "./writing-entries";

export type WritingEntry = CollectionEntry<"writing">;

export async function getVisibleWritingEntries(): Promise<WritingEntry[]> {
    return getSortedVisibleWritingEntries(await getCollection("writing"));
}

export async function getWritingStaticPaths(): Promise<
    WritingStaticPath<WritingEntry>[]
> {
    return createWritingStaticPaths(await getCollection("writing"));
}

import {
    type ContentVisibilityEnvironment,
    type DraftableEntry,
    filterVisibleEntries,
} from "./content-visibility";

export interface SortableWritingEntry extends DraftableEntry {
    id: string;
    data: DraftableEntry["data"] & {
        publishedAt: Date;
        title: string;
    };
}

export interface WritingStaticPath<T extends SortableWritingEntry> {
    params: {
        slug: string;
    };
    props: {
        entry: T;
    };
}

export function sortWritingEntries<T extends SortableWritingEntry>(
    entries: readonly T[],
): T[] {
    return [...entries].sort((first, second) => {
        const dateComparison =
            second.data.publishedAt.valueOf() -
            first.data.publishedAt.valueOf();

        if (dateComparison !== 0) {
            return dateComparison;
        }

        return first.data.title.localeCompare(second.data.title, "en");
    });
}

export function getWritingHref(id: string): string {
    return `/writing/${id}/`;
}

export function getSortedVisibleWritingEntries<T extends SortableWritingEntry>(
    entries: readonly T[],
    environment?: ContentVisibilityEnvironment,
): T[] {
    return sortWritingEntries(filterVisibleEntries([...entries], environment));
}

export function createWritingStaticPaths<T extends SortableWritingEntry>(
    entries: readonly T[],
    environment?: ContentVisibilityEnvironment,
): WritingStaticPath<T>[] {
    return getSortedVisibleWritingEntries(entries, environment).map(
        (entry) => ({
            params: { slug: entry.id },
            props: { entry },
        }),
    );
}

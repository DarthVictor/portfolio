import {
    type ContentVisibilityEnvironment,
    type DraftableEntry,
    filterVisibleEntries,
} from "./content-visibility";

export interface SortableWorkEntry extends DraftableEntry {
    id: string;
    data: DraftableEntry["data"] & {
        featured?: boolean;
        featuredOrder?: number;
        publishedAt?: Date;
        title: string;
    };
}

export interface WorkStaticPath<T extends SortableWorkEntry> {
    params: {
        slug: string;
    };
    props: {
        entry: T;
    };
}

export function sortWorkEntries<T extends SortableWorkEntry>(
    entries: readonly T[],
): T[] {
    return [...entries].sort((first, second) => {
        const featuredComparison =
            Number(second.data.featured === true) -
            Number(first.data.featured === true);

        if (featuredComparison !== 0) {
            return featuredComparison;
        }

        if (first.data.featured && second.data.featured) {
            const orderComparison =
                (first.data.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
                (second.data.featuredOrder ?? Number.MAX_SAFE_INTEGER);

            if (orderComparison !== 0) {
                return orderComparison;
            }
        }

        const dateComparison =
            (second.data.publishedAt?.valueOf() ?? 0) -
            (first.data.publishedAt?.valueOf() ?? 0);

        if (dateComparison !== 0) {
            return dateComparison;
        }

        return first.data.title.localeCompare(second.data.title, "en");
    });
}

export function getWorkHref(id: string): string {
    return `/work/${id}/`;
}

export function getSortedVisibleWorkEntries<T extends SortableWorkEntry>(
    entries: readonly T[],
    environment?: ContentVisibilityEnvironment,
): T[] {
    return sortWorkEntries(filterVisibleEntries([...entries], environment));
}

export function createWorkStaticPaths<T extends SortableWorkEntry>(
    entries: readonly T[],
    environment?: ContentVisibilityEnvironment,
): WorkStaticPath<T>[] {
    return getSortedVisibleWorkEntries(entries, environment).map((entry) => ({
        params: { slug: entry.id },
        props: { entry },
    }));
}

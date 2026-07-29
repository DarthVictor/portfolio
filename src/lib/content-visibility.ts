export interface ContentVisibilityEnvironment {
    mode?: string;
    vercelEnv?: string;
    showDrafts?: string;
}

export interface DraftableEntry {
    data: {
        draft?: boolean;
    };
}

const currentEnvironment = (): ContentVisibilityEnvironment => ({
    mode: import.meta.env.MODE,
    vercelEnv: import.meta.env.VERCEL_ENV,
    showDrafts: import.meta.env.SHOW_DRAFTS,
});

export function shouldIncludeDrafts(
    environment: ContentVisibilityEnvironment = currentEnvironment(),
): boolean {
    if (environment.vercelEnv === "production") {
        return false;
    }

    if (
        environment.vercelEnv === undefined &&
        environment.showDrafts === "true"
    ) {
        return true;
    }

    return (
        environment.mode === "development" ||
        environment.vercelEnv === "preview"
    );
}

export function filterVisibleEntries<T extends DraftableEntry>(
    entries: T[],
    environment?: ContentVisibilityEnvironment,
): T[] {
    return entries.filter(
        (entry) => !entry.data.draft || shouldIncludeDrafts(environment),
    );
}

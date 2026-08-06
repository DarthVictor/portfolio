import type { ImageMetadata } from "astro";

import klaviyoIntegration from "../assets/work/klaviyo_integration.png";
import tolstoyConnectors from "../assets/work/tolstoy_connectors.png";
import yandexDiskSpaMigration from "../assets/work/yandex-disk-spa-migration.png";

type WorkImageDimensions = {
    height: number;
    width: number;
};

const workImages = new Map<string, ImageMetadata>([
    ["/images/work/klaviyo_integration.png", klaviyoIntegration],
    ["/images/work/tolstoy_connectors.png", tolstoyConnectors],
    ["/images/work/yandex-disk-spa-migration.png", yandexDiskSpaMigration],
]);

const workImageDimensions = new Map<string, WorkImageDimensions>([
    ["/images/work/klaviyo_integration.png", { width: 910, height: 739 }],
    ["/images/work/tolstoy_connectors.png", { width: 1758, height: 1881 }],
    [
        "/images/work/yandex-disk-spa-migration.png",
        { width: 1672, height: 941 },
    ],
]);

export const getWorkImage = (src: string): ImageMetadata | undefined =>
    workImages.get(src);

export const getWorkImageDimensions = (
    src: string,
): WorkImageDimensions | undefined => workImageDimensions.get(src);

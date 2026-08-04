import type { ImageMetadata } from "astro";

import klaviyoIntegration from "../assets/work/klaviyo_integration.png";
import tolstoyConnectors from "../assets/work/tolstoy_connectors.png";
import yandexDiskSpaMigration from "../assets/work/yandex-disk-spa-migration.png";

const workImages = new Map<string, ImageMetadata>([
    ["/images/work/klaviyo_integration.png", klaviyoIntegration],
    ["/images/work/tolstoy_connectors.png", tolstoyConnectors],
    ["/images/work/yandex-disk-spa-migration.png", yandexDiskSpaMigration],
]);

export const getWorkImage = (src: string): ImageMetadata | undefined =>
    workImages.get(src);

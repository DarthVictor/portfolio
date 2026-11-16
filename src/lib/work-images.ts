import type { ImageMetadata } from "astro";

import klaviyoIntegration from "../assets/work/klaviyo_integration.png";
import tolstoyConnectors from "../assets/work/tolstoy_connectors.png";
import yandexDiskSpaMigration from "../assets/work/yandex-disk-spa-migration.png";
import pipelineCover from "../assets/writing/dont-start-with-a-complex-pipeline-cover.png";
import pipelineOneBox from "../assets/writing/dont-start-with-a-complex-pipeline-one-box.png";

type WorkImageDimensions = {
    height: number;
    width: number;
};

const workImages = new Map<string, ImageMetadata>([
    ["/images/work/klaviyo_integration.png", klaviyoIntegration],
    ["/images/work/tolstoy_connectors.png", tolstoyConnectors],
    ["/images/work/yandex-disk-spa-migration.png", yandexDiskSpaMigration],
    ["/images/writing/dont-start-with-a-complex-pipeline.png", pipelineCover],
    [
        "/images/writing/dont-start-with-a-complex-pipeline-one-box.png",
        pipelineOneBox,
    ],
]);

const workImageDimensions = new Map<string, WorkImageDimensions>([
    ["/images/work/klaviyo_integration.png", { width: 910, height: 739 }],
    ["/images/work/tolstoy_connectors.png", { width: 1758, height: 1881 }],
    [
        "/images/work/yandex-disk-spa-migration.png",
        { width: 1672, height: 941 },
    ],
    [
        "/images/writing/dont-start-with-a-complex-pipeline.png",
        { width: 1280, height: 720 },
    ],
    [
        "/images/writing/dont-start-with-a-complex-pipeline-one-box.png",
        { width: 1080, height: 1350 },
    ],
]);

export const getWorkImage = (src: string): ImageMetadata | undefined =>
    workImages.get(src);

export const getWorkImageDimensions = (
    src: string,
): WorkImageDimensions | undefined => workImageDimensions.get(src);

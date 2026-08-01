export interface SelectedWorkItem {
    meta: string;
    title: string;
    summary: string;
    technologies: readonly string[];
    caseStudySlugs: readonly string[];
}

interface DateLabel {
    datetime?: string;
    label: string;
}

export interface ExperienceItem {
    company: string;
    title: string;
    start: DateLabel;
    end: DateLabel;
    companyList?: string;
}

export interface CapabilityItem {
    label: string;
    title: string;
    summary: string;
    mark: string;
    featured?: boolean;
    markClass?: string;
}

export interface ContactLink {
    href: string;
    label: string;
    symbol: string;
}

export const profileLinks = {
    email: "follet.victor@gmail.com",
    cv: "/cv.pdf",
} as const;

export const selectedWork = [
    {
        meta: "Tolstoy · AI + Design systems",
        title: "AI integrations built on reusable UI foundations",
        summary:
            "Building AI-agent capabilities for third-party integrations alongside reusable React and TypeScript UI infrastructure.",
        technologies: ["React", "TypeScript", "AI integrations"],
        caseStudySlugs: [
            "tolstoy-ai-integrations",
            "tolstoy-design-system-infrastructure",
        ],
    },
    {
        meta: "Bright Data · SaaS platform",
        title: "Faster product workflows and resilient payments",
        summary:
            "Improving frontend performance on a proxy-management platform and building payment flows across React and Node.js services.",
        technologies: ["React", "Node.js", "Payments"],
        caseStudySlugs: [
            "bright-data-frontend-performance",
            "bright-data-payment-workflows",
        ],
    },
    {
        meta: "Tenengroup · E-commerce",
        title: "Checkout experiences backed by scalable data access",
        summary:
            "Creating shopping-cart experiences and a scalable Next.js data-access and API layer for e-commerce products.",
        technologies: ["Next.js", "APIs", "E-commerce"],
        caseStudySlugs: ["tenengroup-checkout-ux"],
    },
] satisfies readonly SelectedWorkItem[];

export const experience = [
    {
        company: "Tolstoy",
        title: "Senior Full Stack Engineer",
        start: { datetime: "2024-11", label: "Nov 2024" },
        end: { label: "Present" },
    },
    {
        company: "Bright Data",
        title: "Senior Full Stack Developer",
        start: { datetime: "2024-02", label: "Feb 2024" },
        end: { datetime: "2024-11", label: "Nov 2024" },
    },
    {
        company: "Tenengroup",
        title: "Senior Full Stack Developer",
        start: { datetime: "2022-07", label: "Jul 2022" },
        end: { datetime: "2024-02", label: "Feb 2024" },
    },
    {
        company: "Luxoft",
        title: "Chief Frontend Developer",
        start: { datetime: "2021-02", label: "Feb 2021" },
        end: { datetime: "2022-07", label: "Jul 2022" },
    },
    {
        company: "Earlier experience",
        title: "Product and platform engineering",
        start: { datetime: "2010", label: "2010" },
        end: { datetime: "2021", label: "2021" },
        companyList:
            "Mail.Ru Group, Yandex, Idea Platform, Systematica, and Allied Testing",
    },
] satisfies readonly ExperienceItem[];

export const capabilities = [
    {
        label: "Interface",
        title: "Frontend systems",
        summary:
            "React, Next.js, TypeScript, JavaScript, design systems, and frontend architecture.",
        mark: "Aa",
        featured: true,
    },
    {
        label: "Product",
        title: "Platform delivery",
        summary:
            "Node.js, Express, REST APIs, PostgreSQL, MongoDB, and DynamoDB.",
        mark: "</>",
        markClass: "code-mark",
    },
    {
        label: "Operations",
        title: "Cloud and delivery",
        summary:
            "AWS, Lambda, Docker, Kubernetes, CI/CD, and integration automation.",
        mark: "↗",
    },
] satisfies readonly CapabilityItem[];

export const principles = [
    "Start with the user and the constraint",
    "Make tradeoffs explicit",
    "Build systems teams can extend",
] as const;

export const contactLinks = [
    {
        href: "https://www.linkedin.com/in/victor-follet/",
        label: "LinkedIn",
        symbol: "↗",
    },
    {
        href: "https://github.com/DarthVictor",
        label: "GitHub",
        symbol: "↗",
    },
    {
        href: profileLinks.cv,
        label: "Download CV",
        symbol: "↓",
    },
] satisfies readonly ContactLink[];

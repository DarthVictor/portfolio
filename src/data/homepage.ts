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
    location: string;
    start: DateLabel;
    end: DateLabel;
    highlights: readonly string[];
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
        meta: "Tolstoy · AI integrations",
        title: "Building 30+ AI integrations",
        summary:
            "Building a connector catalogue for AI Studio across customer workflows, access, testing, and operations.",
        technologies: ["React", "TypeScript", "AI integrations"],
        caseStudySlugs: ["tolstoy-ai-integrations"],
    },
    {
        meta: "Tenengroup · E-commerce architecture",
        title: "From better architecture to better sales",
        summary:
            "Modernizing a multi-brand commerce platform: all UI to Next.js and React, and .NET Framework services to a modern .NET API.",
        technologies: ["Next.js", "SWR", "Zustand"],
        caseStudySlugs: ["tenengroup-ui-migration"],
    },
    {
        meta: "Yandex · Frontend modernization",
        title: "The patient rewrite of Yandex.Disk",
        summary:
            "Moving a live Yandex.Disk product from an internal frontend framework to React and Redux without stopping feature delivery.",
        technologies: ["React 16", "Redux", "ES6"],
        caseStudySlugs: ["yandex-disk-spa-migration"],
    },
] satisfies readonly SelectedWorkItem[];

export const experience = [
    {
        company: "Tolstoy",
        title: "Senior Full Stack Engineer",
        location: "Tel Aviv-Yafo, Israel",
        start: { datetime: "2024-11", label: "Nov 2024" },
        end: { label: "Present" },
        highlights: [
            "Build full-stack features for Tolstoy's AI commerce platform using React, TypeScript, AWS Lambda, DynamoDB, and PostgreSQL.",
            "Design and develop AI Studio infrastructure supporting the creation and maintenance of 30+ third-party integrations.",
            "Build reusable design-system components and shared UI foundations for AI-assisted React and TypeScript product workflows.",
        ],
    },
    {
        company: "Bright Data",
        title: "Senior Full Stack Developer",
        location: "Netanya, Israel",
        start: { datetime: "2024-02", label: "Feb 2024" },
        end: { datetime: "2024-11", label: "Nov 2024" },
        highlights: [
            "Led development of Toolip.io, a React and TypeScript SaaS platform for managing proxy infrastructure.",
            "Reduced page-load time by 25% through frontend performance improvements.",
            "Built payment workflows integrating Stripe, PayPal, and BlueSnap across React and Node.js services.",
        ],
    },
    {
        company: "Tenengroup",
        title: "Senior Full Stack Developer",
        location: "Tel Aviv-Yafo, Israel",
        start: { datetime: "2022-07", label: "Jul 2022" },
        end: { datetime: "2024-02", label: "Feb 2024" },
        highlights: [
            "Built and optimized React shopping-cart and checkout experiences for the MYKA and Oak & Luna international e-commerce brands, reducing cart abandonment by 20%.",
            "Architected a reusable Next.js data-access and API layer for a high-traffic e-commerce platform.",
            "Partnered with .NET teams on API contracts, integration patterns, and end-to-end delivery.",
        ],
    },
    {
        company: "Luxoft",
        title: "Chief Frontend Developer",
        location: "Moscow, Russia",
        start: { datetime: "2021-02", label: "Feb 2021" },
        end: { datetime: "2022-07", label: "Jul 2022" },
        highlights: [
            "Led a microfrontend migration using Webpack Module Federation, enabling independent deployment of product modules and faster delivery.",
            "Built financial-reporting interfaces for VTB Bank using React, TypeScript, Redux Toolkit, and Redux Saga, improving UI consistency and reporting accuracy.",
        ],
    },
    {
        company: "Mail.ru Group (now VK)",
        title: "Senior Full Stack Engineer",
        location: "Moscow, Russia",
        start: { datetime: "2019-03", label: "Mar 2019" },
        end: { datetime: "2021-02", label: "Feb 2021" },
        highlights: [
            "Built a GitLab CI, Docker, and Traefik pipeline that created branch-specific payment environments, shortening cross-functional feedback cycles by 30%.",
            "Developed payment interfaces for My.com and VK Pay using Preact, Redux, and TypeScript.",
            "Improved payment-processing performance by 20%, strengthening responsiveness across customer-facing payment flows.",
        ],
    },
    {
        company: "Yandex",
        title: "Interface Developer",
        location: "Moscow, Russia",
        start: { datetime: "2017-01", label: "Jan 2017" },
        end: { datetime: "2019-03", label: "Mar 2019" },
        highlights: [
            "Modernized the Yandex Disk frontend architecture using React, Redux, and ES6, reducing page-load time by 20%.",
            "Built a React Native embedding module for the Global Notification Center, enabling real-time alerts across five platforms.",
            "Expanded Jest test coverage and reduced production regressions across Yandex Disk.",
        ],
    },
    {
        company: "Idea Platform",
        title: "Senior Frontend Developer (JavaScript)",
        location: "Moscow, Russia",
        start: { datetime: "2013-08", label: "Aug 2013" },
        end: { datetime: "2017-01", label: "Jan 2017" },
        highlights: [
            "Designed and built the company's AngularJS product frontend, contributing to three new client engagements.",
            "Built mobile and backend functionality using NativeScript, Angular, Java EE, and JAX-RS.",
            "Hired and mentored two developers while establishing automated frontend testing practices with Karma and Protractor.",
        ],
    },
    {
        company: "Earlier Financial Technology Experience",
        title: "Development Consultant and Financial Engineer",
        location: "Moscow, Russia",
        start: { datetime: "2010-02", label: "Feb 2010" },
        end: { datetime: "2013-07", label: "Jul 2013" },
        highlights: [
            "Development Consultant at Systematica Business Software; Financial Engineer at Allied Testing.",
            "Built financial integrations, reporting, option-pricing functionality, and QA workflows for banking and market-data systems, including Renaissance Capital back-office software and Thomson Reuters Eikon.",
        ],
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

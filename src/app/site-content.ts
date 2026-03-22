import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];
export type PageKey = "home" | "capabilities" | "solutions" | "customers" | "about";

export type NavItem = {
  label: string;
  href: "/capabilities" | "/solutions" | "/customers" | "/about";
};

type Capability = {
  title: string;
  description: string;
};

type Scenario = {
  title: string;
  problem: string;
  outcome: string;
};

type ProofMetric = {
  value: string;
  label: string;
};

type CaseStudy = {
  client: string;
  summary: string;
  result: string;
};

type TrustPoint = {
  title: string;
  description: string;
};

export type Content = {
  badge: string;
  nav: NavItem[];
  languageLabel: string;
  localeName: string;
  quickLinksLabel: string;
  mobileMenuLabel: string;
  mobileMenuNavLabel: string;
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    panelLabel: string;
    panelDescription: string;
  };
  thesis: {
    eyebrow: string;
    heading: string;
    principles: string[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: Capability[];
  };
  scenarios: {
    eyebrow: string;
    heading: string;
    items: Scenario[];
  };
  proof: {
    eyebrow: string;
    heading: string;
    logos: string[];
    metrics: ProofMetric[];
    cases: CaseStudy[];
  };
  trust: {
    eyebrow: string;
    heading: string;
    items: TrustPoint[];
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    description: string;
    button: string;
  };
  footer: {
    statement: string;
    contact: string;
  };
  pageMeta: Record<PageKey, { title: string; description: string }>;
};

const content: Record<Locale, Content> = {
  en: {
    badge: "Enterprise AI Platform",
    nav: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Customers", href: "/customers" },
      { label: "About", href: "/about" },
    ],
    languageLabel: "Language",
    localeName: "English",
    quickLinksLabel: "Quick links",
    mobileMenuLabel: "Menu",
    mobileMenuNavLabel: "Mobile navigation",
    hero: {
      title: "Build intelligence into every critical workflow.",
      description:
        "A premium AI platform for enterprises that need sharper operations, trusted execution, and scalable decision support.",
      primaryCta: "Book a Demo",
      secondaryCta: "Explore Capabilities",
      panelLabel: "Operational Intelligence",
      panelDescription:
        "Premium interfaces for high-stakes workflows, governance, and enterprise momentum.",
    },
    thesis: {
      eyebrow: "Brand Thesis",
      heading: "AI should feel operational, controlled, and ready for business.",
      principles: [
        "AI should accelerate decisions, not add complexity.",
        "Enterprise adoption requires control, not just capability.",
        "The future belongs to systems that learn with the business.",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Four layers of enterprise intelligence.",
      items: [
        {
          title: "Intelligence",
          description: "Turn fragmented signals into context-rich operational insight.",
        },
        {
          title: "Automation",
          description: "Reduce repetitive work across the workflows that matter most.",
        },
        {
          title: "Orchestration",
          description: "Connect teams, systems, and decisions through one AI layer.",
        },
        {
          title: "Governance",
          description: "Keep execution observable, secure, and aligned with policy.",
        },
      ],
    },
    scenarios: {
      eyebrow: "Solutions",
      heading: "Designed for the workflows that define enterprise performance.",
      items: [
        {
          title: "Operations Acceleration",
          problem: "Manual handoffs slow down execution across teams.",
          outcome: "Bring intelligence into the loops that drive delivery and throughput.",
        },
        {
          title: "Knowledge Intelligence",
          problem: "Critical knowledge is distributed, inconsistent, and hard to use.",
          outcome: "Surface trusted context exactly where teams make decisions.",
        },
        {
          title: "Workflow Automation",
          problem: "Teams lose time to repetitive process work and fragmented tooling.",
          outcome: "Automate repeatable actions while preserving visibility and control.",
        },
      ],
    },
    proof: {
      eyebrow: "Customer Proof",
      heading: "Built to earn trust from modern enterprise teams.",
      logos: ["Northstar Group", "Aether Systems", "Vector Capital", "Helio Works"],
      metrics: [
        { value: "40%", label: "faster response cycles" },
        { value: "3×", label: "operational throughput" },
        { value: "12", label: "business units deployed" },
      ],
      cases: [
        {
          client: "Global Retail Group",
          summary: "Unified fragmented decision flows across regional operations and planning teams.",
          result: "Reduced escalation lag and improved execution visibility across the organization.",
        },
        {
          client: "Enterprise Software Provider",
          summary: "Introduced AI-assisted knowledge workflows into high-volume internal operations.",
          result: "Accelerated employee response quality without compromising governance.",
        },
      ],
    },
    trust: {
      eyebrow: "Why Us",
      heading: "Enterprise confidence is built into the platform.",
      items: [
        {
          title: "Security by design",
          description: "Protect data flows, access boundaries, and operational trust from the start.",
        },
        {
          title: "Deployment readiness",
          description: "Fit into real enterprise environments with practical integration paths.",
        },
        {
          title: "Governance and oversight",
          description: "Keep human judgment, auditability, and policy control close to execution.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Executive Demo",
      heading: "See how enterprise AI can work inside your business.",
      description:
        "Book a tailored demo to explore how the platform can fit your workflows, operating model, and growth goals.",
      button: "Book a Demo",
    },
    footer: {
      statement: "Premium AI systems for enterprise clarity, control, and momentum.",
      contact: "hello@clarionis.ai",
    },
    pageMeta: {
      home: {
        title: "Clarionis 明谛 — Enterprise AI Platform",
        description:
          "A premium bilingual AI company website concept for enterprise customers, focused on trust, operational intelligence, and demo conversion.",
      },
      capabilities: {
        title: "Capabilities — Clarionis 明谛",
        description: "Explore Clarionis capabilities across intelligence, automation, orchestration, and governance.",
      },
      solutions: {
        title: "Solutions — Clarionis 明谛",
        description: "See how Clarionis supports enterprise operations, knowledge workflows, and automation.",
      },
      customers: {
        title: "Customers — Clarionis 明谛",
        description: "Review Clarionis customer proof, performance metrics, and enterprise case studies.",
      },
      about: {
        title: "About — Clarionis 明谛",
        description: "Learn how Clarionis approaches enterprise AI with trust, governance, and deployment readiness.",
      },
    },
  },
  zh: {
    badge: "企业级 AI 平台",
    nav: [
      { label: "能力", href: "/capabilities" },
      { label: "场景", href: "/solutions" },
      { label: "客户", href: "/customers" },
      { label: "关于", href: "/about" },
    ],
    languageLabel: "语言",
    localeName: "中文",
    quickLinksLabel: "快捷导航",
    mobileMenuLabel: "菜单",
    mobileMenuNavLabel: "移动端导航",
    hero: {
      title: "把智能真正嵌入每一个关键业务流程。",
      description:
        "面向企业的高端 AI 平台，帮助组织获得更敏捷的运营能力、更可信的执行体系与更可扩展的决策支持。",
      primaryCta: "预约演示",
      secondaryCta: "查看平台能力",
      panelLabel: "运营智能",
      panelDescription: "为高价值业务流程提供可治理、可执行、可持续放大的智能控制界面。",
    },
    thesis: {
      eyebrow: "品牌判断",
      heading: "企业需要的不是炫技式 AI，而是可运营、可控制、可落地的智能系统。",
      principles: [
        "AI 应该加速决策，而不是制造额外复杂度。",
        "企业级落地需要控制力，而不只是能力展示。",
        "未来属于能够随业务一起学习和进化的系统。",
      ],
    },
    capabilities: {
      eyebrow: "平台能力",
      heading: "构成企业智能化底座的四个关键层。",
      items: [
        {
          title: "智能洞察",
          description: "把分散的数据与信号转化成可执行的业务判断。",
        },
        {
          title: "流程自动化",
          description: "减少关键流程中的重复劳动，释放团队效率。",
        },
        {
          title: "系统编排",
          description: "把团队、工具与决策节点整合进同一智能层。",
        },
        {
          title: "治理控制",
          description: "让 AI 的执行过程可观测、可审计、可被管理。",
        },
      ],
    },
    scenarios: {
      eyebrow: "业务场景",
      heading: "围绕企业核心绩效场景设计的通用型 AI 能力。",
      items: [
        {
          title: "运营提效",
          problem: "跨团队协作与人工交接让执行速度持续下降。",
          outcome: "把智能嵌入关键流程回路，提升交付效率与执行质量。",
        },
        {
          title: "知识智能",
          problem: "核心知识分散、标准不一致、难以快速调用。",
          outcome: "在决策发生的位置提供可信上下文与智能支持。",
        },
        {
          title: "流程自动化",
          problem: "重复性流程工作消耗大量组织时间与管理成本。",
          outcome: "自动化高频动作，同时保留全程可见性与控制力。",
        },
      ],
    },
    proof: {
      eyebrow: "客户背书",
      heading: "为现代企业团队建立真正可信的 AI 合作方式。",
      logos: ["Northstar Group", "Aether Systems", "Vector Capital", "Helio Works"],
      metrics: [
        { value: "40%", label: "响应周期缩短" },
        { value: "3×", label: "运营吞吐提升" },
        { value: "12", label: "业务单元完成部署" },
      ],
      cases: [
        {
          client: "全球零售集团",
          summary: "整合区域运营与计划团队间割裂的决策流转。",
          result: "缩短升级响应滞后，并提升组织级执行可视性。",
        },
        {
          client: "企业软件服务商",
          summary: "将 AI 知识工作流接入高频内部运营场景。",
          result: "在不牺牲治理要求的前提下，提高员工响应质量。",
        },
      ],
    },
    trust: {
      eyebrow: "为什么是我们",
      heading: "企业级可信度从平台底层开始构建。",
      items: [
        {
          title: "安全优先",
          description: "从数据流、权限边界到执行过程，默认建立安全基础。",
        },
        {
          title: "可部署可集成",
          description: "适配真实企业环境，并提供务实的系统接入路径。",
        },
        {
          title: "治理与人工监督",
          description: "让审计、策略控制与人工判断始终贴近执行现场。",
        },
      ],
    },
    finalCta: {
      eyebrow: "专属演示",
      heading: "看看企业级 AI 如何真正进入你的业务体系。",
      description:
        "预约一次定制演示，了解平台如何适配你的流程、组织方式与增长目标。",
      button: "预约演示",
    },
    footer: {
      statement: "为企业带来更清晰、更可控、更具推进力的 AI 系统。",
      contact: "hello@clarionis.ai",
    },
    pageMeta: {
      home: {
        title: "Clarionis 明谛 — 企业级 AI 平台",
        description: "面向企业客户的高端双语 AI 官网，聚焦可信执行、运营智能与演示转化。",
      },
      capabilities: {
        title: "平台能力 — Clarionis 明谛",
        description: "查看 Clarionis 在智能洞察、自动化、系统编排与治理控制方面的能力。",
      },
      solutions: {
        title: "业务场景 — Clarionis 明谛",
        description: "了解 Clarionis 如何支持企业运营提效、知识智能与流程自动化。",
      },
      customers: {
        title: "客户背书 — Clarionis 明谛",
        description: "查看 Clarionis 的客户指标、案例与企业级落地证明。",
      },
      about: {
        title: "关于我们 — Clarionis 明谛",
        description: "了解 Clarionis 如何以可信、治理与可部署能力构建企业级 AI 平台。",
      },
    },
  },
};

export function getStaticLocaleParams() {
  return locales.map((locale) => ({ locale }));
}

export function resolveLocale(value: string): Locale {
  if (locales.includes(value as Locale)) {
    return value as Locale;
  }

  notFound();
}

export function getContent(locale: Locale) {
  return content[locale];
}

export function buildLocalizedPath(locale: Locale, href: "/" | NavItem["href"]) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function localizeCurrentPath(locale: Locale, currentPath: string) {
  const stripped = currentPath.replace(/^\/(en|zh)/, "") || "";
  return stripped ? `/${locale}${stripped}` : `/${locale}`;
}

export function getPageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = content[locale].pageMeta[page];

  return {
    title: meta.title,
    description: meta.description,
  };
}

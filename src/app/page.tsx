"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Locale = "en" | "zh";

type NavItem = {
  label: string;
  href: string;
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

type Content = {
  badge: string;
  nav: NavItem[];
  languageLabel: string;
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
};

const content: Record<Locale, Content> = {
  en: {
    badge: "Enterprise AI Platform",
    nav: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Solutions", href: "#solutions" },
      { label: "Customers", href: "#customers" },
      { label: "About", href: "#about" },
    ],
    languageLabel: "Language",
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
      contact: "hello@novasyn.ai",
    },
  },
  zh: {
    badge: "企业级 AI 平台",
    nav: [
      { label: "能力", href: "#capabilities" },
      { label: "场景", href: "#solutions" },
      { label: "客户", href: "#customers" },
      { label: "关于", href: "#about" },
    ],
    languageLabel: "语言",
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
      contact: "hello@novasyn.ai",
    },
  },
};

const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const panelClass =
  "rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl";

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.34em] text-white/58 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {children}
    </span>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = useMemo(() => content[locale], [locale]);

  return (
    <div className="relative overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(124,170,255,0.2),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(83,113,195,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <header className="sticky top-0 z-30 px-4 pt-4 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.75rem] border border-white/10 bg-[rgba(6,10,20,0.72)] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:rounded-full md:px-6 gap-3 md:gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] shadow-[0_0_40px_rgba(145,196,255,0.18)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_24px_rgba(145,196,255,0.85)]" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[0.24em] uppercase">NovaSyn</span>
              <span className="hidden truncate text-[0.64rem] tracking-[0.28em] text-white/36 uppercase xl:block">
                {copy.badge}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {copy.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/58 transition hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-[0.64rem] tracking-[0.32em] text-white/34 uppercase md:block">
              {copy.languageLabel}
            </div>
            <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {(["en", "zh"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={value === "en" ? "EN" : "中文"}
                  aria-pressed={locale === value}
                  onClick={() => setLocale(value)}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    locale === value
                      ? "bg-white text-black shadow-[0_8px_18px_rgba(255,255,255,0.16)]"
                      : "text-white/58 hover:text-white"
                  }`}
                >
                  {value === "en" ? "EN" : "中文"}
                </button>
              ))}
            </div>
            <a
              href="#demo"
              className="hidden rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-white/20 hover:bg-[var(--accent-soft)] md:inline-flex"
            >
              {copy.hero.primaryCta}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 pb-14 pt-4 md:px-10 md:gap-32 md:pt-12">
        <section className="grid min-h-[calc(100vh-132px)] items-center gap-8 pb-6 pt-2 md:gap-10 md:pb-8 md:pt-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-10 lg:pb-10 lg:pt-6">
          <motion.div {...sectionReveal} className="max-w-4xl lg:pr-10 xl:pr-16">
            <SectionLabel>{copy.badge}</SectionLabel>
            <AnimatePresence mode="wait">
              <motion.div
                key={locale}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-6"
              >
                <h1 className="max-w-5xl text-[3.15rem] leading-[0.9] font-medium tracking-[-0.065em] text-white sm:text-[4.8rem] md:text-[6.25rem] xl:text-[7.2rem]">
                  {copy.hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-white/62 md:text-lg md:leading-9">
                  {copy.hero.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#demo"
                    className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
                  >
                    {copy.hero.primaryCta}
                  </a>
                  <a
                    href="#capabilities"
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/78 transition hover:border-white/24 hover:bg-white/[0.06] hover:text-white"
                  >
                    {copy.hero.secondaryCta}
                  </a>
                </div>
                <div className="mt-14 flex flex-wrap gap-3">
                  {copy.proof.logos.map((logo) => (
                    <span
                      key={logo}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.66rem] tracking-[0.28em] text-white/38 uppercase"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.aside
            {...sectionReveal}
            transition={{ ...sectionReveal.transition, delay: 0.08 }}
            className={`${panelClass} relative isolate overflow-hidden p-4 sm:p-5 md:p-6`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(145,196,255,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(61,84,151,0.24),transparent_34%)]" />
            <div className="relative flex flex-col gap-4 md:gap-5">
              <div className="flex items-center justify-between text-[0.66rem] tracking-[0.32em] text-white/38 uppercase">
                <span>{copy.badge}</span>
                <span>Flagship</span>
              </div>

              <div className="rounded-[1.55rem] border border-white/10 bg-[rgba(255,255,255,0.045)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.68rem] tracking-[0.32em] text-[var(--accent)] uppercase">{copy.hero.panelLabel}</p>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(145,196,255,0.75)]" />
                </div>
                <p className="mt-5 max-w-md text-[1.6rem] leading-[1.2] tracking-[-0.05em] text-white/92 md:text-[1.95rem]">
                  {copy.hero.panelDescription}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
                {copy.proof.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.4rem] border border-white/10 bg-[rgba(5,9,18,0.42)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="text-3xl font-medium tracking-[-0.07em] text-white">{metric.value}</div>
                    <div className="mt-2 text-sm leading-6 text-white/50">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3">
                {copy.trust.items.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="pt-0.5 text-[0.68rem] tracking-[0.28em] text-white/34 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h2 className="text-base tracking-[-0.03em] text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </section>

        <motion.section
          {...sectionReveal}
          className="grid gap-8 border-t border-white/8 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
        >
          <div>
            <SectionLabel>{copy.thesis.eyebrow}</SectionLabel>
            <h2 className="mt-6 max-w-xl text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
              {copy.thesis.heading}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.thesis.principles.map((principle, index) => (
              <div key={principle} className={`${panelClass} flex gap-5 px-5 py-5 md:px-6`}>
                <div className="pt-1 text-[0.68rem] tracking-[0.32em] text-[var(--accent)] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-lg leading-8 text-white/76">{principle}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="capabilities" {...sectionReveal} className="space-y-8">
          <div className="max-w-2xl">
            <SectionLabel>{copy.capabilities.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
              {copy.capabilities.heading}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.capabilities.items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${panelClass} group relative overflow-hidden p-6 transition hover:-translate-y-1.5 hover:border-white/18`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                <div className="text-[0.68rem] tracking-[0.32em] text-white/34 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-10 h-12 w-12 rounded-full border border-white/14 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.24),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(145,196,255,0.12)]" />
                <h3 className="mt-10 text-xl tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/56">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="solutions" {...sectionReveal} className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-12">
          <div>
            <SectionLabel>{copy.scenarios.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
              {copy.scenarios.heading}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.scenarios.items.map((item, index) => (
              <div
                key={item.title}
                className={`${panelClass} relative overflow-hidden p-6 md:p-7`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(145,196,255,0.16),transparent_66%)]" />
                <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-xl">
                    <div className="text-[0.68rem] tracking-[0.32em] text-white/34 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-4 text-2xl tracking-[-0.04em] text-white">{item.title}</h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/46">{item.problem}</p>
                  </div>
                  <div className="max-w-md rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-4 text-base leading-7 text-white/76 md:mt-2 md:min-w-[280px]">
                    {item.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="customers" {...sectionReveal} className="space-y-8">
          <div className="max-w-2xl">
            <SectionLabel>{copy.proof.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
              {copy.proof.heading}
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {copy.proof.logos.map((logo) => (
              <div
                key={logo}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm tracking-[0.28em] text-white/42 uppercase"
              >
                {logo}
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.proof.metrics.map((metric) => (
                <div key={metric.label} className={`${panelClass} p-6`}>
                  <div className="text-4xl tracking-[-0.08em] text-white md:text-[3.4rem]">{metric.value}</div>
                  <div className="mt-3 text-sm leading-6 text-white/54">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              {copy.proof.cases.map((item) => (
                <article key={item.client} className={`${panelClass} p-6 md:p-8`}>
                  <div className="text-sm tracking-[0.28em] text-[var(--accent)] uppercase">{item.client}</div>
                  <p className="mt-5 text-xl leading-9 tracking-[-0.04em] text-white/88">{item.summary}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/54">{item.result}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="about" {...sectionReveal} className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <div>
            <SectionLabel>{copy.trust.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.2rem]">
              {copy.trust.heading}
            </h2>
          </div>
          <div className="grid gap-4">
            {copy.trust.items.map((item) => (
              <div key={item.title} className={`${panelClass} p-6`}>
                <h3 className="text-xl tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/54">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="demo"
          {...sectionReveal}
          className={`${panelClass} relative isolate overflow-hidden px-6 py-10 md:px-10 md:py-14`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(145,196,255,0.16),transparent_34%),linear-gradient(140deg,rgba(255,255,255,0.04),transparent_42%)]" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>{copy.finalCta.eyebrow}</SectionLabel>
              <h2 className="mt-6 text-3xl leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-[3.1rem]">
                {copy.finalCta.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/62">{copy.finalCta.description}</p>
            </div>
            <a
              href={`mailto:${copy.footer.contact}`}
              className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
            >
              {copy.finalCta.button}
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-white/8 px-6 py-8 text-sm text-white/46 md:flex-row md:items-center md:justify-between md:px-10">
        <p>{copy.footer.statement}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${copy.footer.contact}`} className="transition hover:text-white/80">
            {copy.footer.contact}
          </a>
          <span>© 2026 NovaSyn</span>
        </div>
      </footer>
    </div>
  );
}

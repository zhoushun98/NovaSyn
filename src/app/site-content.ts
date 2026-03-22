import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const locales = ["en", "zh", "de", "fr", "ja"] as const;

export type Locale = (typeof locales)[number];
export type PageKey = "home" | "capabilities" | "solutions" | "customers" | "about";

export const localeSwitchLabels: Record<Locale, { label: string; ariaLabel: string }> = {
  en: { label: "EN", ariaLabel: "EN" },
  zh: { label: "ZH", ariaLabel: "ZH" },
  de: { label: "DE", ariaLabel: "DE" },
  fr: { label: "FR", ariaLabel: "FR" },
  ja: { label: "JA", ariaLabel: "JA" },
};

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
  de: {
    badge: "Enterprise-AI-Plattform",
    nav: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Customers", href: "/customers" },
      { label: "About", href: "/about" },
    ],
    languageLabel: "Sprache",
    localeName: "Deutsch",
    quickLinksLabel: "Schnellzugriffe",
    mobileMenuLabel: "Menü",
    mobileMenuNavLabel: "Mobile Navigation",
    hero: {
      title: "Integrieren Sie Intelligenz in jeden kritischen Arbeitsablauf.",
      description:
        "Eine Premium-AI-Plattform für Unternehmen, die präzisere Abläufe, verlässliche Ausführung und skalierbare Entscheidungsunterstützung benötigen.",
      primaryCta: "Demo buchen",
      secondaryCta: "Capabilities ansehen",
      panelLabel: "Operative Intelligenz",
      panelDescription:
        "Premium-Oberflächen für geschäftskritische Workflows, Governance und nachhaltige operative Dynamik.",
    },
    thesis: {
      eyebrow: "Markenthese",
      heading: "AI sollte sich operativ, kontrolliert und geschäftsreif anfühlen.",
      principles: [
        "AI sollte Entscheidungen beschleunigen, nicht zusätzliche Komplexität erzeugen.",
        "Unternehmensweite Einführung erfordert Kontrolle, nicht nur Fähigkeiten.",
        "Die Zukunft gehört Systemen, die mit dem Geschäft lernen.",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Vier Ebenen unternehmerischer Intelligenz.",
      items: [
        {
          title: "Intelligence",
          description: "Verwandeln Sie fragmentierte Signale in kontextreiche operative Erkenntnisse.",
        },
        {
          title: "Automation",
          description: "Reduzieren Sie repetitive Arbeit in den Workflows, die am meisten zählen.",
        },
        {
          title: "Orchestration",
          description: "Verbinden Sie Teams, Systeme und Entscheidungen über eine gemeinsame AI-Schicht.",
        },
        {
          title: "Governance",
          description: "Sorgen Sie dafür, dass Ausführung beobachtbar, sicher und richtlinienkonform bleibt.",
        },
      ],
    },
    scenarios: {
      eyebrow: "Solutions",
      heading: "Entwickelt für die Workflows, die Unternehmensleistung bestimmen.",
      items: [
        {
          title: "Operations Acceleration",
          problem: "Manuelle Übergaben verlangsamen die Ausführung über Teams hinweg.",
          outcome: "Bringen Sie Intelligenz in die Schleifen, die Lieferung und Durchsatz steuern.",
        },
        {
          title: "Knowledge Intelligence",
          problem: "Kritisches Wissen ist verteilt, uneinheitlich und schwer nutzbar.",
          outcome: "Stellen Sie verlässlichen Kontext genau dort bereit, wo Teams Entscheidungen treffen.",
        },
        {
          title: "Workflow Automation",
          problem: "Teams verlieren Zeit durch repetitive Prozessarbeit und zersplitterte Werkzeuge.",
          outcome: "Automatisieren Sie wiederholbare Aktionen und behalten Sie dennoch Transparenz und Kontrolle.",
        },
      ],
    },
    proof: {
      eyebrow: "Kundenbelege",
      heading: "Entwickelt, um das Vertrauen moderner Enterprise-Teams zu gewinnen.",
      logos: ["Northstar Group", "Aether Systems", "Vector Capital", "Helio Works"],
      metrics: [
        { value: "40%", label: "schnellere Reaktionszyklen" },
        { value: "3×", label: "mehr operativer Durchsatz" },
        { value: "12", label: "eingeführte Geschäftsbereiche" },
      ],
      cases: [
        {
          client: "Global Retail Group",
          summary: "Vereinheitlichte fragmentierte Entscheidungsflüsse über regionale Operations- und Planungsteams hinweg.",
          result: "Reduzierte Eskalationsverzögerungen und verbesserte die Transparenz der Ausführung in der gesamten Organisation.",
        },
        {
          client: "Enterprise Software Provider",
          summary: "Führte AI-gestützte Wissensworkflows in hochvolumigen internen Abläufen ein.",
          result: "Steigerte die Qualität der Mitarbeiterantworten, ohne Governance-Anforderungen zu gefährden.",
        },
      ],
    },
    trust: {
      eyebrow: "Warum wir",
      heading: "Enterprise-Vertrauen ist in die Plattform eingebaut.",
      items: [
        {
          title: "Sicherheit von Anfang an",
          description: "Schützen Sie Datenflüsse, Zugriffsgrenzen und operatives Vertrauen vom ersten Tag an.",
        },
        {
          title: "Bereit für den Einsatz",
          description: "Passt in reale Enterprise-Umgebungen mit pragmatischen Integrationspfaden.",
        },
        {
          title: "Governance und Aufsicht",
          description: "Halten Sie menschliches Urteilsvermögen, Auditierbarkeit und Richtlinienkontrolle nah an der Ausführung.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Executive Demo",
      heading: "Erleben Sie, wie Enterprise-AI in Ihrem Unternehmen funktionieren kann.",
      description:
        "Buchen Sie eine individuelle Demo, um zu sehen, wie die Plattform zu Ihren Workflows, Ihrem Operating Model und Ihren Wachstumszielen passt.",
      button: "Demo buchen",
    },
    footer: {
      statement: "Premium-AI-Systeme für Klarheit, Kontrolle und Dynamik im Unternehmen.",
      contact: "hello@clarionis.ai",
    },
    pageMeta: {
      home: {
        title: "Clarionis 明谛 — Enterprise-AI-Plattform",
        description:
          "Eine hochwertige mehrsprachige AI-Website für Enterprise-Kunden mit Fokus auf Vertrauen, operative Intelligenz und Demo-Konversion.",
      },
      capabilities: {
        title: "Capabilities — Clarionis 明谛",
        description: "Erkunden Sie Clarionis entlang von Intelligence, Automation, Orchestration und Governance.",
      },
      solutions: {
        title: "Solutions — Clarionis 明谛",
        description: "Sehen Sie, wie Clarionis Enterprise Operations, Wissensworkflows und Automatisierung unterstützt.",
      },
      customers: {
        title: "Customers — Clarionis 明谛",
        description: "Prüfen Sie Kundenbelege, Leistungskennzahlen und Enterprise-Fallstudien von Clarionis.",
      },
      about: {
        title: "About — Clarionis 明谛",
        description: "Erfahren Sie, wie Clarionis Enterprise-AI mit Vertrauen, Governance und Einsatzbereitschaft angeht.",
      },
    },
  },
  fr: {
    badge: "Plateforme IA d'entreprise",
    nav: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Customers", href: "/customers" },
      { label: "About", href: "/about" },
    ],
    languageLabel: "Langue",
    localeName: "Français",
    quickLinksLabel: "Accès rapides",
    mobileMenuLabel: "Menu",
    mobileMenuNavLabel: "Navigation mobile",
    hero: {
      title: "Intégrez l’intelligence dans chaque workflow critique.",
      description:
        "Une plateforme IA premium pour les entreprises qui recherchent des opérations plus nettes, une exécution fiable et une aide à la décision évolutive.",
      primaryCta: "Réserver une démo",
      secondaryCta: "Explorer les capabilities",
      panelLabel: "Intelligence opérationnelle",
      panelDescription:
        "Des interfaces premium pour les workflows à forts enjeux, la gouvernance et l'élan opérationnel de l'entreprise.",
    },
    thesis: {
      eyebrow: "Thèse de marque",
      heading: "L’IA doit sembler opérationnelle, maîtrisée et prête pour l’entreprise.",
      principles: [
        "L’IA doit accélérer les décisions, pas ajouter de la complexité.",
        "L’adoption en entreprise exige du contrôle, pas seulement des capacités.",
        "L’avenir appartient aux systèmes qui apprennent avec l’entreprise.",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "Quatre couches d’intelligence d’entreprise.",
      items: [
        {
          title: "Intelligence",
          description: "Transformez des signaux fragmentés en informations opérationnelles riches en contexte.",
        },
        {
          title: "Automation",
          description: "Réduisez le travail répétitif dans les workflows qui comptent le plus.",
        },
        {
          title: "Orchestration",
          description: "Connectez équipes, systèmes et décisions au sein d’une même couche IA.",
        },
        {
          title: "Governance",
          description: "Gardez une exécution observable, sécurisée et alignée avec les politiques.",
        },
      ],
    },
    scenarios: {
      eyebrow: "Solutions",
      heading: "Conçue pour les workflows qui définissent la performance de l’entreprise.",
      items: [
        {
          title: "Operations Acceleration",
          problem: "Les relais manuels ralentissent l’exécution entre les équipes.",
          outcome: "Injectez de l’intelligence dans les boucles qui portent la livraison et le débit.",
        },
        {
          title: "Knowledge Intelligence",
          problem: "Les connaissances critiques sont dispersées, incohérentes et difficiles à exploiter.",
          outcome: "Faites remonter un contexte fiable exactement là où les équipes prennent leurs décisions.",
        },
        {
          title: "Workflow Automation",
          problem: "Les équipes perdent du temps dans des tâches répétitives et des outils fragmentés.",
          outcome: "Automatisez les actions répétables tout en conservant visibilité et contrôle.",
        },
      ],
    },
    proof: {
      eyebrow: "Preuves clients",
      heading: "Conçue pour gagner la confiance des équipes enterprise modernes.",
      logos: ["Northstar Group", "Aether Systems", "Vector Capital", "Helio Works"],
      metrics: [
        { value: "40%", label: "cycles de réponse plus rapides" },
        { value: "3×", label: "débit opérationnel" },
        { value: "12", label: "unités métier déployées" },
      ],
      cases: [
        {
          client: "Global Retail Group",
          summary: "A unifié des flux de décision fragmentés entre opérations régionales et équipes de planification.",
          result: "A réduit le délai d’escalade et amélioré la visibilité de l’exécution à l’échelle de l’organisation.",
        },
        {
          client: "Enterprise Software Provider",
          summary: "A introduit des workflows de connaissance assistés par IA dans des opérations internes à fort volume.",
          result: "A amélioré la qualité des réponses des équipes sans compromettre la gouvernance.",
        },
      ],
    },
    trust: {
      eyebrow: "Pourquoi nous",
      heading: "La confiance enterprise est intégrée à la plateforme.",
      items: [
        {
          title: "Sécurité by design",
          description: "Protégez les flux de données, les frontières d’accès et la confiance opérationnelle dès le départ.",
        },
        {
          title: "Prête au déploiement",
          description: "S’intègre dans de vrais environnements enterprise avec des chemins d’intégration pragmatiques.",
        },
        {
          title: "Gouvernance et supervision",
          description: "Gardez le jugement humain, l’auditabilité et le contrôle des politiques au plus près de l’exécution.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Démo exécutive",
      heading: "Découvrez comment l’IA enterprise peut fonctionner dans votre entreprise.",
      description:
        "Réservez une démo sur mesure pour voir comment la plateforme peut s’adapter à vos workflows, à votre modèle opérationnel et à vos objectifs de croissance.",
      button: "Réserver une démo",
    },
    footer: {
      statement: "Des systèmes IA premium pour plus de clarté, de contrôle et d’élan en entreprise.",
      contact: "hello@clarionis.ai",
    },
    pageMeta: {
      home: {
        title: "Clarionis 明谛 — Plateforme IA d'entreprise",
        description:
          "Un site IA multilingue haut de gamme pour les clients enterprise, centré sur la confiance, l’intelligence opérationnelle et la conversion démo.",
      },
      capabilities: {
        title: "Capabilities — Clarionis 明谛",
        description: "Explorez Clarionis à travers l’intelligence, l’automatisation, l’orchestration et la gouvernance.",
      },
      solutions: {
        title: "Solutions — Clarionis 明谛",
        description: "Découvrez comment Clarionis soutient les opérations enterprise, les workflows de connaissance et l’automatisation.",
      },
      customers: {
        title: "Customers — Clarionis 明谛",
        description: "Consultez les preuves clients, les métriques de performance et les cas d’usage enterprise de Clarionis.",
      },
      about: {
        title: "About — Clarionis 明谛",
        description: "Découvrez comment Clarionis aborde l’IA enterprise avec confiance, gouvernance et préparation au déploiement.",
      },
    },
  },
  ja: {
    badge: "エンタープライズ AI プラットフォーム",
    nav: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Customers", href: "/customers" },
      { label: "About", href: "/about" },
    ],
    languageLabel: "言語",
    localeName: "日本語",
    quickLinksLabel: "クイックリンク",
    mobileMenuLabel: "メニュー",
    mobileMenuNavLabel: "モバイルナビゲーション",
    hero: {
      title: "あらゆる重要な業務フローに intelligence を組み込む。",
      description:
        "より鋭いオペレーション、信頼できる実行、そして拡張可能な意思決定支援を必要とする企業向けのプレミアム AI プラットフォームです。",
      primaryCta: "デモを予約",
      secondaryCta: "Capabilities を見る",
      panelLabel: "オペレーショナル・インテリジェンス",
      panelDescription:
        "重要業務のワークフロー、ガバナンス、そして企業の推進力のためのプレミアムな操作体験を提供します。",
    },
    thesis: {
      eyebrow: "ブランドの視点",
      heading: "企業に必要なのは派手な AI ではなく、運用でき、制御でき、実務に入れられる知能システムです。",
      principles: [
        "AI は複雑さを増やすのではなく、意思決定を加速させるべきです。",
        "エンタープライズ導入には、機能だけでなくコントロールが必要です。",
        "未来をつくるのは、事業とともに学び続けるシステムです。",
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      heading: "エンタープライズ知能を構成する 4 つのレイヤー。",
      items: [
        {
          title: "Intelligence",
          description: "分断されたシグナルを、文脈のある実行可能な業務インサイトへ変換します。",
        },
        {
          title: "Automation",
          description: "重要なワークフローにまたがる反復作業を減らします。",
        },
        {
          title: "Orchestration",
          description: "チーム、システム、意思決定をひとつの AI レイヤーで接続します。",
        },
        {
          title: "Governance",
          description: "実行を観測可能で、安全かつポリシーに沿った状態に保ちます。",
        },
      ],
    },
    scenarios: {
      eyebrow: "Solutions",
      heading: "企業パフォーマンスを左右するワークフローのために設計されています。",
      items: [
        {
          title: "Operations Acceleration",
          problem: "手作業の引き継ぎが、チーム横断の実行スピードを低下させています。",
          outcome: "デリバリーと処理量を支えるループに知能を組み込みます。",
        },
        {
          title: "Knowledge Intelligence",
          problem: "重要な知識が分散し、一貫性がなく、活用しにくい状態です。",
          outcome: "チームが意思決定する場所で、信頼できる文脈をそのまま届けます。",
        },
        {
          title: "Workflow Automation",
          problem: "反復的な業務と分断されたツールによって、チームの時間が失われています。",
          outcome: "可視性とコントロールを保ちながら、繰り返し可能な作業を自動化します。",
        },
      ],
    },
    proof: {
      eyebrow: "導入実績",
      heading: "現代のエンタープライズチームに信頼されるために設計されています。",
      logos: ["Northstar Group", "Aether Systems", "Vector Capital", "Helio Works"],
      metrics: [
        { value: "40%", label: "応答サイクルを短縮" },
        { value: "3×", label: "オペレーション処理量" },
        { value: "12", label: "導入済み事業部門" },
      ],
      cases: [
        {
          client: "Global Retail Group",
          summary: "地域オペレーションと計画部門にまたがる分断された意思決定フローを統合しました。",
          result: "エスカレーション遅延を減らし、組織全体の実行可視性を高めました。",
        },
        {
          client: "Enterprise Software Provider",
          summary: "大量の社内オペレーションに AI 支援のナレッジワークフローを導入しました。",
          result: "ガバナンスを損なうことなく、従業員の応答品質を向上させました。",
        },
      ],
    },
    trust: {
      eyebrow: "選ばれる理由",
      heading: "エンタープライズの信頼は、プラットフォームの土台から組み込まれています。",
      items: [
        {
          title: "設計段階からのセキュリティ",
          description: "データフロー、アクセス境界、運用上の信頼を最初から保護します。",
        },
        {
          title: "導入準備のしやすさ",
          description: "現実の企業環境に適合し、実務的な統合パスを提供します。",
        },
        {
          title: "ガバナンスと監督",
          description: "人の判断、監査可能性、ポリシー制御を実行の近くに保ちます。",
        },
      ],
    },
    finalCta: {
      eyebrow: "エグゼクティブデモ",
      heading: "エンタープライズ AI が自社でどう機能するかを確認してください。",
      description:
        "ワークフロー、運用モデル、成長目標にこのプラットフォームがどう適合するかを、個別デモでご紹介します。",
      button: "デモを予約",
    },
    footer: {
      statement: "企業に、より高い明確さ、制御性、推進力をもたらすプレミアム AI システム。",
      contact: "hello@clarionis.ai",
    },
    pageMeta: {
      home: {
        title: "Clarionis 明谛 — エンタープライズ AI プラットフォーム",
        description:
          "信頼性、オペレーショナル・インテリジェンス、デモ転換に焦点を当てた、エンタープライズ向け高品質多言語 AI サイト。",
      },
      capabilities: {
        title: "Capabilities — Clarionis 明谛",
        description: "Clarionis の Intelligence、Automation、Orchestration、Governance を確認できます。",
      },
      solutions: {
        title: "Solutions — Clarionis 明谛",
        description: "Clarionis が企業オペレーション、ナレッジワークフロー、自動化をどう支えるかをご覧ください。",
      },
      customers: {
        title: "Customers — Clarionis 明谛",
        description: "Clarionis の導入実績、成果指標、エンタープライズ事例を確認できます。",
      },
      about: {
        title: "About — Clarionis 明谛",
        description: "Clarionis が信頼、ガバナンス、導入準備性を軸にエンタープライズ AI に取り組む姿勢を紹介します。",
      },
    },
  },
};

const localePrefixPattern = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

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
  const stripped = currentPath.replace(localePrefixPattern, "") || "";
  return stripped ? `/${locale}${stripped}` : `/${locale}`;
}

export function getPageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = content[locale].pageMeta[page];

  return {
    title: meta.title,
    description: meta.description,
  };
}

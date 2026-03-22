import LocaleHomePage from "../[locale]/page";

export default function Home() {
  return LocaleHomePage({ params: Promise.resolve({ locale: "en" }) });
}

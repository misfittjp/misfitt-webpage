import { manifestoContent } from "./sections/manifesto";
import { founderContent } from "./sections/founder";
import { servicesContent } from "./sections/services";
export { toursContent } from "./tours";
import { identityContent } from "./sections/identity";

export const siteContent = {
    en: {
        hero: { title: "Off the Script.", sub: "A Journey Beyond the Conventional." },
        manifesto: manifestoContent.en,
        identity: identityContent.en,
        founder: founderContent.en,
        services: servicesContent.en,
    },
    ja: {
        hero: { title: "Off the Script.", sub: "まだ見ぬ、日本へ。" },
        manifesto: manifestoContent.ja,
        identity: identityContent.ja,
        founder: founderContent.ja,
        services: servicesContent.ja,
    }
};
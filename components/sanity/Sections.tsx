import { Section } from "@/studio/lib/types";
import SanityHero from "./Hero";

const SanitySections = ({sections}: {sections: Section[]}) => {
  return (
    <div>
      {sections.map((section) => {
        switch (section._type) {
          case 'hero':
            return<div className="sanity-section-wrapper pb-12" key={section._key}><SanityHero key={section._key} {...section} /></div>
        }
      })}
    </div>
  )
}

export default SanitySections;
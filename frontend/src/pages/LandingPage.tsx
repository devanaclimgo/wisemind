import { Header } from "../components/landing/Header"
import { HeroSection } from "../components/landing/HeroSection"
import { PleaseSection } from "../components/landing/PleaseSection"
import { BenefitsSection } from "../components/landing/BenefitsSection"
import { CtaSection } from "../components/landing/CtaSection"

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <PleaseSection />
      <BenefitsSection />
      <CtaSection />
    </>
  )
}
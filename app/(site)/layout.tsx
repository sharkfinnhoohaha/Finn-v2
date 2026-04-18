import { SmoothScroll } from '../components/smooth-scroll';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="grain">
        <Navigation />
        <main>{children}</main>
        {/* @ts-expect-error Async Server Component */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}

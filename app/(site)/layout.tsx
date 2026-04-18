import { SmoothScroll } from '@/app/components/smooth-scroll';
import { Navigation } from '@/app/components/navigation';
import { Footer } from '@/app/components/footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="grain">
        <Navigation />
        <main>{children}</main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

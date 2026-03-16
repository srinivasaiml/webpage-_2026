import SectionPage from '@/components/SectionPage';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';

export const metadata = {
    title: 'Technical Mastery | Srinivas Portfolio',
    description: 'Technical skills and projects built by Srinivas.',
};

export default function TechnicalPage() {
    return (
        <SectionPage>
            <div className="space-y-0">
                <Skills />
                <Projects />
            </div>
        </SectionPage>
    );
}

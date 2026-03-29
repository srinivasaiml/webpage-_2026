import SectionPage from '@/components/SectionPage';
import Experience from '@/components/Experience';
import Education from '@/components/Education';

export const metadata = {
    title: 'Experience | Srinivas Portfolio',
    description: 'Professional experience and education of Srinivas.',
};

export default function ExperiencePage() {
    return (
        <SectionPage>
            <div className="space-y-0">
                <Experience />
                <Education />
            </div>
        </SectionPage>
    );
}

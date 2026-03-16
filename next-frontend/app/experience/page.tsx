import SectionPage from '@/components/SectionPage';
import Experience from '@/components/Experience';

export const metadata = {
    title: 'Experience | Srinivas Portfolio',
    description: 'Professional experience and internships of Srinivas.',
};

export default function ExperiencePage() {
    return (
        <SectionPage>
            <Experience />
        </SectionPage>
    );
}

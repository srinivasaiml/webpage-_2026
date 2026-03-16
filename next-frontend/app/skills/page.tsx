import SectionPage from '@/components/SectionPage';
import Skills from '@/components/Skills';

export const metadata = {
    title: 'Skills | Srinivas Portfolio',
    description: 'Technical skills and tools used by Srinivas for web development.',
};

export default function SkillsPage() {
    return (
        <SectionPage>
            <Skills />
        </SectionPage>
    );
}

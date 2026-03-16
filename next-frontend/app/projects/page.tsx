import SectionPage from '@/components/SectionPage';
import Projects from '@/components/Projects';

export const metadata = {
    title: 'Projects | Srinivas Portfolio',
    description: 'Showcase of web development projects built by Srinivas.',
};

export default function ProjectsPage() {
    return (
        <SectionPage>
            <Projects />
        </SectionPage>
    );
}

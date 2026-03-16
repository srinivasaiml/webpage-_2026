import SectionPage from '@/components/SectionPage';
import About from '@/components/About';

export const metadata = {
    title: 'About | Srinivas Portfolio',
    description: 'Learn more about Srinivas, a passionate Frontend Developer and MERN stack enthusiast.',
};

export default function AboutPage() {
    return (
        <SectionPage>
            <About />
        </SectionPage>
    );
}

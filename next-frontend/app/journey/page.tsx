import SectionPage from '@/components/SectionPage';
import Experience from '@/components/Experience';
import Education from '@/components/Education';

export const metadata = {
    title: 'Professional Journey | Srinivas Portfolio',
    description: 'Experience and Education background of Srinivas.',
};

export default function JourneyPage() {
    return (
        <SectionPage>
            <div className="space-y-0">
                <Experience />
                <Education />
            </div>
        </SectionPage>
    );
}

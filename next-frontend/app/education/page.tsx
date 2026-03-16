import SectionPage from '@/components/SectionPage';
import Education from '@/components/Education';

export const metadata = {
    title: 'Education | Srinivas Portfolio',
    description: 'Academic background and educational journey of Srinivas.',
};

export default function EducationPage() {
    return (
        <SectionPage>
            <Education />
        </SectionPage>
    );
}

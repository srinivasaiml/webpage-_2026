import SectionPage from '@/components/SectionPage';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

export const metadata = {
    title: 'Verification & Contact | Srinivas Portfolio',
    description: 'Professional certificates and contact information.',
};

export default function VerificationPage() {
    return (
        <SectionPage>
            <SectionPage>
                <Certificates />
            </SectionPage>
        </SectionPage>
    );
}

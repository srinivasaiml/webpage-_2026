import SectionPage from '@/components/SectionPage';
import Certificates from '@/components/Certificates';

export const metadata = {
    title: 'Certificates | Srinivas Portfolio',
    description: 'Professional certificates and achievements of Srinivas.',
};

export default function CertificatesPage() {
    return (
        <SectionPage>
            <Certificates />
        </SectionPage>
    );
}

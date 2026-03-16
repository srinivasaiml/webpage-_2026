"use client";

import React from 'react';
import SectionPage from '@/components/SectionPage';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
    return (
        <main className="snap-container">
            <SectionPage>
                <Contact />
                <Footer />
            </SectionPage>
        </main>
    );
};

export default ContactPage;

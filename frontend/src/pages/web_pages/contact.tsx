import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'node4doc';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const faqs = [
    {
      question: 'How do I upload documents?',
      answer:
        "You can upload documents by clicking the 'Upload' button. For ZIP files, the system will automatically decompress and organize the contents for you.",
    },
    {
      question: 'Can I edit documents directly in the system?',
      answer:
        "Yes, you can edit documents using the modal interface. Simply select a document from the list and click 'Edit' to make changes in real-time.",
    },
    {
      question: 'How are documents organized?',
      answer:
        'Documents can be organized into folders with customizable attributes like name, type, color, and status, allowing for easy retrieval and management.',
    },
    {
      question: 'Is it possible to share documents with others?',
      answer:
        "Yes, you can share documents with other employees by selecting the document and choosing the 'Share' option to send it or generate a shareable link.",
    },
    {
      question: 'What types of documents are supported?',
      answer:
        '${projectName} supports various document types. You can select the appropriate type during upload to ensure proper categorization and management.',
    },
    {
      question: 'How do I change document ownership?',
      answer:
        "Document ownership can be transferred by the current owner. Select the document, choose 'Change Owner', and assign it to another employee.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to the ${projectName} team for any inquiries or support. Find answers to common questions in our FAQ section.`}
        />
      </Head>
      <WebSiteHeader projectName={'node4doc'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'node4doc'}
          image={['Contact us for support']}
          mainText={`Connect with the ${projectName} Team`}
          subTitle={`We're here to help with any questions or support you need. Reach out to us and discover how ${projectName} can enhance your document management experience.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'node4doc'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'node4doc'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Reach out for assistance']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're available to assist you with any inquiries or support needs. Reach out to us, and our team will respond promptly to help you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'node4doc'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

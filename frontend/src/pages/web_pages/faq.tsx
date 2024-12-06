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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
        "To upload documents, click the 'Upload' button on the dashboard. You can upload individual files or ZIP files, which will be automatically decompressed and organized.",
    },
    {
      question: 'Can I edit documents directly in the system?',
      answer:
        'Yes, you can edit documents directly within ${projectName}. Simply select a document and use the modal interface to make real-time changes.',
    },
    {
      question: 'How are documents organized?',
      answer:
        'Documents are organized into folders with customizable attributes such as name, type, color, and status, making it easy to manage and retrieve them.',
    },
    {
      question: 'Is it possible to share documents with others?',
      answer:
        "Yes, you can share documents with other users by selecting the document and choosing the 'Share' option to send it or generate a shareable link.",
    },
    {
      question: 'What types of documents are supported?',
      answer:
        '${projectName} supports a variety of document types. You can select the appropriate type during upload to ensure proper categorization and management.',
    },
    {
      question: 'How do I change document ownership?',
      answer:
        "Document ownership can be transferred by the current owner. Select the document, choose 'Change Owner', and assign it to another user.",
    },
    {
      question: 'What are the pricing plans available?',
      answer:
        '${projectName} offers Standard, Premium, and Business plans, each tailored to different needs. Visit our Pricing page for more details on features and pricing.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. If you need further assistance, feel free to contact us through the form provided.`}
        />
      </Head>
      <WebSiteHeader projectName={'node4doc'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'node4doc'}
          image={['Find answers quickly and easily']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName}. Get the information you need to make the most of our platform.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'node4doc'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'node4doc'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact us for support']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions or need assistance? Contact us anytime, and our team will respond promptly to help you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'node4doc'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

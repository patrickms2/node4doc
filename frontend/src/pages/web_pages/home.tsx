import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const features_points = [
    {
      name: 'Seamless Document Upload',
      description:
        'Upload documents effortlessly, including ZIP files, which are automatically decompressed and organized. Simplify your workflow with batch uploads.',
      icon: 'mdiUpload',
    },
    {
      name: 'Advanced Document Editing',
      description:
        'Edit documents directly within the system using a modal interface. Ensure all changes are saved and updated in real-time for accuracy.',
      icon: 'mdiPencil',
    },
    {
      name: 'Customizable Organization',
      description:
        'Organize documents into personalized folders with attributes like name, type, color, and status. Enhance your document retrieval and management.',
      icon: 'mdiFolder',
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
        <title>{`Document Management System for Employees`}</title>
        <meta
          name='description'
          content={`Efficiently manage, edit, and share documents with our user-friendly document management system designed for employees.`}
        />
      </Head>
      <WebSiteHeader projectName={'node4doc'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'node4doc'}
          image={['Efficient document management system']}
          mainText={`Streamline Your Workflow with ${projectName}`}
          subTitle={`Effortlessly manage, edit, and share documents with ${projectName}. Enhance productivity and collaboration among employees.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'node4doc'}
          image={['Document management made easy']}
          withBg={0}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} enhances document management with powerful features designed for efficiency and collaboration.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'node4doc'}
          image={['Team collaborating on documents']}
          mainText={`Empowering Document Management with ${projectName}`}
          subTitle={`${projectName} is designed to streamline document management for employees, offering intuitive features for uploading, editing, and organizing documents. Our mission is to enhance productivity and collaboration in the workplace.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
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
          image={['Contact us for support']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team will respond promptly to help you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'node4doc'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

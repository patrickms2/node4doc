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
  PricingDesigns,
  ContactFormDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const pricing_features = {
    standard: {
      features: [
        'Batch Document Upload',
        'Real-Time Editing',
        'Custom Folder Organization',
      ],
      limited_features: ['Limited Document Sharing', 'Basic Search Filters'],
    },
    premium: {
      features: [
        'Batch Document Upload',
        'Real-Time Editing',
        'Custom Folder Organization',
        'Secure Document Sharing',
      ],
      also_included: ['Advanced Search Filters', 'Priority Support'],
    },
    business: {
      features: [
        'Batch Document Upload',
        'Real-Time Editing',
        'Custom Folder Organization',
        'Secure Document Sharing',
        'Advanced Search Filters',
        'Ownership Management',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals looking to manage their documents efficiently with essential features.',
    premium:
      'Perfect for small startups or agencies needing advanced features and enhanced support.',
    business:
      'Designed for enterprises requiring comprehensive document management solutions and dedicated support.',
  };

  const features_points = [
    {
      name: 'Batch Document Upload',
      description:
        'Easily upload multiple documents at once, including ZIP files. Our system automatically organizes and categorizes your files for efficient management.',
      icon: 'mdiUploadMultiple',
    },
    {
      name: 'Real-Time Editing',
      description:
        'Edit documents directly within the platform using our intuitive interface. Ensure all changes are saved and updated instantly for seamless collaboration.',
      icon: 'mdiPencilBox',
    },
    {
      name: 'Custom Folder Organization',
      description:
        'Organize your documents into folders with customizable attributes like color, type, and status, making retrieval and management a breeze.',
      icon: 'mdiFolderOpen',
    },
    {
      name: 'Secure Document Sharing',
      description:
        'Share documents securely with team members. Control access and permissions to ensure your data is protected while enhancing collaboration.',
      icon: 'mdiShareLock',
    },
    {
      name: 'Advanced Search Filters',
      description:
        'Quickly find documents using advanced search filters. Sort by type, date, or keywords to locate the files you need in seconds.',
      icon: 'mdiMagnify',
    },
    {
      name: 'Ownership Management',
      description:
        'Easily transfer document ownership between employees. Manage permissions and ensure the right people have access to the right documents.',
      icon: 'mdiAccountSwitch',
    },
  ];

  const testimonials = [
    {
      text: 'The ${projectName} platform has revolutionized our document management. The intuitive interface and robust features have significantly improved our workflow.',
      company: 'Tech Pioneers LLC',
      user_name: 'John Doe, CTO',
    },
    {
      text: "We love how ${projectName} makes document sharing and collaboration so seamless. It's a must-have tool for any growing business.",
      company: 'Creative Minds Agency',
      user_name: 'Jane Smith, Creative Director',
    },
    {
      text: 'With ${projectName}, organizing and retrieving documents has never been easier. The advanced search filters are a game-changer for us.',
      company: 'Innovative Solutions Inc.',
      user_name: 'Emily Johnson, Operations Manager',
    },
    {
      text: 'The customer support from ${projectName} is outstanding. They are always ready to help and ensure we get the most out of the platform.',
      company: 'Future Enterprises',
      user_name: 'Michael Brown, CEO',
    },
    {
      text: 'Our team has become more productive since we started using ${projectName}. The real-time editing feature is particularly useful for us.',
      company: 'Efficient Workflows Co.',
      user_name: 'Sarah Lee, Project Manager',
    },
    {
      text: 'The security features of ${projectName} give us peace of mind. We can confidently share documents knowing our data is protected.',
      company: 'SecureTech Solutions',
      user_name: 'David Wilson, IT Specialist',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Discover ${projectName} Solutions`}</title>
        <meta
          name='description'
          content={`Explore the comprehensive services offered by ${projectName}, including document management features, pricing plans, and customer testimonials. Contact us to learn more.`}
        />
      </Head>
      <WebSiteHeader projectName={'node4doc'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'node4doc'}
          image={['Empowering document management solutions']}
          mainText={`Unlock the Power of ${projectName} Services`}
          subTitle={`Discover how ${projectName} can transform your document management with our comprehensive services. Enhance efficiency and collaboration across your organization.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <PricingSection
          projectName={'node4doc'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'node4doc'}
          image={['Streamlined document management features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover the powerful features of ${projectName} that streamline document management and enhance productivity for your team.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'node4doc'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'node4doc'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Contact support for assistance']}
          mainText={`Reach Out to ${projectName} Support `}
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

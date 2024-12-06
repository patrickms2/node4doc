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
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Efficient Document Upload',
      description:
        'Upload documents with ease, including batch uploads of ZIP files. Our system automatically organizes and categorizes your files for quick access.',
      icon: 'mdiUpload',
    },
    {
      name: 'Intuitive Editing Tools',
      description:
        'Edit documents directly within the platform using our user-friendly modal interface. Ensure all changes are saved and updated instantly.',
      icon: 'mdiPencil',
    },
    {
      name: 'Customizable Organization',
      description:
        'Organize your documents into folders with customizable attributes like color, type, and status, making retrieval and management a breeze.',
      icon: 'mdiFolder',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has transformed the way we manage documents. The intuitive interface and powerful features have significantly boosted our team's productivity.",
      company: 'Tech Innovators Inc.',
      user_name: 'Alice Johnson, Operations Manager',
    },
    {
      text: "The customizable organization features of ${projectName} have made document retrieval a breeze. It's a game-changer for our workflow!",
      company: 'Creative Solutions Ltd.',
      user_name: 'Michael Smith, Creative Director',
    },
    {
      text: 'I love how easy it is to upload and edit documents with ${projectName}. It has streamlined our processes and saved us so much time.',
      company: 'Efficient Enterprises',
      user_name: 'Sarah Lee, Project Coordinator',
    },
    {
      text: 'The ability to share documents seamlessly across our team has improved our collaboration efforts. ${projectName} is an essential tool for us.',
      company: 'Global Ventures',
      user_name: 'David Brown, Team Lead',
    },
    {
      text: "The document management system provided by ${projectName} is top-notch. It's user-friendly and packed with features that cater to our needs.",
      company: 'Innovative Solutions Co.',
      user_name: 'Emma Davis, IT Specialist',
    },
    {
      text: 'Our document management has never been more efficient. ${projectName} offers everything we need to keep our files organized and accessible.',
      company: 'Future Tech Corp.',
      user_name: 'James Wilson, CEO',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Discover ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission, values, and the features that make our document management system unique. Connect with us today.`}
        />
      </Head>
      <WebSiteHeader projectName={'node4doc'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'node4doc'}
          image={['Team working towards innovation']}
          mainText={`Unveiling the Vision of ${projectName}`}
          subTitle={`Discover the mission and values that drive ${projectName}. Learn how our innovative document management system empowers employees and enhances productivity.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Story`}
        />

        <AboutUsSection
          projectName={'node4doc'}
          image={['Passionate team driving innovation']}
          mainText={`The Heart Behind ${projectName}`}
          subTitle={`At ${projectName}, we are committed to revolutionizing document management. Our team is dedicated to creating solutions that enhance efficiency and collaboration for employees everywhere.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'node4doc'}
          image={['Innovative document management features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Discover the powerful features of ${projectName} that streamline document management and enhance productivity for employees.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'node4doc'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'node4doc'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact us for assistance']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team is here to assist you with any questions about ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'node4doc'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

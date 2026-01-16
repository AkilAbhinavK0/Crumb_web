import React from 'react';
import { Hero } from '../components/hero/Hero';
import { WhatWeDo } from '../components/sections/WhatWeDo';
import { HowWeThink } from '../components/sections/HowWeThink';
import { WhatWeBuild } from '../components/sections/WhatWeBuild';
import { OurApproach } from '../components/sections/OurApproach';
import { WhyItMatters } from '../components/sections/WhyItMatters';
import { Footer } from '../components/layout/Footer';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <WhatWeDo />
            <HowWeThink />
            <WhatWeBuild />
            <OurApproach />
            <WhyItMatters />
            <Footer />
        </>
    );
};

export default Home;

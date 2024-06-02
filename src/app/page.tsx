import Image from 'next/image'
import clsx from 'clsx'
import 'animate.css' /* Need to import in this class or reload doesn't animate */

import { Container } from '@/components/Container'
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import chicago1 from '@/images/home/chicago.jpg'
import sedona from '@/images/home/sedona.jpg'
import photography from '@/images/home/photography.jpg'
import alviso from '@/images/home/alviso.jpg'
import oregon from '@/images/home/oregon.jpg'
import React from 'react'
import { HoverSocialLink } from '@/components/SocialLinks'
import { ResumeIcon } from '@/components/Icons'
import { LinkedText } from '@/components/Links'
import JsonLd from '@/components/JsonLd'

/**
 * JSON-LD data. We want to have the avatar image indexed to be shown in search.
 */
let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.youngbryanyu.com';
const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Young Bryan Yu",
    "logo": `${siteUrl}/images/avatar.jpg`,
    "url": `${siteUrl}`,
    "image": `${siteUrl}/images/avatar.jpg`,
    
    "author": {
        "@type": "Person",
        "name": "Young Bryan Yu"
    }
};

/**
 * List of socials.
 */
const socials = [
    {
        href: "https://www.linkedin.com/in/youngbryanyu/",
        ariaLabel: "Connect on LinkedIn",
        icon: LinkedInIcon,
        label: "LinkedIn",
    },
    {
        href: "https://github.com/youngbryanyu",
        ariaLabel: "Connect on GitHub",
        icon: GitHubIcon,
        label: "GitHub",
    },
    {
        href: "mailto:youngyu19@gmail.com",
        ariaLabel: "Connect through email",
        icon: EmailIcon,
        label: "Email",
    },
    {
        href: "https://drive.google.com/file/d/1p-FvixBI4vU1n9HNTT0J_pcvMgQ7EQg-/view?usp=sharing",
        ariaLabel: "Resume",
        icon: ResumeIcon,
        label: "Resume",
    },
]

/**
 * The photos section.
 */
function Photos() {
    let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[alviso, sedona, photography, oregon, chicago1].map((image, imageIndex) => (
                    /* Animation must be in parent container of image to not override rotations */
                    <div
                        key={image.src}
                        className="animate__animated animate__fadeInUp"
                        style={{ animationDelay: `${imageIndex * 0.1}s` }} /* Add delay for staggered effect */
                    >
                        <div
                            className={clsx(
                                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                                rotations[imageIndex % rotations.length],
                            )}
                        >
                            <Image
                                src={image}
                                alt={`Home page gallery image ${imageIndex}`}
                                sizes="(min-width: 640px) 18rem, 11rem"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * The full home page.
 */
export default function Home() {
    return (
        <>
            {/* TODO: remove if indexing avatar image doesn't change with it (see LsonLd.tsx) */}
            <JsonLd data={jsonLdData} />

            <Container className="mt-9">
                <div className="max-w-2xl">
                    {/* Hidden Image Section (for search indexing)*/}
                    <div style={{ display: 'none' }}>
                        <Image
                            src={'/images/avatar.jpg'}
                            alt="Young Bryan Yu Avatar"
                            width={200}
                            height={200}
                        />
                    </div>

                    {/* Title */}
                    <div className='animate__animated animate__fadeInUp'>
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            Young Bryan Yu
                        </h1>
                    </div>

                    {/* Introduction */}
                    <div className='animate__animated animate__fadeInUp'>
                        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            I&apos;m Young, a software engineer based in Silicon Valley who is interested in distributed systems, databases, and cloud computing. I&apos;m currently pursuing a MS in Computer Science at {LinkedText("Purdue University", "https://www.purdue.edu")}. I&apos;m currently working at startup {LinkedText("KeyByte LLC", "https://www.keybyte.xyz")} on some cutting edge database and VM tuning technologies.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="mt-6 flex gap-6">
                        {socials.map((link, index) => (
                            <div
                                key={index}
                                className="animate__animated animate__fadeInUp"
                                style={{
                                    animationDelay: `${index * 0.1}s` /* Stagger animations */
                                }}
                            >
                                <HoverSocialLink
                                    href={link.href}
                                    ariaLabel={link.ariaLabel}
                                    icon={link.icon}
                                    label={link.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Photos Section */}
            <Photos />
        </>
    );
}

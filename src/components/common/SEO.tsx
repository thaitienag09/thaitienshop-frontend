import { useEffect } from 'react';
import type { SEOProps } from '../../types';

const SEO: React.FC<SEOProps> = ({ title, description, ogImage, ogUrl }) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | thaitienshop` : 'thaitienshop - Giải pháp đồ án chuyên nghiệp';
        document.title = fullTitle;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || 'Nền tảng cung cấp giải pháp đồ án chuyên nghiệp, giúp bạn bứt phá trong sự nghiệp lập trình.');

        const updateOGTag = (property: string, content: string) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateOGTag('og:title', fullTitle);
        updateOGTag('og:description', description || 'Nền tảng cung cấp giải pháp đồ án chuyên nghiệp.');
        updateOGTag('og:image', ogImage || '/og-image.jpg');
        updateOGTag('og:url', ogUrl || window.location.href);
        updateOGTag('og:type', 'website');

        const updateTwitterTag = (name: string, content: string) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', name);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        updateTwitterTag('twitter:card', 'summary_large_image');
        updateTwitterTag('twitter:title', fullTitle);
        updateTwitterTag('twitter:description', description || 'Nền tảng cung cấp giải pháp đồ án chuyên nghiệp.');
        updateTwitterTag('twitter:image', ogImage || '/og-image.jpg');

    }, [title, description, ogImage, ogUrl]);

    return null;
};

export default SEO;

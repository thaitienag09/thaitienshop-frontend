import { useEffect } from 'react';

const SEO = ({ title, description, keywords, ogImage, ogUrl }) => {
    useEffect(() => {
        // Update Title
        const fullTitle = title ? `${title} | thaitienshop` : 'thaitienshop - Giải pháp đồ án chuyên nghiệp';
        document.title = fullTitle;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || 'Nền tảng cung cấp giải pháp đồ án chuyên nghiệp, giúp bạn bứt phá trong sự nghiệp lập trình.');

        // Update OpenGraph Tags
        const updateOGTag = (property, content) => {
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

        // Update Twitter Tags
        const updateTwitterTag = (name, content) => {
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

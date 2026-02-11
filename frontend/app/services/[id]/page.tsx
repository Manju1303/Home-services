import ServiceDetail from '@/components/ServiceDetail';

// Generate static pages for all service IDs
export function generateStaticParams() {
    return [
        { id: 'maid' },
        { id: 'cook' },
        { id: 'electrician' },
        { id: 'plumber' },
        { id: 'cleaning' },
        { id: 'maintenance' },
    ];
}

export default function ServicePage() {
    return <ServiceDetail />;
}

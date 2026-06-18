import type { Portfolio } from '@/types/portfolio';
import portfolioData from '@/data/portfolio.json';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

export async function fetchPortfolio(): Promise<Portfolio> {
    // Simply return the static portfolio data
    return portfolioData as Portfolio;
}

export async function submitContactForm(data: {
    name: string;
    email: string;
    message: string;
}): Promise<void> {
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Contact Message from ${data.name}`,
            from_name: data.name,
            ...data
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to submit contact form');
    }
}


import { DollarIcon } from '@/components/icons/currency/DollarIcon';
import { EuroIcon } from '@/components/icons/currency/EuroIcon';
import { PoundIcon } from '@/components/icons/currency/PoundIcon';
import { RubleIcon } from '@/components/icons/currency/RubleIcon';
import { RupeeIcon } from '@/components/icons/currency/RupeeIcon';
import { YenIcon } from '@/components/icons/currency/YenIcon';
import { EUFlag } from '@/components/icons/flags/EUFlag';
import { GBFlag } from '@/components/icons/flags/GBFlag';
import { IndiaFlag } from '@/components/icons/flags/IndiaFlag';
import { JapanFlag } from '@/components/icons/flags/JapanFlag';
import { RussiaFlag } from '@/components/icons/flags/RussiaFlag';
import { USFlag } from '@/components/icons/flags/USFlag';
import type { Currency } from '@/types/currency';

export const currencies: Currency[] = [
    {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        symbolIcon: <DollarIcon />,
        flagIcon: <USFlag />,
    },
    {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        symbolIcon: <EuroIcon />,
        flagIcon: <EUFlag />,
    },
    {
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
        symbolIcon: <PoundIcon />,
        flagIcon: <GBFlag />,
    },
    {
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
        symbolIcon: <YenIcon />,
        flagIcon: <JapanFlag />,
    },
    {
        code: 'INR',
        name: 'Indian Rupee',
        symbol: '₹',
        symbolIcon: <RupeeIcon />,
        flagIcon: <IndiaFlag />,
    },
    {
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
        symbolIcon: <RubleIcon />,
        flagIcon: <RussiaFlag />,
    },
];

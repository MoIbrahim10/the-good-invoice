import type * as React from 'react';

export interface Currency {
    code: string;
    name: string;
    symbol: string;
    symbolIcon: React.ReactNode;
    flagIcon: React.ReactNode;
}

import type { InvoiceData, InvoicePlaceholders } from '../types/invoice';
import type { InvoiceAction, InvoiceState } from '../types/state';

export const defaultPlaceholders: InvoicePlaceholders = {
    issuer: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        address: 'Street, city, country',
    },
    billTo: {
        email: 'john@example.com',
        address: 'Street, city, country',
    },
    details: {
        invoiceNumber: 'INV00-001',
        dueDate: 'DD/MM/YYYY',
    },
    items: {
        description: 'Description',
        quantity: '0',
        rate: '0',
    },
    notes: 'Payment or context details',
};

const initialInvoiceData: InvoiceData = {
    issuer: {
        name: '',
        email: '',
        address: '',
        includeLogo: true,
    },
    billTo: {
        email: '',
        address: '',
    },
    details: {
        invoiceNumber: '',
        dueDate: null,
        dueDateInput: '',
        currency: 'USD',
    },
    items: [
        {
            id: 'initial-item',
            description: '',
            quantity: 0,
            rate: 0,
        },
    ],
    tax: 0,
    taxType: 'percentage',
    discount: 0,
    discountType: 'percentage',
    notes: '',
    display: {
        style: 'solid',
        color: 'gray',
    },
};

export const initialInvoiceState: InvoiceState = {
    data: initialInvoiceData,
    placeholders: defaultPlaceholders,
    meta: {
        lastUpdated: Date.now(),
        version: 1,
        isDirty: false,
    },
};

function updateMeta(state: InvoiceState): InvoiceState['meta'] {
    return {
        lastUpdated: Date.now(),
        version: state.meta.version + 1,
        isDirty: true,
    };
}

export function invoiceReducer(
    state: InvoiceState,
    action: InvoiceAction,
): InvoiceState {
    switch (action.type) {
        case 'UPDATE_ISSUER': {
            return {
                ...state,
                data: {
                    ...state.data,
                    issuer: {
                        ...state.data.issuer,
                        ...action.payload,
                    },
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_BILL_TO': {
            return {
                ...state,
                data: {
                    ...state.data,
                    billTo: {
                        ...state.data.billTo,
                        ...action.payload,
                    },
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_DETAILS': {
            return {
                ...state,
                data: {
                    ...state.data,
                    details: {
                        ...state.data.details,
                        ...action.payload,
                    },
                },
                meta: updateMeta(state),
            };
        }

        case 'ADD_ITEM': {
            return {
                ...state,
                data: {
                    ...state.data,
                    items: [...state.data.items, action.payload],
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_ITEM': {
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, ...action.payload.data }
                            : item,
                    ),
                },
                meta: updateMeta(state),
            };
        }

        case 'REMOVE_ITEM': {
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter(
                        (item) => item.id !== action.payload,
                    ),
                },
                meta: updateMeta(state),
            };
        }

        case 'REORDER_ITEMS': {
            const { from, to } = action.payload;
            const items = [...state.data.items];
            const [movedItem] = items.splice(from, 1);
            items.splice(to, 0, movedItem);

            return {
                ...state,
                data: {
                    ...state.data,
                    items,
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_NOTES': {
            return {
                ...state,
                data: {
                    ...state.data,
                    notes: action.payload,
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_TAX': {
            return {
                ...state,
                data: {
                    ...state.data,
                    tax:
                        action.payload.value !== undefined
                            ? action.payload.value
                            : state.data.tax,
                    taxType: action.payload.type || state.data.taxType,
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_DISCOUNT': {
            return {
                ...state,
                data: {
                    ...state.data,
                    discount:
                        action.payload.value !== undefined
                            ? action.payload.value
                            : state.data.discount,
                    discountType:
                        action.payload.type || state.data.discountType,
                },
                meta: updateMeta(state),
            };
        }

        case 'UPDATE_DISPLAY': {
            return {
                ...state,
                data: {
                    ...state.data,
                    display: {
                        ...state.data.display,
                        ...action.payload,
                    },
                },
                meta: updateMeta(state),
            };
        }

        case 'RESET_INVOICE': {
            return initialInvoiceState;
        }

        case 'LOAD_INVOICE': {
            return {
                ...state,
                data: action.payload,
                meta: {
                    lastUpdated: Date.now(),
                    version: 1,
                    isDirty: false,
                },
            };
        }

        default: {
            return state;
        }
    }
}

import type { InvoiceData } from '../types/invoice';
import type { InvoiceAction, InvoiceState } from '../types/state';

const initialInvoiceData: InvoiceData = {
    issuer: {
        companyName: '',
        address: {
            line1: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        contact: {},
    },
    billTo: {
        clientName: '',
        address: {
            line1: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        contact: {},
    },
    details: {
        invoiceNumber: '',
        issueDate: new Date(),
        dueDate: new Date(),
        paymentTerms: '',
    },
    items: [],
    notes: '',
    display: {
        currency: 'USD',
        locale: 'en-US',
        dateFormat: 'MM/DD/YYYY',
    },
};

export const initialInvoiceState: InvoiceState = {
    data: initialInvoiceData,
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
                data: action.payload,
                meta: {
                    lastUpdated: Date.now(),
                    version: 1,
                    isDirty: false,
                },
            };
        }

        default: {
            // Exhaustive check with never type
            return state;
        }
    }
}

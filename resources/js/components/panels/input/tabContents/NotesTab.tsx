import { useId } from 'react';
import { NOTES_MAX_LENGTH } from '@/lib/invoiceLimits';
import { useInvoiceActions } from '../../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../../hooks/use-invoice-state';
import { LabeledTextarea } from '../../../custom/labeled-textarea';

export function NotesTab() {
    const { state } = useInvoiceState();
    const { updateNotes } = useInvoiceActions();

    const notes = state.data.notes;
    const placeholder = state.placeholders.notes;
    const notesId = useId();

    return (
        <div className="flex flex-col gap-2 p-3 border-b-layered">
            {/* Notes Field */}
            <LabeledTextarea
                id={notesId}
                name="invoice-notes"
                label="Notes"
                className="min-h-[144px]"
                labelClassName="w-14 shrink-0"
                maxLength={NOTES_MAX_LENGTH}
                value={notes}
                onChange={(e) => updateNotes(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

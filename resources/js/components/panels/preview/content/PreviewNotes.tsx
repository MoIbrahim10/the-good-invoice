import { PreviewText } from './PreviewText';

type PreviewNotesProps = {
    notes: string;
    placeholder: string;
};

export function PreviewNotes({ notes, placeholder }: PreviewNotesProps) {
    const isEmpty = !notes?.trim();
    return (
        <div className={`mt-auto px-4 pb-3 ${isEmpty ? 'opacity-50' : ''}`}>
            <h4 className="mb-1 text-preview-400">Notes</h4>
            <p className="min-w-0 wrap-break-word whitespace-pre-wrap text-preview-500">
                <PreviewText
                    value={notes}
                    placeholder={placeholder}
                    suppressPlaceholderOpacity
                />
            </p>
        </div>
    );
}
